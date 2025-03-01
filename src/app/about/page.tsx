import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className='flex flex-col gap-2 p-2'>
      <hgroup>
        <h1 className='mb-8 scroll-m-20 text-center font-title text-3xl font-bold tracking-tight lg:text-5xl'>
          About this site
        </h1>
      </hgroup>
      <article className='flex flex-col gap-2'>
        <section className='mb-2'>
          <h2 className='mb-2 scroll-m-20 border-b-2 border-primary pb-2 font-title text-xl font-semibold tracking-tight first:mt-0 lg:text-3xl'>
            What is this site for?
          </h2>
          <article className='flex max-w-prose flex-col gap-2'>
            <p>
              For quickly fetching IPA transcriptions of English words from{' '}
              <Link
                href='https://en.wiktionary.org/'
                className='font-semibold underline hover:text-foreground/90'
              >
                Wiktionary
              </Link>{' '}
              and{' '}
              <Link
                href='https://www.merriam-webster.com/'
                className='font-semibold underline hover:text-foreground/90'
              >
                Merriam-Webster
              </Link>{' '}
              using their APIs.
            </p>
            <p>
              If you don't know what the IPA is, it's the{' '}
              <Link
                href='https://en.wikipedia.org/wiki/International_Phonetic_Alphabet'
                className='font-semibold underline hover:text-foreground/90'
              >
                International Phonetic Alphabet
              </Link>
              : a handy way to represent different sounds in different
              languages.
            </p>
            <p>
              Note that this is a site for fetching transcriptions. If you want
              more detailed information on a word, I recommend that you click on
              the links in the bottom right of the info box to view the pages
              where the data is sourced from.
            </p>
          </article>
        </section>
        <section className='mb-2'>
          <h2 className='mb-2 scroll-m-20 border-b-2 border-primary pb-2 font-title text-xl font-semibold tracking-tight first:mt-0 lg:text-3xl'>
            Are you planning to add [suggested feature]?
          </h2>
          <article className='flex max-w-prose flex-col gap-2'>
            <p>
              Feel free to drop suggestions you'd have (or submit a PR to add
              these things yourself!) on the site's{' '}
              <Link
                href='https://github.com/apriltaoyvr/ipa-ref'
                className='font-semibold underline hover:text-foreground/90'
              >
                Github repo
              </Link>
              .
            </p>
          </article>
        </section>
        <section className='mb-2'>
          <h2 className='mb-2 scroll-m-20 border-b-2 border-primary pb-2 font-title text-xl font-semibold tracking-tight first:mt-0 lg:text-3xl'>
            Who am I?
          </h2>
          <article className='flex max-w-prose flex-col gap-2'>
            <p>
              A full-stack dev passionate about linguistics and language
              learning.
            </p>
          </article>
        </section>
      </article>
    </div>
  );
}
