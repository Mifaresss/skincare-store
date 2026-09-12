import type { Core } from '@strapi/strapi';
import { productPricingMiddleware } from './lib/product-pricing';
import { seed } from './seed';

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.documents.use(productPricingMiddleware(strapi));
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seed(strapi);
  },
};
