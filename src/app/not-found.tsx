import Link from 'next/link'
 import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className='flex flex-col gap-8 p-4'>
      <hgroup>
        <h1 className='my-2 scroll-m-20 text-2xl font-bold tracking-tight lg:text-4xl font-title'>404 - Not Found</h1>
        <span className='text-muted-foreground'>Could not find requested resource</span>
      </hgroup>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </main>
  )
}
