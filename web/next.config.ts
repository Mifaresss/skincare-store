import path from 'node:path';
import type { NextConfig } from 'next';
import { env } from './src/lib/env';

const strapiUrl = new URL(env.STRAPI_URL);

const nextConfig: NextConfig = {
  cacheComponents: true,
  sassOptions: {
    loadPaths: [path.resolve('src/styles')],
  },
  images: {
    remotePatterns: [new URL('/uploads/**', strapiUrl)],
    dangerouslyAllowLocalIP: ['localhost', '127.0.0.1'].includes(strapiUrl.hostname),
  },
};

export default nextConfig;
