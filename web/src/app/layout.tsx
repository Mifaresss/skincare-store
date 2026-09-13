import clsx from 'clsx';
import type { Metadata } from 'next';
import { Caveat, Inter, Manrope } from 'next/font/google';
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
});

export const metadata: Metadata = {
  title: 'LUMEA — Skincare made simple',
  description: 'Thoughtful formulas for healthy, glowing skin.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={clsx(manrope.variable, inter.variable, caveat.variable)}>
      <body>{children}</body>
    </html>
  );
}
