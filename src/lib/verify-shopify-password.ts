import { createServerFn } from '@tanstack/react-start';

const SHOPIFY_STORE_DOMAIN = 'icarus9.myshopify.com';

export const verifyShopifyPassword = createServerFn({ method: 'POST' })
  .inputValidator((input: { password: string }) => {
    if (!input.password || typeof input.password !== 'string' || input.password.length > 200) {
      throw new Error('Invalid password input');
    }
    return input;
  })
  .handler(async ({ data }) => {
    try {
      const formBody = new URLSearchParams();
      formBody.append('password', data.password);

      const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
        redirect: 'manual',
      });

      // Shopify returns 302 for both correct and wrong passwords.
      // Correct password → redirects to store root (e.g. "/" or the store domain)
      // Wrong password → redirects back to "/password"
      const location = response.headers.get('location') || '';
      const isCorrect = response.status === 302 && !location.includes('/password');

      return { success: isCorrect };
    } catch (error) {
      console.error('Shopify password verification error:', error);
      return { success: false };
    }
  });
