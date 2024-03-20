import { getSession } from "next-auth/react"

async function authSessionToken(): Promise<string | null> {
  const session  = await getSession()
  console.log('Debug authSessionToken', session);
  if (session) {
    return session.user.token;
  }
  return null;
}

// Define the wrapper function
export async function authFetch(path: string, options?: RequestInit): Promise<Response> {
  // Get the access token
  const accessToken = await authSessionToken();
 
  const backendUrl = process.env.BACKEND_API_URL;

  console.log('Debug authFetch', accessToken);

  // Add the Authorization header to the options object
  
  const requestHeaders: HeadersInit = new Headers();
  const headers = options?.headers;
  if (headers) {
    if (headers instanceof Headers) {
      headers.forEach((value, name) => {
        requestHeaders.append(name, value);
      });
    } else {
      Object.entries(headers).forEach(([name, value]) => {
        requestHeaders.append(name, value);
      });
    }
  }
  requestHeaders.append('Authorization', `Bearer ${accessToken}`);
  requestHeaders.append('Content-Type', 'application/json');
  requestHeaders.append('credentials', 'include');
  options = { ...options, headers };

  // Call the native fetch method with the modified options
  return fetch(`${backendUrl}${path}`, options);
}