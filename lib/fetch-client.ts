import { getSession, signOut } from "next-auth/react";
import { ServerError, UnauthorizedError } from "./exceptions";

interface fetchClientProps {
  method?: string;
  url: string;
  body?: string;
  token?: string;
}

async function fetchClient({
  method = "GET",
  url,
  body = "",
  token,
}: fetchClientProps) {
  try {
    const session = await getSession();
    const accessToken = token || session?.jwt;

    const response = await fetch(url.toString(), {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: body || undefined,
    });

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (error) {
    if (error instanceof Response) {
      if (error.status === 401) {
        signOut();
        throw new UnauthorizedError();
      } else {
        throw new ServerError("Failed to fetch data");
      }
    }

    throw new ServerError("Failed to fetch data");
  }
}

export default fetchClient;
