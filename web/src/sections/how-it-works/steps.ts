import type { StaticImageData } from 'next/image';
import cleanseImage from '@/assets/images/steps/cleanse.jpg';
import moisturiseImage from '@/assets/images/steps/moisturise.jpg';
import protectImage from '@/assets/images/steps/protect.jpg';
import treatImage from '@/assets/images/steps/treat.jpg';

export type Step = {
  id: 'cleanse' | 'treat' | 'moisturise' | 'protect';
  title: string;
  tagline: string;
  description: string;
  shopLabel: string;
  image: { src: StaticImageData; alt: string };
};

export const steps: Step[] = [
  {
    id: 'cleanse',
    title: 'Cleanse',
    tagline: 'Start with a fresh canvas.',
    description: 'Gently remove makeup, SPF and daily impurities without stripping your skin.',
    shopLabel: 'Shop cleansers',
    image: {
      src: cleanseImage,
      alt: 'Hands pouring cleansing water onto a cotton pad',
    },
  },
  {
    id: 'treat',
    title: 'Treat',
    tagline: 'Target what your skin needs.',
    description:
      'Serums and treatments deliver targeted ingredients to help with dryness, dullness, texture and blemishes.',
    shopLabel: 'Shop treatments',
    image: {
      src: treatImage,
      alt: 'Hands applying toner from a bottle to a cotton pad',
    },
  },
  {
    id: 'moisturise',
    title: 'Moisturise',
    tagline: 'Lock in lasting hydration.',
    description:
      'Moisturisers help strengthen the skin barrier, lock in hydration and leave skin soft and balanced.',
    shopLabel: 'Shop moisturisers',
    image: {
      src: moisturiseImage,
      alt: 'Woman with a headband applying moisturiser to her cheek',
    },
  },
  {
    id: 'protect',
    title: 'Protect',
    tagline: 'Your essential final step.',
    description:
      'Daily SPF helps protect your skin from UV damage and keeps it looking healthy every day.',
    shopLabel: 'Shop SPF',
    image: {
      src: protectImage,
      alt: 'Woman with curly hair pressing a cotton pad to her forehead',
    },
  },
];
