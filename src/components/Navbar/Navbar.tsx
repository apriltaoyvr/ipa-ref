import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='mx-2 my-4 flex w-full lg:w-auto flex-row gap-2 place-self-center rounded-full border border-muted/25 bg-background px-4 py-2 text-muted-foreground lg:grid lg:grid-cols-4 lg:gap-8'>
      <Link
        href='/'
        className='w-full rounded-full bg-secondary/33 px-3 py-1 text-center font-semibold transition-colors hover:bg-secondary/60'
      >
        Home
      </Link>

      <Link
        href='/about'
        className='w-full rounded-full bg-secondary/33 px-3 py-1 text-center font-semibold transition-colors hover:bg-secondary/60'
      >
        About
      </Link>
      <Link
        href='https://en.wikipedia.org/wiki/Help:IPA/English#Key'
        className='w-full rounded-full bg-secondary/33 px-3 py-1 text-center font-semibold transition-colors hover:bg-secondary/60'
      >
        IPA Key
      </Link>
      <Link
        href='https://github.com/apriltaoyvr/ipa-ref'
        className='w-full rounded-full bg-secondary/33 px-3 py-1 text-center font-semibold transition-colors hover:bg-secondary/60'
      >
        Github
      </Link>
    </nav>
  );
}
