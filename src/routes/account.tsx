import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";
import { useState, useEffect } from "react";
import { getOrderDisplayStatus, type ShopifyOrder } from "@/lib/shopify-customer";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, LogOut, Package, Loader2 } from "lucide-react";

const DEMO_ORDERS: ShopifyOrder[] = [
  {
    id: "demo-1",
    name: "#1042",
    orderNumber: 1042,
    processedAt: "2026-03-28T14:30:00Z",
    financialStatus: "PAID",
    fulfillmentStatus: "FULFILLED",
    totalPrice: { amount: "89.00", currencyCode: "USD" },
    lineItems: { edges: [
      { node: { title: "2 Face T-ech Tee", quantity: 1, variant: { image: { url: "https://cdn.shopify.com/s/files/1/0603/3693/0954/files/3ED9EDC9-ABA1-4ECB-A80E-7CD624F5AE6A.png?v=1768315725", altText: "2 Face T-ech Tee" }, price: { amount: "45.00", currencyCode: "USD" } } } },
      { node: { title: "GREENWAVE HOODIE", quantity: 1, variant: { image: { url: "https://cdn.shopify.com/s/files/1/0603/3693/0954/files/4A0432AB-7A8A-438E-A8EE-F32B72F1C4CC.png?v=1769081483", altText: "GREENWAVE HOODIE" }, price: { amount: "44.00", currencyCode: "USD" } } } },
    ] },
    successfulFulfillments: [{ trackingCompany: "USPS", trackingInfo: [{ number: "9400111899223456789012", url: "https://tools.usps.com/go/TrackConfirmAction?tLabels=9400111899223456789012" }] }],
  },
  {
    id: "demo-2",
    name: "#1038",
    orderNumber: 1038,
    processedAt: "2026-03-20T09:15:00Z",
    financialStatus: "PAID",
    fulfillmentStatus: "FULFILLED",
    totalPrice: { amount: "55.00", currencyCode: "USD" },
    lineItems: { edges: [
      { node: { title: "BORN SLAYER LONGSLEEVE TEE", quantity: 1, variant: { image: { url: "https://cdn.shopify.com/s/files/1/0603/3693/0954/files/9C504F32-68AC-4FD1-979E-58D57423E82F.png?v=1769371499", altText: "BORN SLAYER LONGSLEEVE TEE" }, price: { amount: "55.00", currencyCode: "USD" } } } },
    ] },
    successfulFulfillments: [{ trackingCompany: "UPS", trackingInfo: [{ number: "1Z999AA10123456784", url: "https://www.ups.com/track?tracknum=1Z999AA10123456784" }] }],
  },
  {
    id: "demo-3",
    name: "#1045",
    orderNumber: 1045,
    processedAt: "2026-04-03T11:00:00Z",
    financialStatus: "PAID",
    fulfillmentStatus: "UNFULFILLED",
    totalPrice: { amount: "35.00", currencyCode: "USD" },
    lineItems: { edges: [
      { node: { title: "FACE OF EARTH TEE", quantity: 1, variant: { image: { url: "https://cdn.shopify.com/s/files/1/0603/3693/0954/files/75E23C61-994C-4862-8ACA-E64BD0F496EF.jpg?v=1768576017", altText: "FACE OF EARTH TEE" }, price: { amount: "35.00", currencyCode: "USD" } } } },
    ] },
    successfulFulfillments: [],
  },
  {
    id: "demo-4",
    name: "#1047",
    orderNumber: 1047,
    processedAt: "2026-04-04T16:45:00Z",
    financialStatus: "PAID",
    fulfillmentStatus: "UNFULFILLED",
    totalPrice: { amount: "70.00", currencyCode: "USD" },
    lineItems: { edges: [
      { node: { title: "CYFER HILLS Tee", quantity: 2, variant: { image: { url: "https://cdn.shopify.com/s/files/1/0603/3693/0954/files/D3889509-4E62-42EB-9893-27633009468A.jpg?v=1768576017", altText: "CYFER HILLS Tee" }, price: { amount: "35.00", currencyCode: "USD" } } } },
    ] },
    successfulFulfillments: [{ trackingCompany: "FedEx", trackingInfo: [{ number: "794644790132", url: "https://www.fedex.com/fedextrack/?trknbr=794644790132" }] }],
  },
];

