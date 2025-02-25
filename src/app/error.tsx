'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className='flex flex-col place-content-center place-items-center'>
      <h1 className='mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
        Something went wrong!
      </h1>
      <Button
        variant={'destructive'}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </main>
  );
}
