import { auth } from "@/auth";
import "server-only";
import { createServerActionProcedure } from "zsa";
const authedProcedureFactory = createServerActionProcedure().handler(
  async () => {
    const Session = await auth();
    if (!Session || !Session.user || !Session.user.id) {
      throw new Error("Unauthorized");
    }
    return { ...Session.user, id: Session.user.id };
  }
);

export const authedProcedure = authedProcedureFactory.createServerAction();
