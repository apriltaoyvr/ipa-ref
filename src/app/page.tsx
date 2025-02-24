import WordLookup from '@/components/WordLookup';

export default function Home() {
  return (
    <main className='flex flex-col place-content-center place-items-center h-screen'>
      <h1 className='text-2xl'>Wiktionary</h1>
      <WordLookup />
    </main>
  );
}
