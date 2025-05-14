'use client';
import { useActionState } from 'react';
import { fetchWiktionaryByWord, fetchWordDefinition } from '@/lib/actions';
import { WordCard, SkeletonCard } from './word-card/word-card';
import { WordSearchForm } from './search-form/search-form';
import { defaultWordLookupState } from './default-data';
import type { WiktionaryIPAType } from '@/types/wiktionary';
import type { IMerriamWebster } from '@/types/merriam-webster';

export type WordDataType = {
  word: string;
  wiktionary: { ipa: WiktionaryIPAType[] | null } | null;
  merriam: IMerriamWebster[] | null;
};

export default function WordInfo() {
  const [state, formAction, isPending] = useActionState<WordDataType, FormData>(
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
  state: WordDataType,
  payload: FormData,
): Promise<WordDataType> => {
  const inputWord = payload.get('word') as string;
  if (!inputWord) return state;
  const [wiktionaryData, merriamWebData] = await Promise.all([
    fetchWiktionaryByWord(inputWord),
    fetchWordDefinition(inputWord),
  ]);

  // NOTE: Merriam-Webster returns an array of definitions for entries that don't return a result but resemble other words.
  // This means there is extra type safety needed for conditional rendering.
  const response: WordDataType = {
    word: payload.get('word') as string,
    wiktionary: { ipa: wiktionaryData?.ipa ?? null },
    merriam: merriamWebData,
  };

  return response;
};

