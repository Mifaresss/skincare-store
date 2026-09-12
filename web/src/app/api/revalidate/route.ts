import { revalidateTag } from 'next/cache';
import { env } from '@/lib/env';
import { STRAPI_CACHE_TAG } from '@/lib/strapi/client';

export async function POST(request: Request) {
  if (request.headers.get('authorization') !== `Bearer ${env.REVALIDATE_SECRET}`) {
    return Response.json({ revalidated: false }, { status: 401 });
  }

  revalidateTag(STRAPI_CACHE_TAG, { expire: 0 });
  return Response.json({ revalidated: true });
}
