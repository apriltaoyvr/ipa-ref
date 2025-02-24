'use client';
import { useActionState } from 'react';
import Link from 'next/link';
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
import type { WordLookupErrorType } from '@/lib/actions';

type WordData =
  | {
      word: string | undefined;
      wiktionary: IPAType[] | null;
      merriam: IMerriamWebster[];
    }
  | WordLookupErrorType;

export default function WordLookup() {
  const handleFormSubmit = async (
    state: WordData,
    payload: FormData
  ): Promise<WordData> => {
    const inputWord = payload.get('word') as string;
    const [wiktionaryData, merriamWebData] = await Promise.all([fetchWiktionaryByWord(inputWord), fetchWordDefinition(inputWord)]);

    // Error handling
    if ('error' in wiktionaryData || 'error' in merriamWebData) {
      const errorMessage: WordLookupErrorType = {
        error: true,
        status: 0,
        message: '',
      };

      if ('error' in wiktionaryData) {
        errorMessage.status = wiktionaryData.status;
        errorMessage.message += wiktionaryData.message;
      }

      if ('error' in merriamWebData) {
        errorMessage.status = merriamWebData.status;
        errorMessage.message += merriamWebData.message;
      }

      return errorMessage;
    }

    const successfulResponse: WordData = {
      word: payload.get('word') as string,
      wiktionary: wiktionaryData?.ipa ?? null,
      merriam: merriamWebData ?? null,
    };

    return successfulResponse;
  };
  // @ts-expect-error - `useActionState` will return invalid for the default state; missing full data for Merriam Webster but not all keys are needed
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    word: 'Example',
    merriam: [
      {
        meta: {
          id: 'example',
          uuid: 'example-uuid',
          src: 'example-src',
          section: 'alpha',
        },
        hwi: { hw: 'example', prs: [{ ipa: 'ˈɛɡzæmpəl' }] },
        fl: 'noun',
        ins: [],
        def: [],
        shortdef: [
          'one that serves as a pattern to be imitated or not to be imitated',
        ],
      },
    ],
    wiktionary: null,
  });

  return (
    <section className='h-full flex flex-col place-content-start place-items-center'>
      <form
        action={formAction}
        className='flex flex-row gap-2 place-content-center place-items-end mb-8'
      >
        <div className='grid w-full max-w-sm place-items-center gap-1.5'>
          <Label htmlFor='word' className='place-self-start'>
            Word
          </Label>
          <Input type='text' id='word' name='word' />
        </div>
        <Button type='submit' disabled={isPending}>
          Search
        </Button>
      </form>
      <section className='flex flex-col min-w-lg'>
        <Card className='gap-2'>
          <CardHeader className='mb-2'>
            <CardTitle className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2 capitalize'>
              {isPending
                ? 'Loading...'
                : 'error' in state
                ? 'Word not found'
                : state.word}
            </CardTitle>
            <CardDescription className='max-w-prose whitespace-pre-line'>
              {'merriam' in state && state.merriam
                ? state.merriam[0].shortdef.join('\n')
                : 'error' in state
                ? state.message
                : 'Your description here'}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            {'wiktionary' in state && state.wiktionary && (
              <div>
                <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight mb-2'>
                  Wiktionary IPA {state.wiktionary.length > 1 ? 'Keys' : 'Key'}
                </h3>
                <ul>
                  {state.wiktionary.map((entry, index) => (
                    <li key={index.toString() + entry.dialects}>
                      <span>{entry.pronunciations.join(', ')} </span>
                      <span className='text-secondary-foreground'>
                        {entry.dialects && `(${entry.dialects?.join(', ')})`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {'merriam' in state && state.merriam[0].hwi && (
              <div>
                <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight mb-2'>
                  Merriam-Webster IPA{' '}
                  {state.merriam[0].hwi.prs.length > 1 ? 'Keys' : 'Key'}
                </h3>
                <ul>
                  {state.merriam[0].hwi.prs.map((pronunciation) => (
                    <li key={pronunciation.ipa}>
                      <span>/{pronunciation.ipa}/</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter className='flex flex-row gap-1 text-muted-foreground text-sm place-self-end'>
            {'word' in state && (
              <>
                <Link
                  href={`https://en.wiktionary.org/wiki/${state.word}`}
                  className='text-accent hover:text-accent/90 transition-colors'
                >
                  WI
                </Link>
                <Link
                  href={`https://www.merriam-webster.com/dictionary/${state.word}`}
                  className='text-accent hover:text-accent/90 transition-colors'
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
