import type { Core, Modules } from '@strapi/strapi';
import { errors } from '@strapi/utils';

const PRODUCT_UID = 'api::product.product';
const WRITE_ACTIONS = new Set(['create', 'update']);

type DiscountType = 'none' | 'percentage' | 'salePrice';

type PricingFields = {
  price?: number | string | null;
  discountType?: DiscountType | null;
  discountPercent?: number | null;
  salePrice?: number | string | null;
};

type WriteParams = {
  documentId?: string;
  data?: PricingFields;
};

const fail = (path: keyof PricingFields, message: string): never => {
  throw new errors.ValidationError(message, {
    errors: [{ path: [path], message, name: 'ValidationError' }],
  });
};

const validatePricing = ({ price, discountType, discountPercent, salePrice }: PricingFields) => {
  if (discountType === 'percentage' && discountPercent == null) {
    fail('discountPercent', 'Discount percent is required for a percentage discount');
  }

  if (discountType !== 'salePrice') return;

  if (salePrice == null) {
    fail('salePrice', 'Sale price is required for a sale price discount');
  }
  if (Number(salePrice) >= Number(price)) {
    fail('salePrice', 'Sale price must be lower than the regular price');
  }
};

export const productPricingMiddleware =
  (strapi: Core.Strapi): Modules.Documents.Middleware.Middleware =>
  async (context, next) => {
    if (context.uid !== PRODUCT_UID || !WRITE_ACTIONS.has(context.action)) return next();

    const params = context.params as WriteParams;
    if (!params.data) return next();

    const existing =
      context.action === 'update' && params.documentId
        ? await strapi.documents(PRODUCT_UID).findOne({ documentId: params.documentId })
        : null;

    const pricing: PricingFields = { ...existing, ...params.data };
    validatePricing(pricing);

    if (pricing.discountType !== 'percentage') params.data.discountPercent = null;
    if (pricing.discountType !== 'salePrice') params.data.salePrice = null;

    return next();
  };
