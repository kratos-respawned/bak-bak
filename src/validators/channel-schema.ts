import { z } from "zod";

export const channelIdSchema = z.object({
  channelId: z.string(),
});
export const channelUserSchema = channelIdSchema.extend({
  userId: z.string(),
});
export const channelInvitationRequestSchema = channelIdSchema.extend({
  accept: z.boolean(),
});
export const createChannelSchema = z.object({
  name: z.string(),
  description: z.string(),
  channelId: z.string(),
  members: z.array(z.string()).optional(),
});
export const updateChannelSchema = createChannelSchema.extend({
  channelId: z.string(),
  media: z.string().optional(),
});
export type channelIdSchema = z.infer<typeof channelIdSchema>;
export type channelUserSchema = z.infer<typeof channelUserSchema>;
export type channelInvitationRequestSchema = z.infer<
  typeof channelInvitationRequestSchema
>;
export type createChannelSchema = z.infer<typeof createChannelSchema>;
export type updateChannelSchema = z.infer<typeof updateChannelSchema>;