export const getFetchUrl = (route: string) => {
  const url =
    process.env.NODE_ENV === 'production'
      ? process.env.VERCEL_URL
      : 'http://localhost:3000/';
  return `${url}/${route}`;
};
