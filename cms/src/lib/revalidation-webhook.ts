import type { Core } from '@strapi/strapi';

const WEBHOOK_NAME = 'Revalidate web';
const events = ['entry.create', 'entry.update', 'entry.delete', 'entry.publish', 'entry.unpublish'];

export const syncRevalidationWebhook = async (strapi: Core.Strapi) => {
  const url = process.env.WEB_REVALIDATE_URL;
  const secret = process.env.WEB_REVALIDATE_SECRET;

  if (!url || !secret) {
    strapi.log.warn(
      'WEB_REVALIDATE_URL or WEB_REVALIDATE_SECRET is not set, web revalidation is off',
    );
    return;
  }

  const store = strapi.get('webhookStore');
  const runner = strapi.get('webhookRunner');
  const data = {
    name: WEBHOOK_NAME,
    url,
    headers: { Authorization: `Bearer ${secret}` },
    events,
    isEnabled: true,
  };

  const existing = (await store.findWebhooks()).find(
    (webhook: { name: string }) => webhook.name === WEBHOOK_NAME,
  );

  if (existing) {
    runner.update(await store.updateWebhook(existing.id, data));
  } else {
    runner.add(await store.createWebhook(data));
  }
};
