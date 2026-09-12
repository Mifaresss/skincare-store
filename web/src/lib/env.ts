import { z } from 'zod';

export const env = z
  .object({
    STRAPI_URL: z.url(),
    REVALIDATE_SECRET: z.string().min(1),
  })
  .parse(process.env);
