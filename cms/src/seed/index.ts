import { stat } from 'node:fs/promises';
import path from 'node:path';
import type { Core } from '@strapi/strapi';
import { announcements, badges, categories, products, type SeedImage } from './data';

const createImageUploader = (strapi: Core.Strapi) => {
  const uploadsDir = path.join(strapi.dirs.app.root, 'data', 'uploads');
  const uploadedIds = new Map<string, number>();

  return async ({ file, alt }: SeedImage) => {
    const cachedId = uploadedIds.get(file);
    if (cachedId) return cachedId;

    const filepath = path.join(uploadsDir, file);
    const { size } = await stat(filepath);
    const [uploaded] = await strapi
      .plugin('upload')
      .service('upload')
      .upload({
        data: { fileInfo: { name: file, alternativeText: alt } },
        files: { filepath, originalFilename: file, mimetype: 'image/jpeg', size },
      });

    uploadedIds.set(file, uploaded.id);
    return uploaded.id as number;
  };
};

const publicReadActions = [
  'api::announcement-bar.announcement-bar.find',
  'api::badge.badge.find',
  'api::category.category.find',
  'api::product.product.find',
];

const grantPublicReadAccess = async (strapi: Core.Strapi) => {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  for (const action of publicReadActions) {
    await strapi.db
      .query('plugin::users-permissions.permission')
      .create({ data: { action, role: publicRole.id } });
  }
};

const seedContent = async (strapi: Core.Strapi) => {
  const uploadImage = createImageUploader(strapi);

  await grantPublicReadAccess(strapi);

  await strapi.documents('api::announcement-bar.announcement-bar').create({
    data: { messages: announcements.map((text) => ({ text })) },
    status: 'published',
  });

  const badgeIds: Record<string, string> = {};
  for (const label of badges) {
    const { documentId } = await strapi.documents('api::badge.badge').create({ data: { label } });
    badgeIds[label] = documentId;
  }

  const categoryIds: Record<string, string> = {};
  for (const [sortOrder, name] of categories.entries()) {
    const { documentId } = await strapi
      .documents('api::category.category')
      .create({ data: { name, sortOrder } });
    categoryIds[name] = documentId;
  }

  for (const product of products) {
    const variantGroups = [];

    for (const { name, options } of product.variantGroups) {
      const groupOptions = [];
      for (const { image, ...option } of options) {
        groupOptions.push({ ...option, image: image ? await uploadImage(image) : null });
      }
      variantGroups.push({ name, options: groupOptions });
    }

    await strapi.documents('api::product.product').create({
      data: {
        ...product,
        image: await uploadImage(product.image),
        badges: product.badges.map((label) => badgeIds[label]),
        categories: product.categories.map((name) => categoryIds[name]),
        variantGroups,
      },
      status: 'published',
    });
  }
};

export const seed = async (strapi: Core.Strapi) => {
  const store = strapi.store({ type: 'core', name: 'seed' });
  if (await store.get({ key: 'completed' })) return;

  strapi.log.info('Seeding initial content');
  await strapi.db.transaction(() => seedContent(strapi));
  await store.set({ key: 'completed', value: true });
  strapi.log.info('Initial content seeded');
};
