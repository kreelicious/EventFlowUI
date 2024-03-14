import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Session } from 'next-auth';
import directus from '@/lib/directus';
import { readMe, withToken } from '@directus/sdk';
import { JWT } from 'next-auth/jwt';
import { signIn } from 'next-auth/react';

const backendUrl = process.env.BACKEND_URL;

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(`${backendUrl}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: token.refreshToken }),
      credentials: "include",
    });

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.data.access_token,
      expires: Date.now() + refreshedTokens.data.expires,
      refreshToken: refreshedTokens.data.refresh_token,
    };

  } catch (error) {
    console.log(
      new Date().toUTCString() + " Error in refreshAccessToken:",
      error
    )

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async function (credentials) {
        // Add logic here to look up the user from the credentials supplied
      
        const res = await fetch(`${backendUrl}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();
        // If no error and we have user data, return it
        if (!res.ok && user) {
          throw new Error('Email address or password is invalid');
        }
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: any;
      account: any;
    }) {
      if (account && user) {
        const userData = await directus.request(
          withToken(
            user.data.access_token as string,
            readMe({
              fields: ['id', 'first_name', 'last_name'],
            })
          )
        );
        return {
          ...token,
          accessToken: user.data.access_token,
          //expires: Date.now() + user.data.expires, 
          refreshToken: user.data.refresh_token,
          user: userData,
        };
      }
      return token;

      // Return previous token if the access token has not expired yet
      // if (Date.now() < token.expires) {
      //   return token;
      // }

      // // Access token has expired, try to update it
      // return refreshAccessToken(token)
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      //session.user.expires = token.expires;
      session.user = token.user;
      return session;
    },
  },
};