import { aiSuggestLocators } from '../utils/ai';

async function main() {
  const url = process.argv[2];
  const goal = process.argv.slice(3).join(' ') || 'Suggest stable locators for the main actions on this page';

  if (!url) {
    console.log('Usage: npm run ai:locators -- <url> <goal>');
    console.log('Example: npm run ai:locators -- https://example.com "login button and username field"');
    process.exit(1);
  }

  const result = await aiSuggestLocators({
    pageUrl: url,
    goal,
  });

  console.log('\n=== AI Locator Suggestions ===\n');
  console.log(result);
}

main().catch((err) => {
  console.error('\nAI command failed:\n', err?.message || err);
  process.exit(1);
});
