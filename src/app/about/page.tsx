import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className='flex flex-col gap-2'>
      <hgroup>
        <h1 className='mb-8 scroll-m-20 text-center text-3xl font-bold tracking-tight lg:text-5xl'>
          About this site
        </h1>
      </hgroup>
      <article className='flex flex-col gap-2'>
        <section className='mb-2'>
          <h2 className='mb-2 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
            What is this site for?
          </h2>
          <article className='flex max-w-prose flex-col gap-2'>
            <p>
              For quickly fetching IPA transcriptions of English words from{' '}
              <Link
                href='https://en.wiktionary.org/'
                className='text-accent underline hover:text-accent/90'
              >
                Wiktionary
              </Link>{' '}
              and{' '}
              <Link
                href='https://www.merriam-webster.com/'
                className='text-accent underline hover:text-accent/90'
              >
                Merriam-Webster
              </Link>{' '}
              using their APIs.
            </p>
            <p>
              If you don't know what the IPA is, it's the{' '}
              <Link
                href='https://en.wikipedia.org/wiki/International_Phonetic_Alphabet'
                className='text-accent underline hover:text-accent/90'
              >
                International Phonetic Alphabet
              </Link>
              : a handy way to represent different sounds in different
              languages.
            </p>
          </article>
        </section>
        <section className='mb-2'>
          <h2 className='mb-2 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
            Are you planning to add [suggested feature]?
          </h2>
          <article className='flex max-w-prose flex-col gap-2'>
            <p>
              I'd love to hear any suggestions you have and I love trying out
              new things. Feel free to drop anything you'd like (or submit a PR
              to add these things yourself!) on the site's{' '}
              <Link
                href='https://github.com/apriltaoyvr/ipa-ref'
                className='text-accent underline hover:text-accent/90'
              >
                Github repo
              </Link>
              .
            </p>
          </article>
        </section>
        <section className='mb-2'>
          <h2 className='mb-2 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
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
