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
import type { WordData } from '../word-info';
import { IMerriamWebster } from '@/types/merriam-webster';

export function WordCard({ state }: { state: WordData }) {
  const { merriam } = state;
  const word = state?.word?.toLowerCase() ?? null;
  const wiktionary = state.wiktionary?.ipa ?? null;
  const merriamPrs = parseMerriam(merriam, word);

  return (
    <Card
      className={clsx(
        'max-h-[50vh] gap-2 overflow-y-auto rounded-sm border-2 py-0 pt-6',
        {
          'border-destructive-400/75': !merriam && !wiktionary,
        },
      )}
    >
      <CardHeader className='mb-2'>
        <CardTitle
          className={
            'mb-2 scroll-m-20 border-b-2 pb-2 font-title text-3xl font-semibold tracking-tight capitalize first:mt-0'
          }
        >
          {word ? word : 'Word not found'}
        </CardTitle>
        <CardDescription className='max-w-prose whitespace-pre-line'>
          <ul className='list-inside list-decimal'>
            {!merriam || merriam.length === 0 || !merriam[0]?.shortdef
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
      <CardContent className='flex flex-col gap-2 border-b-2 pb-8'>
        {wiktionary && wiktionary.length > 0 && (
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
        {merriam && merriam.length > 0 && merriam[0].shortdef && (
          <div>
            <h3 className='mb-2 scroll-m-20 font-title text-2xl font-semibold tracking-tight'>
              Merriam-Webster
            </h3>
            <ul>
              {merriamPrs &&
                merriamPrs.map((pronunciationEntry, index) => (
                  <li key={`merriam-entry-${index}-${word}`}>
                    {pronunciationEntry && `/${pronunciationEntry.ipa}/`}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className='flex flex-row place-self-end gap-1 text-lg pb-2 px-2'>
        {word && (
          <>
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
          </>
        )}
      </CardFooter>
    </Card>
  );
}

function parseMerriam(merriamArray: IMerriamWebster[] | null, word: string | null) {
  if (!word) return null;
  if (!merriamArray || merriamArray.length === 0) return null;

  const regex = new RegExp(`${word}+(:[0-9]+)?$`)

  // Ensure the results match the word exactly (MW returns related words), then return prs or altprs which contain IPA transcriptions
  const wordsThatMatch = merriamArray?.filter(({ meta }) => word && meta.id.match(regex)).flatMap(({hwi}) => hwi.prs || hwi.altprs || []);

  if (wordsThatMatch.length === 0) return null;

  // Remove duplicates
  const set = new Set(wordsThatMatch);
  const ipaMap = new Map();

  set.forEach(item => {
    const key = item.ipa;
    
    if (!ipaMap.has(key)) {
      ipaMap.set(key, { ...item });
    } else {
      ipaMap.set(key, { ...ipaMap.get(key), ...item });
    }
  });

  const results = Array.from(ipaMap.values());

  // console.log('Merriam Array', merriamArray);
  // console.log('Words that match', wordsThatMatch);
  // console.log('Filtered results', results);

  return [...results];
}