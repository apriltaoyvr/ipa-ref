// route.ts
import { Mwn } from 'mwn';
import { extractIPA } from './wiktionaryHelpers';

/**
 * The API route for the Wiktionary fetcher and parser using Wikimedia's API and the mwn library
 * 
 * @param request - The incoming request
 * @param {Object} params - The parameters from the request
 * @param {string} params.word - The word to search for
 * @returns {Promise<Response>} response - A promise for the response
 * @returns {string} response.word - The word that was searched for
 * @returns {IPAType[]} response.ipa - IPA information for a pronunciation of a word
 * 
 * @requires mwn
 * @see {@link https://en.wiktionary.org/wiki/User:Amgine/Wiktionary_data_%26_API}
 * @see {@link https://mwn.toolforge.org/docs/api/}
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ word: string }> },
) {
  try {
    const word = (await params)?.word;

    // Initialize the Wiktionary bot
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

    // Parse the page content from the latest revisions to Wikitext
    const content = new bot.Wikitext(page.revisions[0].content);

    // Parse page content into page sections
    const sections = await content.parseSections();

    // Filter for the English sections of a page, then filter them down to the pronunciation sections, then parse those sections for IPA data
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
