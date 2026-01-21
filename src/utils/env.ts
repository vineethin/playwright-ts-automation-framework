import 'dotenv/config';

export const env = {
    baseUrl: process.env.BASE_URL ?? 'https://www.wikipedia.org',
    username: process.env.USERNAME ?? '',
    password: process.env.PASSWORD ?? '',
    aiEnabled: (process.env.AI_ENABLED ?? 'false').toLowerCase() === 'true',
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    openaiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',

};
