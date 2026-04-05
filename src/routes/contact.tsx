import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <PolicyPage title="Contact">
      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold" style={{ fontFamily: "'Courier New', monospace" }}>
        Contact Information:
      </h2>
      <p>
        We'd love to hear from you. Whether you have a question about our products, sizing, orders, or anything else, our team is ready to assist you.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        Email:
      </h2>
      <p>
        help@sunslayerhills.com
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        Response Time:
      </h2>
      <p>
        We typically respond to all inquiries within 24-48 business hours. Please check your spam folder if you haven't received a response.
      </p>

      <h2 className="text-lg uppercase tracking-widest text-foreground font-bold pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
        Social Media:
      </h2>
      <p>
        Follow us on Instagram for the latest drops, behind-the-scenes content, and community updates.
      </p>
    </PolicyPage>
  );
}
