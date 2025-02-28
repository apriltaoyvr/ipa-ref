import Link from 'next/link';
import WordLookup from '@/components/word-info/WordLookup';

export default function Home() {
  return (
    <>
      <header className='mb-8'>
        <hgroup className='mb-4 text-center'>
          <h1 className='my-2 scroll-m-20 text-4xl font-bold tracking-tight uppercase lg:text-5xl font-title'>
            IPA Reference
          </h1>
          <span className='my-2 scroll-m-20 text-lg tracking-tight text-secondary-foreground/90 lg:text-xl'>
            /ˌaɪ̯.pʰiːˈeɪ̯ˈɹɛf.(ə)ɹəns/
          </span>
        </hgroup>
      </header>
      <WordLookup />
    </>
  );
}
