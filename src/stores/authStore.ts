import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { loginCustomer, createCustomer, fetchCustomer, type ShopifyCustomer } from "@/lib/shopify-customer";

interface AuthStore {
  accessToken: string | null;
  customer: ShopifyCustomer | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string, acceptsMarketing?: boolean) => Promise<void>;
  logout: () => void;
  refreshCustomer: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      accessToken: null,
      customer: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const token = await loginCustomer(email, password);
          const customer = await fetchCustomer(token.accessToken);
          set({ accessToken: token.accessToken, customer, isLoading: false });
        } catch (err) {
          set({ isLoading: false, error: err instanceof Error ? err.message : "Login failed" });
          throw err;
        }
      },

      signup: async (email, password, firstName, lastName, acceptsMarketing = true) => {
        set({ isLoading: true, error: null });
        try {
          await createCustomer(email, password, firstName, lastName, acceptsMarketing);
          const token = await loginCustomer(email, password);
          const customer = await fetchCustomer(token.accessToken);
          set({ accessToken: token.accessToken, customer, isLoading: false });
        } catch (err) {
          set({ isLoading: false, error: err instanceof Error ? err.message : "Signup failed" });
          throw err;
        }
      },

      logout: () => set({ accessToken: null, customer: null, error: null }),

      refreshCustomer: async () => {
        const { accessToken } = get();
        if (!accessToken) return;
        try {
          const customer = await fetchCustomer(accessToken);
          if (!customer) {
            set({ accessToken: null, customer: null });
          } else {
            set({ customer });
          }
        } catch {
          set({ accessToken: null, customer: null });
        }
      },
    }),
    {
      name: "shopify-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ accessToken: state.accessToken, customer: state.customer }),
    }
  )
);
