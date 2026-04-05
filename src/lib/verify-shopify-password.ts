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
      // POST to Shopify's password page with form data
      const formBody = new URLSearchParams();
      formBody.append('password', data.password);

      const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
        redirect: 'manual', // Don't follow redirects — a 302 means success
      });

      // Shopify redirects (302) to the storefront on correct password
      // Returns 200 (re-renders password page) on wrong password
      const isCorrect = response.status === 302;

      return { success: isCorrect };
    } catch (error) {
      console.error('Shopify password verification error:', error);
      return { success: false };
    }
  });
