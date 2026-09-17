import type { Core } from '@strapi/strapi';

export async function ensureAdminAccount(strapi: Core.Strapi) {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  const users = strapi.service('admin::user');
  if (await users.exists()) return;

  await users.createFirstAdmin({ email, password, firstname: 'LUMEA', lastname: 'Reviewer' });
  strapi.log.info(`Created admin account ${email}`);
}
