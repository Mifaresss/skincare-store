import type { Schema, Struct } from '@strapi/strapi';

export interface ProductVariantGroup extends Struct.ComponentSchema {
  collectionName: 'components_product_variant_groups';
  info: {
    description: 'Named set of options, e.g. Skin type or Size';
    displayName: 'Variant group';
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 40;
      }>;
    options: Schema.Attribute.Component<'product.variant-option', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

export interface ProductVariantOption extends Struct.ComponentSchema {
  collectionName: 'components_product_variant_options';
  info: {
    description: 'Selectable value of a variant group, e.g. Dry or 50 ml';
    displayName: 'Variant option';
  };
  attributes: {
    discountPercent: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 99;
          min: 1;
        },
        number
      >;
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 40;
      }>;
  };
}

export interface SharedAnnouncement extends Struct.ComponentSchema {
  collectionName: 'components_shared_announcements';
  info: {
    description: 'Single message shown in the rotating announcement bar';
    displayName: 'Announcement';
  };
  attributes: {
    text: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'product.variant-group': ProductVariantGroup;
      'product.variant-option': ProductVariantOption;
      'shared.announcement': SharedAnnouncement;
    }
  }
}
