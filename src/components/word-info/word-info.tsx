'use client';
import { useActionState } from 'react';
import { fetchWiktionaryByWord, fetchWordDefinition } from '@/lib/actions';
import { WordCard } from './card/word-card';
import { SkeletonCard } from './card/word-card-skeleton';
import { WordSearchForm } from './search/word-search-form';
import { defaultWordLookupState } from './defaultState';
import type { IPAType } from '@/types/wiktionary';
import type { IMerriamWebster } from '@/types/merriam-webster';

export type WordData = {
  word: string | undefined;
  wiktionary: { ipa: IPAType[] | null } | null;
  merriam: IMerriamWebster[] | null;
};

export default function WordInfo() {
  const [state, formAction, isPending] = useActionState<WordData, FormData>(
    handleFormSubmit,
    defaultWordLookupState,
  );

  return (
    <section className='flex flex-col place-content-center place-items-center'>
      <WordSearchForm formAction={formAction} isPending={isPending} />
      <section className='flex flex-col p-4 lg:min-w-lg'>
        {isPending ? <SkeletonCard /> : <WordCard state={state} />}
      </section>
    </section>
  );
}

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