export const Route = createFileRoute("/account")({
  component: AccountPage,
  validateSearch: (search: Record<string, unknown>): { demo?: boolean } => ({
    ...(search.demo === "true" ? { demo: true } : {}),
  }),
});

function AccountPage() {
  const { customer, accessToken, isLoading, error, login, signup, logout, refreshCustomer } = useAuthStore();
  const { demo } = Route.useSearch();

  useEffect(() => {
    if (accessToken) refreshCustomer();
  }, [accessToken, refreshCustomer]);

  if (demo) {
    return (
      <AccountDashboard
        customer={{ firstName: "Jordan", lastName: "Smith", email: "jordan.smith@email.com" }}
        orders={DEMO_ORDERS}
        onLogout={() => {}}
      />
    );
  }

  if (!accessToken || !customer) {
    return <LoginSignupForm isLoading={isLoading} error={error} onLogin={login} onSignup={signup} />;
  }

  return <AccountDashboard customer={customer} orders={customer.orders.edges.map(e => e.node)} onLogout={logout} />;
}

function LoginSignupForm({
  isLoading,
  error,
  onLogin,
  onSignup,
}: {
  isLoading: boolean;
  error: string | null;
  onLogin: (email: string, password: string) => Promise<void>;
  onSignup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
}) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    try {
      if (mode === "login") {
        await onLogin(email, password);
      } else {
        await onSignup(email, password, firstName, lastName);
      }
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-5 py-4">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-foreground hover:opacity-60 transition-opacity">
          <ArrowLeft className="w-3 h-3" />
          Back to shop
        </Link>
      </div>
      <div className="flex items-center justify-center px-5 pt-12 pb-20">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-normal text-center mb-2" style={{ fontFamily: "'Pinyon Script', cursive" }}>
            Sunslayer Hills
          </h1>
          <p className="text-center text-[11px] uppercase tracking-widest text-muted-foreground mb-10">
            {mode === "login" ? "Sign in to your account" : "Create your account"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={5}
              className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />

            {(localError || error) && (
              <p className="text-sm text-red-500">{localError || error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-foreground text-background py-3 text-[11px] uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-3 h-3 animate-spin" />}
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setLocalError(null); }}
              className="underline text-foreground hover:opacity-60 transition-opacity"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function AccountDashboard({
  customer,
  orders,
  onLogout,
}: {
  customer: { firstName: string; lastName: string; email: string };
  orders: ShopifyOrder[];
  onLogout: () => void;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-5 py-4 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-foreground hover:opacity-60 transition-opacity">
          <ArrowLeft className="w-3 h-3" />
          Back to shop
        </Link>
        <button
          onClick={onLogout}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-foreground hover:opacity-60 transition-opacity"
        >
          <LogOut className="w-3 h-3" />
          Sign out
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-5 pt-8 pb-20">
        <h1 className="text-3xl font-normal mb-1" style={{ fontFamily: "'Pinyon Script', cursive" }}>
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          {customer.firstName} {customer.lastName} · {customer.email}
        </p>

        <h2 className="text-[11px] uppercase tracking-widest text-foreground mb-6">Your Orders</h2>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = getOrderDisplayStatus(order);
              const tracking = order.successfulFulfillments?.[0]?.trackingInfo?.[0];
              return (
                <div key={order.id} className="border border-border p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{order.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.processedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium ${status.color}`}>
                      {status.label}
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    {order.lineItems.edges.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        {item.node.variant?.image && (
                          <img
                            src={item.node.variant.image.url}
                            alt={item.node.variant.image.altText || item.node.title}
                            className="w-16 h-16 object-cover rounded border border-border"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate">{item.node.title}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.node.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <p className="text-sm font-medium">
                      {order.totalPrice.currencyCode} {parseFloat(order.totalPrice.amount).toFixed(2)}
                    </p>
                    {tracking?.number && (
                      <div className="text-xs text-muted-foreground">
                        Tracking:{" "}
                        {tracking.url ? (
                          <a href={tracking.url} target="_blank" rel="noopener noreferrer" className="underline text-foreground hover:opacity-60">
                            {tracking.number}
                          </a>
                        ) : (
                          tracking.number
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
