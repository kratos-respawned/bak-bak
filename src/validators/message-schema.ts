import { z } from "zod";
import { channelIdSchema } from "./channel-schema";
const receiverIdSchema = z.object({
  receiverId: z.string().cuid(),
});
const messageSchema = z.object({
  text: z.string().min(1).max(1000),
  media: z.string().url().optional(),
});

export const channelMessageSchema = messageSchema.extend({
  channelId: z.string().cuid(),
});

export const personalMessageSchema = messageSchema.extend({
  receiverId: z.string().cuid(),
});
export const deleteGroupMessageSchema = channelIdSchema.extend({
  messageId: z.string().cuid(),
});
export const deletePersonalMessageSchema = receiverIdSchema.extend({
  messageId: z.string().cuid(),
});
export type channelMessageSchema = z.infer<typeof channelMessageSchema>;
export type personalMessageSchema = z.infer<typeof personalMessageSchema>;
export type deleteMessageSchema = z.infer<typeof deleteGroupMessageSchema>;
