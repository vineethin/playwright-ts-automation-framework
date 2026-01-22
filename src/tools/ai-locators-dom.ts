import { chromium } from '@playwright/test';
import { aiSuggestLocators } from '../utils/ai';

function clampText(text: string, max = 12000) {
  if (text.length <= max) return text;
  return text.slice(0, max) + '\n...[truncated]';
}

async function main() {
  const [url, ...goalParts] = process.argv.slice(2);
  const goal = goalParts.join(' ').trim();

  if (!url || !goal) {
    console.log('Usage: npm run ai:locators:dom -- <url> "<goal>"');
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Capture limited DOM snapshot for AI context
    const title = await page.title();
    const html = clampText(await page.content());

    const result = await aiSuggestLocators({
      pageUrl: url,
      pageTitle: title,
      goal,
      domSnippet: html,
    });

    console.log('\n=== AI Locator Suggestions (DOM-aware) ===\n');
    console.log(result);
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
