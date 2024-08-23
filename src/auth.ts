import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import { prisma } from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [GitHub],
  callbacks: {
    async session({ token, session }) {
      const { email } = token;
      if (!email) return session;
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) return session;
      session.user.id = user.id;
      return session;
    },
  },
  // ...authConfig,
});
