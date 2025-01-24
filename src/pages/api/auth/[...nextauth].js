import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Username:", credentials.username); // Debug line
        console.log("Password:", credentials.password); // Debug lin
        const { username, password } = credentials;
        try {
          try {
            const user = await prisma.user.findUnique({
              where: { username: username },
              select: {
                id: true,
                name: true,
                email: true,
                password: true,
              },
            });

            if (!user) {
              return res.status(404).json({ message: "User not found" });
            }

            const isPasswordValid = await compare(password, user.password);
            if (!isPasswordValid) {
              return res.status(401).json({ message: "Invalid password" });
            }

            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          } catch (error) {
            console.error("Error in login handler:", error);
            return res.status(500).json({ message: "Internal server error" });
          }
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      // Attach user ID to the session object
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
