import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";

import { Pool } from "pg";
import { db } from "../../../config";

const pool = new Pool(db);

const query = (sql: string, params: any[]) => {
  return new Promise((resolve, reject) => {
    return pool.connect().then((client) => {
      client
        .query(sql, params)
        .then((result: any) => {
          client.release();
          resolve(result);
        })
        .catch((err: any) => {
          client.release();
          reject(err);
        });
    });
  });
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          autoComplete: "current-password",
          required: true,
        },
      },
      async authorize(credentials, req) {
        const { email, password } = {
          email: credentials?.email,
          password: credentials?.password,
        };

        if (!email || !password) {
          return {
            message: "Email and password are required",
            status: "error",
          };
        }

        const res = await query(
          `SELECT * FROM userinfo WHERE email = $1 AND _password = crypt($2, _salt)`,
          [email, password]
        );

        // @ts-ignore
        const user = res.rows[0];

        if (user !== undefined) {
          return {
            message: "User authorized",
            status: "success",
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              created_at: user.created_at,
              updated_at: user.updated_at,
            },
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.user) {
        session.user = {
          // @ts-ignore
          ...token.user,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: "supersecretkeyyoushouldnotcommittogithub",
  jwt: {
    secret: "supersecretkeyyoushouldnotcommittogithub",
    maxAge: 60 * 30, // 30 minutes
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 30, // 30 minutes
  },
  debug: true,
});
