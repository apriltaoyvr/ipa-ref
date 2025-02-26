import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'IPA Reference',
  description: 'A site for looking up English IPA keys.',
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
    <html lang='en' className='dark'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <div className='flex min-h-screen w-full flex-col flex-wrap content-center justify-start bg-background/80 lg:justify-center p-2'>
          <Navbar />
          <main className='flex flex-col flex-wrap place-content-center place-items-center rounded-lg border border-muted/25 bg-background/80 m-2 p-4 lg:p-8 shadow-md'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
