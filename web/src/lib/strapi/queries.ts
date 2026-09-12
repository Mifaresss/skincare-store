import { cacheLife, cacheTag } from 'next/cache';
import { STRAPI_CACHE_TAG, strapiFetch } from './client';
import {
  announcementBarResponseSchema,
  categoriesResponseSchema,
  productsResponseSchema,
} from './schemas';

const imageFields = ['url', 'alternativeText', 'width', 'height'];

const announcementBarQuery = {
  populate: { messages: { fields: ['text'] } },
};

const categoriesQuery = {
  fields: ['name'],
  sort: ['sortOrder:asc', 'name:asc'],
  pagination: { pageSize: 100 },
};

const productsQuery = {
  fields: ['name', 'size', 'price', 'discountType', 'discountPercent', 'salePrice'],
  populate: {
    image: { fields: imageFields },
    badges: { fields: ['label'] },
    categories: { fields: ['documentId'] },
    variantGroups: {
      populate: { options: { populate: { image: { fields: imageFields } } } },
    },
  },
  sort: ['createdAt:asc'],
  pagination: { pageSize: 100 },
};

export async function getHomeContent() {
  'use cache';
  cacheLife('max');
  cacheTag(STRAPI_CACHE_TAG);

  const [announcements, categories, products] = await Promise.all([
    strapiFetch('/announcement-bar', announcementBarQuery, announcementBarResponseSchema),
    strapiFetch('/categories', categoriesQuery, categoriesResponseSchema),
    strapiFetch('/products', productsQuery, productsResponseSchema),
  ]);

  return {
    announcements,
    categories: categories.map((category) => ({
      ...category,
      products: products.filter((product) => product.categoryIds.includes(category.id)),
    })),
  };
}
