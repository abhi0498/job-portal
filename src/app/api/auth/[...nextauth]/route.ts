// app/api/auth/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { compare } from "bcryptjs";

const authOptions = {
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
        role: { label: "Role", type: "text", placeholder: "user or company" }, // to specify role at login
      },
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials?.email });

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
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role; // Add role to the session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
