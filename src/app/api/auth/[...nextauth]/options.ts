import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

const backendUrl = process.env.BACKEND_API_URL;

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(`${backendUrl}/users/tokens/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token.refreshToken,
      },
      //credentials: "include",
    });

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.token,
      expires: Date.now() + refreshedTokens.expires_in,
      refreshToken: refreshedTokens.refresh_token,
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

        const resp = await fetch(`${backendUrl}/users/tokens/sign_in`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });

        if (resp.status !== 200) {
          throw new Error('Email address or password is invalid');
        }
        const data = await resp.json();
        console.log('resp data', data);
        if (data) {
          return data;
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
      if (token && user) {
        return {
          ...token,
          ...user
        };
      }

      //Return previous token if the access token has not expired yet
      if (Date.now() < token.expires) {
        return token;
      }

      // // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session({ session, token, user }: { session: Session; token: any, user: any }) {
      session.user.accessToken = token.token;
      session.user.refreshToken = token.refresh_token;
      session.user.expires = token.expires_in;
      if (token.resource_owner) {
        session.user.email = token.resource_owner.email;
      }
      return session;
    },
  },
};