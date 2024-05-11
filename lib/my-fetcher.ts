async function request<TResponse>(
  url: string,
  config: RequestInit = {},
): Promise<TResponse> {
  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
    return data as TResponse;
  } catch (error) {
    if (error instanceof Response) {
      if (error.status === 401) {
        console.log("unauthorized", error);
      }

      throw error;
    }

    throw new Error("Failed to fetch data", { cause: error });
  }
}

export const api = {
  get: <TResponse>(url: string) =>
    request<TResponse>(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWQiOiIwOTlmNzcxMC1iODllLTRkNWQtYTRjNS0xNmU1NGU3ZjkwMjgiLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE3MTU0MDUyODcsImV4cCI6MTcxNjAxMDA4N30.q2_TmQ2hX6UwkKQ9l0fjVx8bKXlteUmqQYB8lHM6HME",
      },
    }),

  post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
    request<TResponse>(url, { method: "POST", body }),
};
