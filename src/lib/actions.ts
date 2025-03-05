'use server';

import type { WikionaryReturnType } from '@/types/wiktionary';
import type { IMerriamWebster } from '@/types/merriam-webster';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://ipa-ref.vercel.app'
    : 'http://localhost:3000';

/**
 * Fetches the local Wiktionary API parser for the given word
 * 
 * @async
 * @param {string} word - Word to search for
 * @returns {Promise<WikionaryReturnType | null>} response - A promise with the Wiktionary API response
 * @returns {string} response.word - The word that was searched for
 * @returns {(WiktionaryIPAType[] | null)} response.ipa - An array of IPA information for a pronunciation of a word or null if not found
 * @returns {string[]} response.ipa.pronunciations - An array of IPA transcriptions for a pronunciation
 * @returns {(string[] | undefined)} response.ipa.dialects - Optional array containing respective dialect information for the pronunciation
 * @see extractIPA for more information on how the Wiktionary data is fetched and parsed
 */
export async function fetchWiktionaryByWord(
  word: string,
): Promise<WikionaryReturnType | null> {
  const response = await fetch(`${baseUrl}/api/wiktionary/${word.toLowerCase()}`);
  if (!response.ok) {
    return null;
  }
  const data = response.json();
  return data;
}

/**
 * Fetches the Merriam-Webster Learner's Dictionary API for the given word
 * 
 * @async
 * @param {string} word - Word to search for
 * @returns {Promise<IMerriamWebster | null>} - A promise with the API response
 * @see {@link https://dictionaryapi.com/products/json} for detailed information on the API
 */
export async function fetchWordDefinition(
  word: string,
): Promise<IMerriamWebster[] | null> {
  const response = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${word.toLowerCase()}?key=${
      process.env.MERRIAM_WEBSTER_API_KEY
    }`,
  );
  if (!response.ok) {
    return null;
  }
  return response.json();
}
