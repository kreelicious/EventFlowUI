import { createDirectus, rest, authentication } from '@directus/sdk';

const backendUrl = process.env.BACKEND_URL || ''; // Set a default value if BACKEND_URL is undefined
const directus = createDirectus(backendUrl)
  .with(authentication())
  .with(rest());

export default directus;