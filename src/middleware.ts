export { default } from "next-auth/middleware"

export const config = {  
  matcher: [
    '/((?!auth).*)(.+)'
  ]  
}


// export const config = { matcher: ["/dashboard/", "/dashboard/:path*"] };