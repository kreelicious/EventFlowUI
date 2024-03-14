import "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user:{
      accessToken: any & DefaultSession["user"];
      refreshToken: any & DefaultSession["user"];
      //first_name: any & DefaultSession["user"];
      //last_name: any & DefaultSession["user"];
      email: any & DefaultSession["user"];
      expires: any & DefaultSession["user"];
      error: any & DefaultSession["user"];
    }
  }

  interface User {
      accessToken: any
     & DefaultSession["user"];
     refreshToken: any
     & DefaultSession["user"];
    //  first_name: any
    //  & DefaultSession["user"];
    //  last_name: any
    //  & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    accessToken: string;
    refreshToken: string;
    expires: number;
  }
}