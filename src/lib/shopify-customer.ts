import { storefrontApiRequest } from "./shopify";

const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id firstName lastName email acceptsMarketing }
      customerUserErrors { code field message }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { code field message }
    }
  }
`;

const CUSTOMER_QUERY = `
  query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      orders(first: 50, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            name
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 20) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    image {
                      url
                      altText
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
            successfulFulfillments(first: 10) {
              trackingCompany
              trackingInfo {
                number
                url
              }
            }
          }
        }
      }
    }
  }
`;

export interface ShopifyCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  orders: {
    edges: Array<{
      node: ShopifyOrder;
    }>;
  };
}

export interface ShopifyOrder {
  id: string;
  name: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
        variant: {
          image: { url: string; altText: string | null } | null;
          price: { amount: string; currencyCode: string };
        } | null;
      };
    }>;
  };
  successfulFulfillments: Array<{
    trackingCompany: string | null;
    trackingInfo: Array<{
      number: string | null;
      url: string | null;
    }>;
  }>;
}

export async function createCustomer(email: string, password: string, firstName: string, lastName: string) {
  const data = await storefrontApiRequest(CUSTOMER_CREATE_MUTATION, {
    input: { email, password, firstName, lastName },
  });
  const errors = data?.data?.customerCreate?.customerUserErrors || [];
  if (errors.length > 0) {
    throw new Error(errors.map((e: { message: string }) => e.message).join(", "));
  }
  return data?.data?.customerCreate?.customer;
}

export async function loginCustomer(email: string, password: string): Promise<{ accessToken: string; expiresAt: string }> {
  const data = await storefrontApiRequest(CUSTOMER_ACCESS_TOKEN_CREATE, {
    input: { email, password },
  });
  const errors = data?.data?.customerAccessTokenCreate?.customerUserErrors || [];
  if (errors.length > 0) {
    throw new Error(errors.map((e: { message: string }) => e.message).join(", "));
  }
  const token = data?.data?.customerAccessTokenCreate?.customerAccessToken;
  if (!token) throw new Error("Failed to create access token");
  return token;
}

export async function fetchCustomer(accessToken: string): Promise<ShopifyCustomer | null> {
  const data = await storefrontApiRequest(CUSTOMER_QUERY, { customerAccessToken: accessToken });
  return data?.data?.customer || null;
}

export function getOrderDisplayStatus(order: ShopifyOrder): { label: string; color: string } {
  const fulfillment = order.fulfillmentStatus;
  const hasTracking = order.successfulFulfillments?.some(
    (f) => f.trackingInfo?.some((t) => t.number)
  );

  if (fulfillment === "FULFILLED") {
    return { label: "Complete", color: "text-green-600 bg-green-100" };
  }
  if (hasTracking) {
    return { label: "In Transit", color: "text-blue-600 bg-blue-100" };
  }
  return { label: "In Progress", color: "text-amber-600 bg-amber-100" };
}
