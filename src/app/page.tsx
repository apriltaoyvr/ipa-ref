import WordLookup from '@/components/WordInfo/WordLookup';

export default function Home() {
  return (
    <main className='flex flex-col place-content-start place-items-center h-screen p-4'>
      <hgroup className='mb-4'>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2'>
          IPA Reference
        </h1>
      </hgroup>
      <WordLookup />
    </main>
  );
}
