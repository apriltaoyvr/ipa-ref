// route.ts
import { Mwn } from 'mwn';
import { extractIPA } from './wiktionaryHelpers';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ word: string }> }
) {
  try {
    const word = (await params).word || 'word';

    // Initialize the appropriate Wiktionary bot
    const bot = await Mwn.init({
      apiUrl: 'https://en.wiktionary.org/w/api.php',
      OAuth2AccessToken: process.env.MW_CLIENT_ACCESS_TOKEN,
      userAgent:
        'Wiktionary Wrapper/1.0 (https://github.com/apriltaoyvr/) mwn/2.0.4',
      defaultParams: {
        assert: 'user',
      },
    });
    bot.setOptions({
      retryPause: 5000,
      maxRetries: 3,
    });

    // Fetch the page content
    const page = await bot.read(word, {
      prop: ['revisions'],
      rvprop: ['content'],
    });

    if (!page.revisions?.[0]?.content) {
      return new Response('Page content not found', { status: 404 });
    }

    const content = new bot.Wikitext(page.revisions[0].content);
    const sections = await content.parseSections();

    const ipaData = extractIPA(sections);

    if (!ipaData) {
      console.error(`No IPA data found for ${word}`, ipaData);
      return new Response(`No IPA data found for ${word}`, { status: 404 });
    }

    // For troubleshooting; pre-parsed results
    // return Response.json(sections);

    return Response.json({
      word: word,
      ipa: ipaData,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Error processing request', { status: 500 });
  }
}
