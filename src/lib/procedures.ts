import { auth } from "@/auth";
import "server-only";
import { createServerActionProcedure } from "zsa";
const authedProcedureFactory = createServerActionProcedure().handler(async () => {
  const user = await auth();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
});

export const authedProcedure=authedProcedureFactory.createServerAction();
