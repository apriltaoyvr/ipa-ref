import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { IPAKey } from './ipa-key/IPAKey';

export function Navbar() {
  return (
    <nav className='mx-2 my-4 flex w-full flex-row place-content-center gap-2 place-self-center rounded-full border border-muted/25 bg-background px-4 py-2 text-sm text-muted-foreground lg:grid lg:w-auto lg:grid-cols-4 lg:gap-8 lg:text-base'>
      <Button variant='secondary' className='rounded-full' asChild>
        <Link href='/'>Home</Link>
      </Button>
      <Button variant='secondary' className='rounded-full' asChild>
        <Link href='/about'>About</Link>
      </Button>
      <IPAKey/>
      <Button variant='secondary' className='rounded-full' asChild>
        <Link href='https://github.com/apriltaoyvr/ipa-ref'>Github</Link>
      </Button>
    </nav>
  );
}
