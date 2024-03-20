'use client';

import { useSession } from "next-auth/react";
import axios from "@/lib/axios";

export const useRefreshToken = () => {
  const { data: session, status } = useSession();

  const refreshToken = async () => {
    const resp = await axios.post('/users/tokens/refresh', {}, {
      headers: {
        'Authorization': `Bearer ${session?.user.refresh_token}`
      }
    });

    console.log("Refreshed token", resp.data.token);
    

    if (session){
      session.user.token = resp.data.token;
    }

   
  };
  return refreshToken;

}