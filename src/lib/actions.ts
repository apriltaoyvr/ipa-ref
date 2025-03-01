'use server';

import { type APIReturnType } from '@/types/wiktionary';
import type { IMerriamWebster } from '@/types/merriam-webster';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://ipa-ref.vercel.app'
    : 'http://localhost:3000';

export async function fetchWiktionaryByWord(
  word: string,
): Promise<APIReturnType | null> {
  const response = await fetch(`${baseUrl}/api/wiktionary/${word.toLowerCase()}`);
  if (!response.ok) {
    return null;
  }
  const data = response.json();
  return data;
}

// NOTE: Wikitext is too painful to parse. Let's use a dictionary API (Merriam-Webster) for additional word info.
// https://dictionaryapi.com/products/json
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
