import type { Metadata } from 'next';
import { Public_Sans, DM_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Navbar } from '@/components/navbar';
import './globals.css';

const publicSans = Public_Sans({
  variable: '--font-public-sans',
  subsets: ['latin'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'IPA Reference',
  description: 'A site for looking up English IPA keys.',
  metadataBase: new URL('https://ipa-ref.vercel.app/'),
  keywords: [
    'IPA',
    'English',
    'lookup',
    'dictionary',
    'International Phonetic Alphabet',
    'phonetics',
    'linguistics',
    'English learning',
    'transcriptions',
    'word transcriptions',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${publicSans.variable} ${dmSans.variable} min-h-screen antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='flex min-h-screen w-full flex-col flex-wrap content-center justify-start mesh-gradient p-1 md:p-2 lg:justify-center'>
            <Navbar />
            <main className='m-2 flex flex-col flex-wrap place-content-center place-items-center rounded-lg border-3 border-foreground bg-background p-2 shadow-md md:p-4 lg:p-8'>
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
