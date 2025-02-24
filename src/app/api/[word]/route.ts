import { Mwn } from 'mwn';
import { groupByLanguage, formatLanguageSections } from '../wiktionaryHelpers';

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
  _: Request,
  { params }: { params: Promise<{ word: string }> }
) {
  try {
    const word = (await params).word || 'word';

    const page = await bot.read(word, {
      prop: ['revisions'],
      rvprop: ['content'],
    });

    if (!page.revisions?.[0]?.content) {
      return new Response('Page content not found', { status: 404 });
    }

    const content = new bot.Wikitext(page.revisions[0].content);
    const sections = await content.parseSections();

    // Build section paths
    let currentLanguage = '';
    const sectionsByLanguage = sections.map((section) => {
      if (section.level === 2) {
        currentLanguage = section.header?.toLowerCase() || '';
        return { ...section, language: currentLanguage };
      }
      return { ...section, language: currentLanguage };
    });

    const languageSections = groupByLanguage(sectionsByLanguage);
    const formattedResponse = formatLanguageSections(languageSections);

    return Response.json({ word: word, ...formattedResponse });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Error processing request', { status: 500 });
  }
}
