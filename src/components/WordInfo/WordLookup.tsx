'use client';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fetchWiktionaryByWord, fetchWordDefinition } from '@/lib/actions';
import { WordCard } from './Card/WordCard';
import { SkeletonCard } from './Card/SkeletonCard';
import type { IPAType } from '@/types/wiktionary';
import type { IMerriamWebster } from '@/types/merriam-webster';

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
      <form
        action={formAction}
        className='mb-8 flex flex-row place-content-center place-items-end gap-2'
      >
        <div className='grid w-full max-w-sm place-items-center gap-1.5'>
          <Label htmlFor='word' className='place-self-start'>
            Word
          </Label>
          <Input type='text' id='word' name='word' className='bg-background' />
        </div>
        <Button type='submit' disabled={isPending}>
          Search
        </Button>
      </form>
      <section className='flex flex-col p-4 lg:min-w-lg'>
        {isPending ? <SkeletonCard /> : <WordCard state={state} /> }
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
      ],
    },
  ],
  wiktionary: null,
};

const handleFormSubmit = async (
  state: WordData,
  payload: FormData,
): Promise<WordData> => {
  const inputWord = payload.get('word') as string;
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
