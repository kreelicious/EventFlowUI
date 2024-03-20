import "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user:{
      token: any & DefaultSession["user"];
      refresh_token: any & DefaultSession["user"];
      //first_name: any & DefaultSession["user"];
      //last_name: any & DefaultSession["user"];
      email: any & DefaultSession["user"];
      expires_in: any & DefaultSession["user"];
      error: any & DefaultSession["user"];
    }
  }

  interface User {
    token: any & DefaultSession["user"];
    refresh_token: any & DefaultSession["user"];
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
    token: string;
    refresh_token: string;
    expires_in: number;
  }
}