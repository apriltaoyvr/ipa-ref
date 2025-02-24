import { Mwn } from 'mwn';
import { extractPronunciation } from '../wiktionaryHelpers';

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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ word: string }> }
) {
  try {
    // Extract the word and language from the request
    const word = (await params).word || 'word';
    const url = new URL(request.url);
    const language = url.searchParams.get('language')?.toLowerCase() || 'english';

    // Fetch the page content
    const page = await bot.read(word, {
      prop: ['revisions'],
      rvprop: ['content'],
    });

    if (!page.revisions?.[0]?.content) {
      return new Response('Page content not found', { status: 404 });
    }

    // Parse the content and extract pronunciation data
    const content = new bot.Wikitext(page.revisions[0].content);
    const sections = await content.parseSections();
    
    const pronunciationData = extractPronunciation(sections, language);

    if (!pronunciationData) {
      return new Response(
        `No pronunciation data found for ${word} in ${language}`,
        { status: 404 }
      );
    }

    return Response.json({
      word,
      ipa: pronunciationData
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Error processing request', { status: 500 });
  }
}
