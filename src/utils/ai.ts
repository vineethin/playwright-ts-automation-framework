import OpenAI from 'openai';
import { env } from './env';

export function isAIEnabled(): boolean {
  return env.aiEnabled === true;
}

export function getOpenAIClient(): OpenAI {
  if (!env.openaiApiKey) {
    throw new Error(
      'OPENAI_API_KEY is missing. Add it in your .env file (DO NOT commit it).'
    );
  }

  return new OpenAI({
    apiKey: env.openaiApiKey,
  });
}

export async function aiSuggestLocators(options: {
  pageUrl: string;
  pageTitle?: string;
  goal: string;
}): Promise<string> {
  if (!isAIEnabled()) {
    return 'AI is disabled. Set AI_ENABLED=true in .env to enable.';
  }

  const client = getOpenAIClient();

  const response = await client.chat.completions.create({
    model: env.openaiModel || 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are a Playwright automation expert. Suggest stable Playwright locators using getByRole/getByLabel/getByText and avoid brittle selectors.',
      },
      {
        role: 'user',
        content: `
URL: ${options.pageUrl}
TITLE: ${options.pageTitle ?? ''}
GOAL: ${options.goal}

Return:
1) Suggested Playwright locators
2) Example code snippet
3) Notes for reliability
`,
      },
    ],
  });

  return response.choices[0]?.message?.content?.trim() || 'No AI response.';
}
