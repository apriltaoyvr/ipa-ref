import WordLookup from '@/components/WordLookup';

export default function Home() {
  return (
    <main className='flex flex-col place-content-center place-items-center h-screen'>
      <hgroup className='mb-4'>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2'>
          English IPA Lookup
        </h1>
      </hgroup>
      <WordLookup />
    </main>
  );
}
