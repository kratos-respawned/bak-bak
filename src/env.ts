import { vercel } from "@t3-oss/env-core/presets";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  extends: [vercel()],
  server: {
    DATABASE_URL: z.string().url(),
    PUSHER_APP_ID: z.string(),
    PUSHER_SECRET_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_PUSHER_CLUSTER: z.string(),
    NEXT_PUBLIC_PUSHER_KEY: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    PUSHER_APP_ID: process.env.PUSHER_APP_ID,
    NEXT_PUBLIC_PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY,
    PUSHER_SECRET_KEY: process.env.PUSHER_SECRET_KEY,
    NEXT_PUBLIC_PUSHER_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_CLUSTER
  },
});
