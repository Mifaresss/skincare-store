export type SeedImage = {
  file: string;
  alt: string;
};

type SeedVariantOption = {
  label: string;
  image?: SeedImage;
  discountPercent?: number;
};

type SeedVariantGroup = {
  name: string;
  options: SeedVariantOption[];
};

type SeedDiscount =
  | { discountType: 'none' }
  | { discountType: 'percentage'; discountPercent: number }
  | { discountType: 'salePrice'; salePrice: number };

type SeedProduct = SeedDiscount & {
  name: string;
  size?: string;
  image: SeedImage;
  price: number;
  badges: string[];
  categories: string[];
  variantGroups: SeedVariantGroup[];
};

export const announcements = [
  'Get 15% off with code LUMEAFIRST15',
  'Free UK delivery on orders over £40',
  'Dermatologist-inspired care for every skin type',
];

export const badges = ['Sale', 'New', 'Bestseller'];

export const categories = ['Cleansers', 'Face Wash', 'Makeup Removers'];

const routineSetOption: SeedImage = {
  file: 'skincare-routine-set-option.jpg',
  alt: 'Skincare products laid out on a wooden table',
};

const sunProtectionOption: SeedImage = {
  file: 'daily-sun-protection-option.jpg',
  alt: 'Drop of sun protection oil on the back of a hand',
};

export const products: SeedProduct[] = [
  {
    name: 'Hyaluronic Acid Serum',
    size: '30 ml',
    image: {
      file: 'hyaluronic-acid-serum.jpg',
      alt: 'Hands pouring serum onto a cotton pad',
    },
    price: 28,
    discountType: 'percentage',
    discountPercent: 15,
    badges: ['Sale'],
    categories: ['Cleansers', 'Makeup Removers'],
    variantGroups: [
      {
        name: 'Choose formula',
        options: [{ label: 'Hyaluronic Acid 2%' }, { label: 'Hyaluronic + B5' }],
      },
    ],
  },
  {
    name: 'Daily Moisturiser',
    size: '50 ml',
    image: {
      file: 'daily-moisturiser.jpg',
      alt: 'Moisturiser bottle next to a bowl of cream',
    },
    price: 32,
    discountType: 'salePrice',
    salePrice: 27.2,
    badges: ['New', 'Bestseller'],
    categories: ['Cleansers'],
    variantGroups: [
      {
        name: 'Skin type',
        options: [{ label: 'Dry' }, { label: 'Normal' }, { label: 'Sensitive' }],
      },
      {
        name: 'Size',
        options: [
          { label: '30 ml' },
          { label: '50 ml', discountPercent: 10 },
          { label: '100 ml', discountPercent: 20 },
        ],
      },
    ],
  },
  {
    name: 'Daily Face Cleanser',
    size: '150 ml',
    image: {
      file: 'daily-face-cleanser.jpg',
      alt: 'Swatch of face cleanser on a light background',
    },
    price: 20,
    discountType: 'percentage',
    discountPercent: 15,
    badges: ['Bestseller'],
    categories: ['Cleansers', 'Face Wash', 'Makeup Removers'],
    variantGroups: [
      {
        name: 'Choose formula',
        options: [{ label: 'Gentle Hydrating' }, { label: 'Deep Cleansing' }],
      },
    ],
  },
  {
    name: 'Cleanse + Treat + Hydrate',
    size: '3 products',
    image: {
      file: 'skincare-routine-set.jpg',
      alt: 'Serum, mist and cleansing oil bottles on a dark wooden surface',
    },
    price: 65,
    discountType: 'salePrice',
    salePrice: 52,
    badges: ['New', 'Sale'],
    categories: ['Cleansers', 'Face Wash'],
    variantGroups: [
      {
        name: 'Set includes',
        options: [
          { label: 'Cleanser + Serum + Cream', image: routineSetOption },
          { label: 'Cleanser + Serum + SPF', image: routineSetOption },
        ],
      },
    ],
  },
  {
    name: 'Daily Sun Protection',
    size: '50 ml',
    image: {
      file: 'daily-sun-protection.jpg',
      alt: 'Hands applying toner to a cotton pad',
    },
    price: 26,
    discountType: 'salePrice',
    salePrice: 22,
    badges: ['Bestseller'],
    categories: ['Cleansers'],
    variantGroups: [
      {
        name: 'Choose finish',
        options: [
          { label: 'Invisible Finish', image: sunProtectionOption },
          { label: 'Tinted Finish', image: sunProtectionOption },
        ],
      },
    ],
  },
];
