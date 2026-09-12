import type { Core } from '@strapi/strapi';
import { productPricingMiddleware } from './lib/product-pricing';

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.documents.use(productPricingMiddleware(strapi));
  },

  bootstrap() {},
};
