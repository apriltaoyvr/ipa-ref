'use client';
import { useActionState } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { fetchWiktionaryByWord, fetchWordDefinition } from '@/lib/actions';
import type { IPAType } from '@/types/wiktionary';
import type { IMerriamWebster } from '@/types/merriam-webster';

type WordData = {
  word: string | undefined;
  wiktionary: IPAType[] | null;
  merriam: IMerriamWebster[] | null;
};

export default function WordLookup() {
  const [state, formAction, isPending] = useActionState(handleFormSubmit, defaultState);

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
        <Card
          className={clsx('max-h-[50vh] gap-2 overflow-y-auto', {
            'border-red-400/75': !state.merriam || !state.merriam[0].shortdef,
          })}
        >
          <CardHeader className='mb-2'>
            <CardTitle
              className={
                'mb-2 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight capitalize first:mt-0'
              }
            >
              {isPending
                ? 'Loading...'
                : state.word
                  ? state.word
                  : 'Word not found'}
            </CardTitle>
            <CardDescription className='max-w-prose whitespace-pre-line'>
              <ul>
                {!state.merriam || !state.merriam[0].shortdef
                  ? `Failed to fetch ${state.word ?? 'word'} from Merriam-Webster.`
                  : state.merriam[0].shortdef.length > 0 &&
                    state.merriam[0].shortdef.map((definition) => (
                      <li key={definition} className='normal-case'>
                        {definition}
                      </li>
                    ))}
              </ul>
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            {state.wiktionary && state.wiktionary.length > 0 && (
              <div>
                <h3 className='mb-2 scroll-m-20 text-2xl font-semibold tracking-tight'>
                  Wiktionary
                </h3>
                <ul>
                  {state.wiktionary.map((entry, index) => (
                    <li key={index.toString() + entry.dialects}>
                      <span>{entry.pronunciations.join(', ')} </span>
                      <span className='font-semibold text-secondary-foreground/50'>
                        {entry.dialects &&
                          entry.dialects.length > 0 &&
                          `(${entry.dialects?.join(', ')})`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {state.merriam &&
              state.merriam[0].shortdef &&
              state?.merriam[0].hwi.prs &&
              state?.merriam[0].hwi.prs.length > 0 && (
                <div>
                  <h3 className='mb-2 scroll-m-20 text-2xl font-semibold tracking-tight'>
                    Merriam-Webster
                  </h3>
                  <ul>
                    {state.merriam[0].hwi.prs &&
                      state.merriam[0].hwi.prs.length > 0 &&
                      state.merriam[0].hwi.prs.map((pronunciation) => (
                        <li key={pronunciation.ipa}>
                          <span>/{pronunciation.ipa}/</span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
          </CardContent>
          <CardFooter className='flex flex-row gap-1 place-self-end text-sm'>
            {state.word && (
              <>
                <Link
                  href={`https://en.wiktionary.org/wiki/${state.word.toLowerCase()}`}
                  className='text-primary-foreground/50 transition-colors hover:text-accent/90'
                >
                  WI
                </Link>
                <Link
                  href={`https://www.merriam-webster.com/dictionary/${state.word.toLowerCase()}`}
                  className='text-primary-foreground/50 transition-colors hover:text-accent/90'
                >
                  MW
                </Link>
              </>
            )}
          </CardFooter>
        </Card>
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
}

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
    wiktionary: wiktionaryData?.ipa ?? null,
    merriam: merriamWebData,
  };

  console.log(response);

  return response;
};