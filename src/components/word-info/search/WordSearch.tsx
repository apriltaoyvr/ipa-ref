'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function WordSearch({
  formAction,
  isPending,
}: {
  formAction: (payload: FormData) => void;
  isPending: boolean;
}) {
  return (
    <form
      action={formAction}
      className='mb-8 flex flex-row place-content-center place-items-end gap-2'
    >
      <div className='grid w-full max-w-sm place-items-center gap-1.5'>
        <Label htmlFor='word' className='place-self-start'>
          Word
        </Label>
        <Input type='text' id='word' name='word' className='bg-background' />
      </div>
      <Button type='submit' disabled={isPending}>
        Search
      </Button>
    </form>
  );
}