'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { getWord } from '@/lib/actions';
import WordDisplay from './WordDisplay';
import type { FormEvent } from 'react';
import type { WordInfoType } from '@/types/wiktionary';

export default function WordLookup() {
  const [wordInfo, setWordInfo] = useState<WordInfoType | null>(null);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = await getWord(formData.get('word') as string);
    setWordInfo(data);
  };

  return (
    <section className='flex flex-col gap-4'>
      <form
        onSubmit={handleFormSubmit}
        className='flex flex-row gap-2 place-content-center place-items-end'
      >
        <div>
          <Label htmlFor='word'>Word</Label>
          <Input type='text' id='word' name='word' />
        </div>
        <Button type='submit'>Search</Button>
      </form>
      {wordInfo && <WordDisplay wordInfo={wordInfo} />}
    </section>
  );
}
