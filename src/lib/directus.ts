// import { createDirectus, rest, authentication } from '@directus/sdk';

// const backendUrl = process.env.BACKEND_URL || ''; // Set a default value if BACKEND_URL is undefined
// const directus = createDirectus(backendUrl)
//   .with(authentication())
//   .with(rest());

// export default directus;





import {
  authentication,
  createDirectus,
  rest,
  staticToken,
} from "@directus/sdk"

export const directus = (token: string = "") => {
  if (token) {
    return createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_API ?? "")
      .with(staticToken(token))
      .with(rest({ credentials: 'include' }));
  }
  return createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_API ?? "")
    .with(authentication())
    .with(rest({ credentials: 'include' }));
}