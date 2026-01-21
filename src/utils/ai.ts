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
        content: `
You are a Playwright automation expert.

Your job:
- Suggest stable Playwright locators
- Prefer getByRole, getByLabel, getByTestId, getByText
- Avoid brittle CSS/XPath selectors unless no other option exists

Output Rules:
- Return ONLY valid JSON (no markdown, no explanation, no extra text)
- Provide exactly 5 locator options
- Each option must include: name, locator, confidence, reason
- locator must be a valid Playwright locator string like:
  "page.getByRole('button', { name: 'Sign in' })"
`,
      },
      {
        role: 'user',
        content: `
URL: ${options.pageUrl}
TITLE: ${options.pageTitle ?? ''}
GOAL: ${options.goal}

Return JSON in this exact format:
{
  "options": [
    {
      "name": "Role-based",
      "locator": "page.getByRole('link', { name: 'Get started' })",
      "confidence": "High",
      "reason": "Accessible role + name is stable"
    }
  ]
}
`,
      },
    ],
  });

  return response.choices[0]?.message?.content?.trim() || 'No AI response.';
}
