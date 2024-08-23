"use server";

import { prisma } from "@/lib/prisma";
import { authedProcedure } from "@/lib/procedures";
import { z } from "zod";

export const GetMessagesAction = authedProcedure
  .input(
    z.object({
      channelId: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    const { channelId } = input;
    const messages = await prisma.channel.findUnique({
      where: { id: channelId },
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
    return messages;
  });

export const SendMessageAction = authedProcedure;