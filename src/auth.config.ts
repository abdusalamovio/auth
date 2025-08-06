import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/features/auth/login";
import { prisma } from "@/shared/lib";
import bcryptjs from "bcryptjs";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Google,
    GitHub,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;
        const { email, password } = validatedFields.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.password) return null;

        const isPasswordCorrect = await bcryptjs.compare(
          password,
          user.password,
        );
        if (!isPasswordCorrect) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
