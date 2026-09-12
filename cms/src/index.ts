import type { Core } from '@strapi/strapi';
import { productPricingMiddleware } from './lib/product-pricing';
import { syncRevalidationWebhook } from './lib/revalidation-webhook';
import { seed } from './seed';

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.documents.use(productPricingMiddleware(strapi));
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seed(strapi);
    await syncRevalidationWebhook(strapi);
  },
};
