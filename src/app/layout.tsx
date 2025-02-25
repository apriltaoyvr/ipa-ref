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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <div className='min-h-screen min-w-screen bg-background/95 flex flex-col place-content-start place-items-center '>
          <Navbar />
          <main className='flex flex-col place-content-center place-items-center p-4 bg-background/80 rounded-lg shadow-md border border-muted/25 min-w-lg min-h-lg'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
