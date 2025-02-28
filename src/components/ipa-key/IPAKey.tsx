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
      {/* Identical classes to Button default */}
      <SheetTrigger asChild>
        <Button variant='outline' className='hover:cursor-pointer'>IPA Key</Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>IPA Key</SheetTitle>
          <SheetDescription>
            A quick cheat sheet for IPA characters
          </SheetDescription>
        </SheetHeader>
        <section className='p-2 overflow-y-auto'>
          <Tabs defaultValue='consonants'>
            <TabsList className='mb-4 place-self-center sticky top-0 z-50'>
              <TabsTrigger value='consonants'>
                Consonants
              </TabsTrigger>
              <TabsTrigger value='vowels'>
                Vowels
              </TabsTrigger>
              <TabsTrigger value='other'>
                Other
              </TabsTrigger>
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
