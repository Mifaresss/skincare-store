import type { Core } from '@strapi/strapi';

const cloudinaryFolder = { folder: 'lumea' };

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      ...(env('CLOUDINARY_NAME') && {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: cloudinaryFolder,
          uploadStream: cloudinaryFolder,
        },
      }),
      security: {
        allowedTypes: ['image/*'],
        deniedTypes: ['image/svg+xml'],
      },
    },
  },
});

export default config;
