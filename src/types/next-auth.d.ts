import "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user:{
      accessToken: any & DefaultSession["user"];
      refreshToken: any & DefaultSession["user"];
    }
  }

  interface User {
      accessToken: any
     & DefaultSession["user"];
     refreshToken: any
     & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    accessToken?: string;
    refreshToken?: string;
  }
}