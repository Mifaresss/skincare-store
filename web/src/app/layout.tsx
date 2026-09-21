import clsx from 'clsx';
import type { Metadata } from 'next';
import { Caveat, Inter, Manrope } from 'next/font/google';
import { env } from '@/lib/env';
import '@/styles/globals.scss';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: '700',
});

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: '700',
});

const title = 'LUMEA — Skincare made simple';
const description =
  'Build a simple four-step skincare routine — cleanse, treat, moisturise and protect — with thoughtful formulas for healthy, glowing skin.';

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'LUMEA',
    locale: 'en_GB',
    title,
    description,
  },
  twitter: { card: 'summary_large_image', title, description },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-GB" className={clsx(manrope.variable, inter.variable, caveat.variable)}>
      <body>{children}</body>
    </html>
  );
}
