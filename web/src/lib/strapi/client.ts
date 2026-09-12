import 'server-only';
import qs from 'qs';
import type { z } from 'zod';
import { env } from '@/lib/env';

export const STRAPI_CACHE_TAG = 'strapi';

export const toStrapiAssetUrl = (url: string) => new URL(url, env.STRAPI_URL).toString();

export async function strapiFetch<Schema extends z.ZodType>(
  path: string,
  query: object,
  schema: Schema,
): Promise<z.output<Schema>> {
  const search = qs.stringify(query, { encodeValuesOnly: true });
  const response = await fetch(`${env.STRAPI_URL}/api${path}?${search}`);

  if (!response.ok && response.status !== 404) {
    throw new Error(`Strapi request to ${path} failed with status ${response.status}`);
  }

  return schema.parse(await response.json());
}
