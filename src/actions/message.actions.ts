"use server";

import { prisma } from "@/lib/prisma";
import { authedProcedure } from "@/lib/procedures";
import { channelIdSchema } from "@/validators/channel-schema";
import {
  channelMessageSchema,
  deleteGroupMessageSchema,
  deletePersonalMessageSchema,
  personalMessageSchema,
} from "@/validators/message-schema";

export const GetGroupMessagesAction = authedProcedure
  .input(channelIdSchema)
  .handler(async ({ input, ctx }) => {
    const { channelId } = input;
    const messages = await prisma.channel.findUnique({
      where: { id: channelId, members: { some: { id: ctx.id } } },
      include: {
        receivedGroupMessages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
    return { success: true, messages };
  });

export const GetPersonalMessagesAction = authedProcedure.handler(
  async ({ ctx }) => {
    const messages = await prisma.personalMessage.findMany({
      where: { OR: [{ senderId: ctx.id }, { receiverId: ctx.id }] },
      orderBy: { createdAt: "desc" },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      take: 100,
    });
    return { success: true, messages };
  }
);

export const SendChannelMessageAction = authedProcedure
  .input(channelMessageSchema)
  .handler(async ({ input, ctx }) => {
    const { channelId, text, media } = input;
    const channel = await prisma.channel.findUnique({
      where: { id: channelId, members: { some: { id: ctx.id } } },
    });
    if (!channel) {
      throw new Error("Channel not found");
    }
    const message = await prisma.groupMessage.create({
      data: {
        text,
        media,
        senderId: ctx.id,
        channelId: channel.channelId,
      },
    });
    return { success: true, message };
  });

export const SendPersonalMessageAction = authedProcedure
  .input(personalMessageSchema)
  .handler(async ({ input, ctx }) => {
    const { receiverId, text, media } = input;
    // check user exists and if both users are friends
    const user = await prisma.user.findUnique({
      where: {
        id: receiverId,
        friendsWith: {
          some: { id: ctx.id },
        },
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const message = await prisma.personalMessage.create({
      data: {
        text,
        media,
        senderId: ctx.id,
        receiverId,
      },
    });
    return { success: true, message };
  });

export const DeleteGroupMessageAction = authedProcedure
  .input(deleteGroupMessageSchema)
  .handler(async ({ input, ctx }) => {
    const { channelId, messageId } = input;
    const channel = await prisma.channel.findUnique({
      where: {
        id: channelId,
        OR: [
          { admins: { some: { userId: ctx.id } } },
          { members: { some: { id: ctx.id } } },
        ],
        receivedGroupMessages: { some: { id: messageId } },
      },
      include: {
        admins: {
          select: {
            userId: true,
          },
        },
      },
    });
    if (!channel) {
      throw new Error("Channel not found");
    }
    if (channel.admins.some((admin) => admin.userId === ctx.id)) {
      await prisma.groupMessage.update({
        where: { id: messageId, channelId },
        data: { isSystem: true, text: "Message deleted By Admin", media: null },
      });
      return { success: true, message: "Message deleted" };
    }
    await prisma.groupMessage.delete({
      where: { id: messageId, channelId: channelId, senderId: ctx.id },
    });
    return { success: true, message: "Message deleted" };
  });

export const DeletePersonalMessageAction = authedProcedure
  .input(deletePersonalMessageSchema)
  .handler(async ({ input, ctx }) => {
    const { messageId, receiverId } = input;
    const message = await prisma.personalMessage.findUnique({
      where: { id: messageId, senderId: ctx.id, receiverId },
    });
    if (!message) {
      throw new Error("Message not found");
    }
    await prisma.personalMessage.delete({
      where: { id: messageId, senderId: ctx.id, receiverId },
    });
    return { success: true, message: "Message deleted" };
  });
