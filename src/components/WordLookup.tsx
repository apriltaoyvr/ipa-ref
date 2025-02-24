'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { getWord } from '@/lib/actions';
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
    <section>
      <form onSubmit={handleFormSubmit}>
        <Label htmlFor='word'>Word:</Label>
        <Input type='text' id='word' name='word' />
        <Button type='submit'>Search</Button>
      </form>
      {wordInfo && (
        <div>
          <h2>{wordInfo?.word}</h2>
          <ul>
            {wordInfo?.english?.ipa?.map((pronunciations, index) => (
              <div key={`wordInfo?.word-${pronunciations.dialect}-${index}`}>
                <span key={index}>{pronunciations.pronunciations.join(', ')}{' '}</span>
                <span>({pronunciations.dialect})</span>
              </div>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
