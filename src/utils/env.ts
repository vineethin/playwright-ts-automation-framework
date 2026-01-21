import 'dotenv/config';

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://www.wikipedia.org',
  username: process.env.USERNAME ?? '',
  password: process.env.PASSWORD ?? '',
};
