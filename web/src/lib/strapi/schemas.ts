import { z } from 'zod';
import { toStrapiAssetUrl } from './client';

const imageSchema = z
  .object({
    url: z.string(),
    alternativeText: z.string().nullable(),
    width: z.number(),
    height: z.number(),
  })
  .transform(({ url, alternativeText, width, height }) => ({
    src: toStrapiAssetUrl(url),
    alt: alternativeText ?? '',
    width,
    height,
  }));

const variantGroupSchema = z.object({
  id: z.number(),
  name: z.string(),
  options: z.array(
    z.object({
      id: z.number(),
      label: z.string(),
      discountPercent: z.number().nullable(),
      image: imageSchema.nullable(),
    }),
  ),
});

const productSchema = z
  .object({
    documentId: z.string(),
    name: z.string(),
    size: z.string().nullable(),
    price: z.number(),
    discountType: z.enum(['none', 'percentage', 'salePrice']),
    discountPercent: z.number().nullable(),
    salePrice: z.number().nullable(),
    image: imageSchema,
    badges: z.array(z.object({ label: z.string() })),
    categories: z.array(z.object({ documentId: z.string() })),
    variantGroups: z.array(variantGroupSchema),
  })
  .transform(({ documentId, badges, categories, ...product }) => ({
    ...product,
    id: documentId,
    badges: badges.map(({ label }) => label),
    categoryIds: categories.map((category) => category.documentId),
  }));

const categorySchema = z
  .object({ documentId: z.string(), name: z.string() })
  .transform(({ documentId, name }) => ({ id: documentId, name }));

const announcementSchema = z.object({ id: z.number(), text: z.string() });

export const announcementBarResponseSchema = z
  .object({
    data: z.object({ messages: z.array(announcementSchema) }).nullable(),
  })
  .transform(({ data }) => data?.messages ?? []);

export const categoriesResponseSchema = z
  .object({ data: z.array(categorySchema) })
  .transform(({ data }) => data);

export const productsResponseSchema = z
  .object({ data: z.array(productSchema) })
  .transform(({ data }) => data);

export type Announcement = z.output<typeof announcementSchema>;
export type VariantGroup = z.output<typeof variantGroupSchema>;
export type Product = z.output<typeof productSchema>;
export type ProductPricing = Pick<
  Product,
  'price' | 'discountType' | 'discountPercent' | 'salePrice'
>;
export type Category = z.output<typeof categorySchema>;
