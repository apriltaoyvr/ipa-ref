import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ConsonantTable } from './tables/consonant-table';
import { VowelTable } from './tables/vowel-table';
import { OtherTable } from './tables/other-table';

export function IPAKey() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button id='ipa-key-trigger' variant='outline' className='hover:cursor-pointer'>
          IPA Key
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>IPA Key</SheetTitle>
          <SheetDescription>
            A quick cheat sheet for IPA characters from{' '}
            <Link
              className='hover:text-muted-foreground/90 underline font-semibold'
              href='https://en.wikipedia.org/wiki/Help:IPA/English#Key'
            >
              Wikipedia
            </Link>
          </SheetDescription>
        </SheetHeader>
        <section className='overflow-y-auto p-2'>
          <Tabs defaultValue='consonants'>
            <TabsList className='sticky top-0 z-50 mb-4 place-self-center'>
              <TabsTrigger value='consonants'>Consonants</TabsTrigger>
              <TabsTrigger value='vowels'>Vowels</TabsTrigger>
              <TabsTrigger value='other'>Other</TabsTrigger>
            </TabsList>
            <TabsContent value='consonants'>
              <ConsonantTable />
            </TabsContent>
            <TabsContent value='vowels'>
              <VowelTable />
            </TabsContent>
            <TabsContent value='other'>
              <OtherTable />
            </TabsContent>
          </Tabs>
        </section>
      </SheetContent>
    </Sheet>
  );
}
