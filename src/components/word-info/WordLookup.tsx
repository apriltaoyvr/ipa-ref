'use client';
import { useActionState } from 'react';
import { fetchWiktionaryByWord, fetchWordDefinition } from '@/lib/actions';
import { WordCard } from './card/WordCard';
import { SkeletonCard } from './card/SkeletonCard';
import type { IPAType } from '@/types/wiktionary';
import type { IMerriamWebster } from '@/types/merriam-webster';
import { WordSearch } from './search/WordSearch';

export type WordData = {
  word: string | undefined;
  wiktionary: { ipa: IPAType[] | null } | null;
  merriam: IMerriamWebster[] | null;
};

export default function WordLookup() {
  const [state, formAction, isPending] = useActionState(
    handleFormSubmit,
    defaultState,
  );

  return (
    <section className='flex flex-col place-content-center place-items-center'>
      <WordSearch formAction={formAction} isPending={isPending} />
      <section className='flex flex-col p-4 lg:min-w-lg'>
        {isPending ? <SkeletonCard /> : <WordCard state={state} />}
      </section>
    </section>
  );
}

const defaultState = {
  word: 'Example',
  merriam: [
    {
      hwi: { hw: 'example', prs: [{ ipa: 'ˈɛɡzæmpəl' }] },
      shortdef: [
        'one that serves as a pattern to be imitated or not to be imitated',
        'someone or something that is mentioned to help explain what you are saying or to show that a general statement is true',
        'something or someone chosen from a group in order to show what the whole group is like',
      ],
    },
  ],
  wiktionary: {
    ipa: [
      { pronunciations: ['/ɪɡˈzɑːm.pəl/'], dialects: ['RP'] },
      { pronunciations: ['/ɪɡˈzæm.pəl/', '[ɪɡˈzɛəmpəɫ]'], dialects: ['US'] },
    ],
  },
};

const handleFormSubmit = async (
  state: WordData,
  payload: FormData,
): Promise<WordData> => {
  const inputWord = payload.get('word') as string;
  if (!inputWord) return state;
  const [wiktionaryData, merriamWebData] = await Promise.all([
    fetchWiktionaryByWord(inputWord),
    fetchWordDefinition(inputWord),
  ]);

  // NOTE: Merriam-Webster returns an array of definitions for entries that don't return a result but resemble other words.
  // This means there is extra type safety needed for conditional rendering.
  const response: WordData = {
    word: payload.get('word') as string,
    wiktionary: { ipa: wiktionaryData?.ipa ?? null },
    merriam: merriamWebData,
  };

  return response;
};
