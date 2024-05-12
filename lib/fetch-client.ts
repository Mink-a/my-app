export const fetchClient = async (url: any, options: any) => {
  return fetch(url, {
    ...options,
  });
};
