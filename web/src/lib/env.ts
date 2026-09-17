import { z } from 'zod';

export const env = z
  .object({
    SITE_URL: z.url().default('http://localhost:3000'),
    STRAPI_URL: z.url(),
    REVALIDATE_SECRET: z.string().min(1),
  })
  .parse(process.env);
