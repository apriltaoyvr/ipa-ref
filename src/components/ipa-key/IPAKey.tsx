import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ConsonantTable } from './tables/consonant-table';
import { VowelTable } from './tables/vowel-table';
import { OtherTable } from './tables/other-table';

export function IPAKey() {
  return (
    <Sheet>
      {/* Identical classes to Button secondary */}
      <SheetTrigger className='inline-flex h-9 items-center justify-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium whitespace-nowrap text-secondary-foreground shadow-xs transition-[color,box-shadow] outline-none hover:cursor-pointer hover:bg-secondary/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4'>
        IPA Key
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
            <TabsList className='mb-4 place-self-center'>
              <TabsTrigger value='consonants' className='text-background'>
                Consonants
              </TabsTrigger>
              <TabsTrigger value='vowels' className='text-background'>
                Vowels
              </TabsTrigger>
              <TabsTrigger value='other' className='text-background'>
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
