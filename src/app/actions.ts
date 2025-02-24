'use server';

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://wiktionary.vercel.app' : 'http://localhost:3000';

export async function getWord(word: string) {
  const response = fetch(`${baseUrl}/api/${word}`).then((res) => res.json());
  return response;
}
