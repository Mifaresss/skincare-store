export type Step = {
  id: 'cleanse' | 'treat' | 'moisturise' | 'protect';
  title: string;
  tagline: string;
  description: string;
  shopLabel: string;
  image: { src: string; alt: string };
};

export const steps: Step[] = [
  {
    id: 'cleanse',
    title: 'Cleanse',
    tagline: 'Start with a fresh canvas.',
    description: 'Gently remove makeup, SPF and daily impurities without stripping your skin.',
    shopLabel: 'Shop cleansers',
    image: {
      src: '/images/steps/cleanse.jpg',
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
      src: '/images/steps/treat.jpg',
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
      src: '/images/steps/moisturise.jpg',
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
      src: '/images/steps/protect.jpg',
      alt: 'Woman with curly hair pressing a cotton pad to her forehead',
    },
  },
];
