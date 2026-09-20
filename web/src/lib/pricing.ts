import type { ProductPricing } from './strapi/schemas';

type ResolvedPrice = {
  current: number;
  original: number | null;
  discountPercent: number | null;
};

const priceFormatter = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });

export const formatPrice = (value: number) => priceFormatter.format(value);

const withPercentDiscount = (price: number, discountPercent: number): ResolvedPrice => ({
  current: Math.round(price * (100 - discountPercent)) / 100,
  original: price,
  discountPercent,
});

export function resolvePrice(
  { price, discountType, discountPercent, salePrice }: ProductPricing,
  optionDiscountPercent: number | null = null,
): ResolvedPrice {
  if (optionDiscountPercent) return withPercentDiscount(price, optionDiscountPercent);

  if (discountType === 'percentage' && discountPercent) {
    return withPercentDiscount(price, discountPercent);
  }

  if (discountType === 'salePrice' && salePrice != null && salePrice < price) {
    return {
      current: salePrice,
      original: price,
      discountPercent: Math.round((1 - salePrice / price) * 100),
    };
  }

  return { current: price, original: null, discountPercent: null };
}
