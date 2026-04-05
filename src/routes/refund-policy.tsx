import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";

export const Route = createFileRoute("/refund-policy")({
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  return (
    <PolicyPage title="Refund Policy">
      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold" style={{ fontFamily: "'Courier New', monospace" }}>
        Return and Refund Policy:
      </h2>
      <p>
        No Returns or Exchanges - All Sales are Final.
      </p>
      <p>
        We allow 30-day returns if your order is damaged or irregular please contact help@sunslayerhills.com and we will replace it for you. You must contact us within 30 business days of receiving your order.
      </p>
    </PolicyPage>
  );
}