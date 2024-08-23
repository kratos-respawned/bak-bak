"use server";
import { prisma } from "@/lib/prisma";
import { authedProcedure } from "@/lib/procedures";
import {
  channelIdSchema,
  channelInvitationRequestSchema,
  channelUserSchema,
  createChannelSchema,
  updateChannelSchema,
} from "@/validators/channel-schema";
export const GetChannelsAction = authedProcedure
  .input(channelIdSchema)
  .handler(async ({ input }) => {
    const channels = await prisma.channel.findMany({
      where: {
        channelId: {
          search: input.channelId,
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });
    return { success: true, channels };
  });
export const GetChannelAction = authedProcedure
  .input(channelIdSchema)
  .handler(async ({ input }) => {
    const channel = await prisma.channel.findUnique({
      where: { id: input.channelId },
    });
    return { success: true, channel };
  });
export const CreateChannelAction = authedProcedure
  .input(createChannelSchema)
  .handler(async ({ ctx, input }) => {
    const { name, description, channelId, members } = input;
    if (members && members.includes(ctx.id)) {
      members.filter((id) => id !== ctx.id);
    }
    if (members && members.length > 0) {
      const users = await prisma.user.findMany({
        where: {
          id: {
            in: members,
          },
        },
      });
      if (users.length !== members.length) {
        throw new Error("Invalid members");
      }
    }

    const channel = await prisma.channel.create({
      data: {
        name,
        description,
        channelId: channelId,
        ownerID: ctx.id,
        admins: {
          create: {
            userId: ctx.id,
          },
        },
        members: {
          connect: members?.map((id) => ({ id })),
        },
      },
    });
    return { success: true, channel, message: "Channel created" };
  });

export const DeleteChannelAction = authedProcedure
  .input(channelIdSchema)
  .handler(async ({ ctx, input }) => {
    const { channelId } = input;
    const channel = await prisma.channel.findUnique({
      where: { id: channelId },
    });
    if (!channel) {
      throw new Error("Channel not found");
    }
    if (channel.ownerID !== ctx.id) {
      throw new Error("Unauthorized");
    }
    await prisma.channel.delete({
      where: { id: channelId },
    });
    return { success: true, message: "Channel deleted" };
  });

export const UpdateChannelAction = authedProcedure
  .input(updateChannelSchema)
  .handler(async ({ ctx, input }) => {
    const { channelId, name, description } = input;
    const channel = await prisma.channel.findUnique({
      where: { id: channelId },
      include: {
        admins: {
          select: { userId: true },
        },
      },
    });
    if (!channel) {
      throw new Error("Channel not found");
    }
    if (!channel.admins.find((admin) => admin.userId === ctx.id)) {
      throw new Error("Unauthorized");
    }
    await prisma.channel.update({
      where: { id: channelId },
      data: { name, description },
    });
    return { success: true, message: "Channel updated" };
  });

export const AddChannelAdminAction = authedProcedure
  .input(channelUserSchema)
  .handler(async ({ ctx, input }) => {
    const { channelId, userId } = input;
    const { id } = ctx;
    const channel = await prisma.channel.findUnique({
      where: { id: channelId },
      include: {
        admins: {
          select: { userId: true },
        },
      },
    });
    if (!channel) {
      throw new Error("Channel not found");
    }
    if (!channel.admins.find((admin) => admin.userId === id)) {
      throw new Error("Unauthorized");
    }
    if (channel.admins.find((admin) => admin.userId === userId)) {
      throw new Error("User is already an admin");
    }
    await prisma.channel.update({
      where: { id: channelId },
      data: {
        admins: {
          create: { userId },
        },
      },
    });
    return { success: true, message: "Admin added" };
  });

export const RemoveChannelAdminAction = authedProcedure
  .input(channelUserSchema)
  .handler(async ({ ctx, input }) => {
    const { channelId, userId } = input;
    const { id } = ctx;
    const channel = await prisma.channel.findUnique({
      where: { id: channelId },
      include: {
        admins: {
          select: { userId: true },
        },
      },
    });
    if (!channel) {
      throw new Error("Channel not found");
    }
    if (!channel.admins.find((admin) => admin.userId === id)) {
      throw new Error("Unauthorized");
    }
    if (!channel.admins.find((admin) => admin.userId === userId)) {
      throw new Error("User is not an admin");
    }
    if (channel.ownerID === userId) {
      throw new Error("Cannot remove owner");
    }
    await prisma.channel.update({
      where: { id: channelId },
      data: {
        admins: {
          deleteMany: {
            userId,
          },
        },
      },
    });
    return { success: true, message: "Admin removed" };
  });

export const AddChannelMemberAction = authedProcedure
  .input(channelUserSchema)
  .handler(async ({ ctx, input }) => {
    const { userId, channelId } = input;
    const channel = await prisma.channel.findUnique({
      where: { id: channelId },
      include: {
        members: {
          select: { id: true },
        },
        admins: {
          select: { userId: true },
        },
      },
    });

    if (!channel) {
      throw new Error("Channel not found");
    }
    if (!channel.admins.find((admin) => admin.userId === ctx.id)) {
      throw new Error("Unauthorized");
    }
    if (channel.members.find((member) => member.id === userId)) {
      throw new Error("User is already a member");
    }
    await prisma.channel.update({
      where: { id: channelId },
      data: {
        invitedUsers: {
          connect: { id: userId },
        },
      },
    });
    return { success: true, message: "Member added" };
  });

export const RemoveChannelMemberAction = authedProcedure
  .input(channelUserSchema)
  .handler(async ({ ctx, input }) => {
    const { userId, channelId } = input;
    const channel = await prisma.channel.findUnique({
      where: { id: channelId },
      include: {
        members: {
          select: { id: true },
        },
        admins: {
          select: { userId: true },
        },
      },
    });
    if (!channel) {
      throw new Error("Channel not found");
    }
    if (!channel.admins.find((admin) => admin.userId === ctx.id)) {
      throw new Error("Unauthorized");
    }

    if (!channel.members.find((member) => member.id === userId)) {
      throw new Error("User is not a member");
    }
    await prisma.channel.update({
      where: { id: channelId },
      data: {
        members: {
          disconnect: { id: userId },
        },
      },
    });
    return { success: true, message: "Member removed" };
  });

export const HandleChannelInviteAction = authedProcedure
  .input(channelInvitationRequestSchema)
  .handler(async ({ ctx, input }) => {
    const { channelId, accept } = input;
    const channel = await prisma.channel.findUnique({
      where: { id: channelId },
      include: {
        invitedUsers: {
          select: { id: true },
        },
      },
    });
    if (!channel) {
      throw new Error("Channel not found");
    }
    if (!channel.invitedUsers.find((user) => user.id === ctx.id)) {
      throw new Error("User is not invited");
    }
    if (accept) {
      await prisma.channel.update({
        where: { id: channelId },
        data: {
          members: {
            connect: { id: ctx.id },
          },
          invitedUsers: {
            disconnect: { id: ctx.id },
          },
        },
      });
    } else {
      await prisma.channel.update({
        where: { id: channelId },
        data: {
          invitedUsers: {
            disconnect: { id: ctx.id },
          },
        },
      });
    }
    if (accept) {
      return { success: true, message: "Invite accepted" };
    }
    return { success: true, message: "Invite declined" };
  });

export const LeaveChannelAction = authedProcedure
  .input(channelIdSchema)
  .handler(async ({ ctx, input }) => {
    const { channelId } = input;
    const channel = await prisma.channel.findUnique({
      where: { id: channelId },
      include: {
        members: {
          select: { id: true },
        },
        admins: {
          orderBy: { createdAt: "asc" },
          select: { userId: true, createdAt: true },
        },
      },
    });
    if (!channel) {
      throw new Error("Channel not found");
    }
    if (channel.ownerID === ctx.id) {
      if (channel.admins.length > 1) {
        await prisma.channel.update({
          where: { id: channelId },
          data: {
            ownerID: channel.admins[1].userId,
            admins: {
              deleteMany: {
                userId: channel.admins[1].userId,
              },
            },
            members: {
              disconnect: { id: ctx.id },
            },
          },
        });
        return { success: true, message: "Left channel" };
      }
      await prisma.channel.delete({
        where: { id: channelId },
      });
      return { success: true, message: "Channel deleted" };
    }
    await prisma.channel.update({
      where: { id: channelId },
      data: {
        members: {
          disconnect: { id: ctx.id },
        },
      },
    });
    return { success: true, message: "Left channel" };
  });
