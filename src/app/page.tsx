import Link from 'next/link';
import WordLookup from '@/components/WordLookup/WordLookup';

export default function Home() {
  return (
    <>
      <header className='mb-8'>
        <hgroup className='mb-4 text-center'>
          <h1 className='my-2 scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl'>
            IPA Reference
          </h1>
          <span className='my-2 scroll-m-20 text-lg tracking-tight text-secondary-foreground/90 lg:text-xl'>
            /ˌaɪ̯ˌpʰiːˈeɪ̯ˈɹɛf.(ə)ɹəns/
          </span>
        </hgroup>
        <aside className='mb-4'>
          <p>
            A site for looking up IPA{' '}
            <Link
              href='https://en.wikipedia.org/wiki/International_Phonetic_Alphabet'
              className='text-accent underline hover:text-accent/90'
            >
              (International Phonetic Alphabet)
            </Link>{' '}
            transcriptions of English words.
          </p>
        </aside>
      </header>
      <WordLookup />
    </>
  );
}
