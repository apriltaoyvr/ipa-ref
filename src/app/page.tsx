import WordLookup from '@/components/WordLookup/WordLookup';

export default function Home() {
  return (
    <main className='h-screen'>
      <hgroup className='mb-4 text-center'>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-2'>
          IPA Reference
        </h1>
        <span>A site for looking up English IPA keys.</span>
      </hgroup>
      <article>
        
      </article>
      <WordLookup />
    </main>
  );
}
