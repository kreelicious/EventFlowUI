import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import axios from '@/lib/axios';

const backendUrl = process.env.BACKEND_API_URL;

async function refreshAccessToken(token: JWT) {
  //console.log('Debug refreshAccessToken', token);
  try {
    const response = await fetch(`${backendUrl}/users/tokens/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token.refresh_token,
      },
      credentials: "include",
    });

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      token: refreshedTokens.token,
      expires_in: Date.now() + refreshedTokens.expires_in,
      refresh_token: refreshedTokens.refresh_token,
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
      authorize: async function (credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const resp = await axios.post('/users/tokens/sign_in', JSON.stringify(credentials));

        if (resp.status !== 200) {
          throw new Error('Email address or password is invalid');
        }

        const user = resp.data;
        //console.log('_DEBUG_ user', user);
        if (user) {
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
    }: {
      token: JWT;
      user: any;
    }) {
      console.log('_DEBUG_ jwt user', user);
      console.log('_DEBUG_ jwt token', user);
      //if (user && token) {
       return {...token, ...user};
      //}
      
      // //Return previous token if the access token has not expired yet
      // if (Date.now() < token.expires_in) {
      //   return token;
      // }
      // // Access token has expired, try to update it
      // return refreshAccessToken(token)
    },
    async session({ session, token }: { session: Session; token: any }) {
      console.log('__DEBUG__ session session', session);
      console.log('__DEBUG__ session token', token);
      session.user.token = token.token;
      session.user.refresh_token = token.refresh_token;
      session.user.expires_in = token.expires_in;
      if (token.resource_owner) {
        session.user.email = token.resource_owner.email;
      }
     
      return session;
    },
  },
};