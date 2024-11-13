import CredentialsProvider from "next-auth/providers/credentials";

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import connectToDatabase from "./mongoose";
import User from "@/models/User";
import { compare } from "bcryptjs";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
        // role: { label: "Role", type: "text", placeholder: "user or company" }, // to specify role at login
      },
      async authorize(credentials) {
        await connectToDatabase();
        console.log(credentials);

        const user = await User.findOne({ email: credentials?.email });
        console.log(user);
        if (user && (await compare(credentials?.password, user.password))) {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }

        throw new Error("Invalid credentials");
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Add role to the token
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = await User.findOne(
        { email: token.email },
        { password: 0 }
      );

      return session;
    },
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
