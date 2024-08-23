"use server";

import { prisma } from "@/lib/prisma";
import { authedProcedure } from "@/lib/procedures";
import { z } from "zod";

export const SendFriendRequestAction = authedProcedure
  .input(
    z.object({
      friendId: z.string(),
    })
  )
  .handler(async ({ ctx, input }) => {
    const { friendId } = input;
    if (ctx.id === friendId) {
      throw new Error("Cannot send friend request to self");
    }
    const friend = await prisma.user.findUnique({
      where: { id: friendId },
    });
    if (!friend) {
      throw new Error("Friend not found");
    }
    await prisma.friendRequest.create({
      data: {
        senderId: ctx.id,
        receiverId: friendId,
      },
    });
    return { success: true, message: "Friend request sent" };
  });

export const AcceptFriendRequestAction = authedProcedure
  .input(
    z.object({
      requestId: z.string(),
    })
  )
  .handler(async ({ ctx, input }) => {
    const { requestId } = input;
    const request = await prisma.friendRequest.findUnique({
      where: { id: requestId },
    });
    if (!request) {
      throw new Error("Friend request not found");
    }
    if (request.receiverId !== ctx.id) {
      throw new Error("Unauthorized");
    }
    await prisma.$transaction([
      prisma.friendRequest.delete({
        where: { id: requestId },
      }),
      prisma.user.update({
        where: { id: ctx.id },
        data: {
          friendsWith: {
            connect: { id: request.senderId },
          },
        },
      }),
    ]);
    return { success: true, message: "Friend request accepted" };
  });

export const RejectFriendRequestAction = authedProcedure
  .input(
    z.object({
      requestId: z.string(),
    })
  )
  .handler(async ({ ctx, input }) => {
    const { requestId } = input;
    const request = await prisma.friendRequest.findUnique({
      where: { id: requestId },
    });
    if (!request) {
      throw new Error("Friend request not found");
    }
    if (request.receiverId !== ctx.id) {
      throw new Error("Unauthorized");
    }
    await prisma.friendRequest.delete({
      where: { id: requestId },
    });
    return { success: true, message: "Friend request rejected" };
  });
