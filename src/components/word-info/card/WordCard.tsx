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
import type { WordData } from '../WordLookup';

export function WordCard({ state }: { state: WordData }) {
  const { merriam } = state;
  const { word } = state;
  const wiktionary = state.wiktionary?.ipa ?? null;
  const merriamPrs =
    merriam?.flatMap((entry) => entry?.hwi?.prs).filter((x) => x?.ipa) ?? null;

  return (
    <Card
      className={clsx('max-h-[50vh] gap-2 overflow-y-auto', {
        'border-red-400/75': !merriam && !wiktionary,
      })}
    >
      <CardHeader className='mb-2'>
        <CardTitle
          className={
            'mb-2 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight capitalize first:mt-0'
          }
        >
          {word ? word : 'Word not found'}
        </CardTitle>
        <CardDescription className='max-w-prose whitespace-pre-line'>
          <ul>
            {!merriam || !merriam[0].shortdef
              ? `No definition found for ${word ?? 'word'} in Merriam-Webster.`
              : merriam[0].shortdef.length > 0 &&
                merriam[0].shortdef.map((definition) => (
                  <li key={definition} className='normal-case'>
                    {definition}
                  </li>
                ))}
          </ul>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        {wiktionary && wiktionary.length > 0 && (
          <div>
            <h3 className='mb-2 scroll-m-20 text-2xl font-semibold tracking-tight'>
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
        {merriam && merriam[0].shortdef && (
          <div>
            <h3 className='mb-2 scroll-m-20 text-2xl font-semibold tracking-tight'>
              Merriam-Webster
            </h3>
            <ul>
              {merriamPrs &&
                merriamPrs.map((pronunciationEntry, index) => (
                  <li key={`merriam-entry-${index}-${word}`}>
                    /{pronunciationEntry.ipa}/
                  </li>
                ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className='flex flex-row gap-1 place-self-end text-sm'>
        {word && (
          <>
            <Link
              href={`https://en.wiktionary.org/wiki/${word.toLowerCase()}`}
              className='text-primary-foreground/50 transition-colors hover:text-accent/90'
            >
              WI
            </Link>
            <Link
              href={`https://www.merriam-webster.com/dictionary/${word.toLowerCase()}`}
              className='text-primary-foreground/50 transition-colors hover:text-accent/90'
            >
              MW
            </Link>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
