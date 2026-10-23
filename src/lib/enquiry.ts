import { site } from "@/lib/site";

/**
 * Builds the WhatsApp message for an enquiry or quote request. Only filled
 * fields appear in the message, so there are no blank lines or placeholders.
 * Every enquiry channel on the site uses this helper.
 */
export function enquiryLinks(
  subject: string,
  values: Record<string, string>
) {
  const lines: string[] = [];

  lines.push(`Hello ${site.name},`);
  lines.push("");
  lines.push(`${subject}.`);
  lines.push("");

  const contact: string[] = [];
  if (values.name) contact.push(`Name: ${values.name.trim()}`);
  if (values.company) contact.push(`Business: ${values.company.trim()}`);
  if (values.email) contact.push(`Email: ${values.email.trim()}`);
  if (values.phone) contact.push(`Phone: ${values.phone.trim()}`);
  if (values.city) contact.push(`City: ${values.city.trim()}`);

  if (contact.length) {
    lines.push("Contact");
    lines.push(...contact);
    lines.push("");
  }

  const details: string[] = [];
  if (values.products) details.push(`Pieces: ${values.products.trim()}`);
  if (values.volume) details.push(`Quantity: ${values.volume.trim()}`);
  if (values.frequency) details.push(`Frequency: ${values.frequency.trim()}`);

  if (details.length) {
    lines.push("Requirements");
    lines.push(...details);
    lines.push("");
  }

  const msg = (values.message || values.notes || "").trim();
  if (msg) {
    lines.push("Message");
    lines.push(msg);
  }

  const body = lines.join("\n").trim();

  return {
    whatsapp: `${site.whatsappHref}?text=${encodeURIComponent(body)}`,
  };
}
