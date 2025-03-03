import Link from 'next/link';
import { clsx } from 'clsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { filterMerriamPrs } from '@/lib/helpers';
import type { WordData } from '../word-info';

export function WordCard({ state }: { state: WordData }) {
  const word = state.word.toLowerCase();
  const wiktionary = state.wiktionary?.ipa ?? null;
  const { merriam } = state;
  const merriamPrs = merriam && filterMerriamPrs(merriam, word);

  // Boolean consts to avoid repetition
  const wordFound = wiktionary && merriam && merriam?.length > 0;
  const merriamFound = merriam && merriam.length > 0 && merriam[0].shortdef;

  return (
    <Card
      className={clsx(
        'max-h-[50vh] gap-2 overflow-y-auto rounded-sm border-2 py-0 pt-6',
        {
          'border-dashed': !wordFound,
        },
      )}
    >
      <CardHeader className='mb-2'>
        <CardTitle
          className={clsx(
            'mb-2 scroll-m-20 border-b-2 pb-2 font-title text-3xl font-semibold tracking-tight capitalize first:mt-0',
            {
              'border-dashed': !wordFound,
            },
          )}
        >
          {wordFound ? word : 'Word not found'}
        </CardTitle>
        <CardDescription className='max-w-prose whitespace-pre-line'>
          {wordFound ? (
            <ul className='list-inside list-decimal'>
              {!merriamFound
                ? `No definition found for ${word ?? 'word'} in Merriam-Webster.`
                : merriam[0].shortdef.length > 0 &&
                  merriam[0].shortdef.map((definition) => (
                    <li key={definition} className='normal-case'>
                      {definition}
                    </li>
                  ))}
            </ul>
          ) : (
            <span>
              <strong className='capitalize'>{word}</strong> was not found in
              Wiktionary and Merriam-Webster.
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-2 pb-8'>
        {wordFound && (
          <div>
            <h3 className='mb-2 scroll-m-20 font-title text-2xl font-semibold tracking-tight'>
              Wiktionary
            </h3>
            <ul>
              {wiktionary.map((pronunciationEntry, index) => (
                <li key={`wiktionary-entry-${index}-${word}`}>
                  <span>{pronunciationEntry.pronunciations.join(', ')} </span>
                  <span className='font-semibold text-secondary-foreground/50'>
                    {pronunciationEntry.dialects &&
                      pronunciationEntry.dialects.length > 0 &&
                      `(${pronunciationEntry.dialects?.join(', ')})`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {merriamFound && (
          <div>
            <h3 className='mb-2 scroll-m-20 font-title text-2xl font-semibold tracking-tight'>
              Merriam-Webster
            </h3>
            <ul>
              {merriamPrs &&
                merriamPrs.map((pronunciationEntry, index) => (
                  <li key={`merriam-entry-${index}-${word}`}>
                    {pronunciationEntry && `/${pronunciationEntry?.ipa}/`}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter
        className={clsx(
          'flex w-full flex-row place-content-end gap-1 border-t-2 px-2 py-2 text-lg',
          { 'border-dashed': !wordFound },
        )}
      >
        <Button variant='ghost' asChild>
          <Link
            href={`https://en.wiktionary.org/wiki/${word.toLowerCase()}`}
            className='font-semibold text-muted-foreground transition-colors'
          >
            Wiktionary
          </Link>
        </Button>
        <Button variant='ghost' asChild>
          <Link
            href={`https://www.merriam-webster.com/dictionary/${word.toLowerCase()}`}
            className='font-semibold text-muted-foreground transition-colors'
          >
            Merriam-Webster
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
