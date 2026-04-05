import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";

export const Route = createFileRoute("/refund-policy")({
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  return (
    <PolicyPage title="Refund Policy">
      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold" style={{ fontFamily: "'Courier New', monospace" }}>
        Refund Policy:
      </h2>
      <p>
        We have a 14-day return policy, which means you have 14 days after receiving your item to request a return. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        How to Start a Return:
      </h2>
      <p>
        To start a return, you can contact us at help@sunslayerhills.com. If your return is accepted, we'll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        Damages and Issues:
      </h2>
      <p>
        Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        Refunds:
      </h2>
      <p>
        We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
      </p>
    </PolicyPage>
  );
}
