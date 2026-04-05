import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <PolicyPage title="Contact Information">
      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold" style={{ fontFamily: "'Courier New', monospace" }}>
        Contact Information:
      </h2>
      <p>
        Please contact help@sunslayerhills.com for all order inquiries and concerns.
      </p>
      <p>
        All emails are responded to within 24 - 48 hours.
      </p>
    </PolicyPage>
  );
}