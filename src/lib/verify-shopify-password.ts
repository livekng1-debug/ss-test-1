import { createServerFn } from '@tanstack/react-start';

const STORE_PASSWORD = 'ssglobal';

export const verifyShopifyPassword = createServerFn({ method: 'POST' })
  .inputValidator((input: { password: string }) => {
    if (!input.password || typeof input.password !== 'string' || input.password.length > 200) {
      throw new Error('Invalid password input');
    }
    return input;
  })
  .handler(async ({ data }) => {
    return { success: data.password.trim() === STORE_PASSWORD };
  });
