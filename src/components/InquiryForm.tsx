import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { submitInquiry, type InquiryPayload } from "@/lib/inquiry";
import { waLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import { toast } from "@/components/ui/sonner";

interface InquiryFormProps {
  prefillTour?: string;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  dates: string;
  travellers: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL: FormData = {
  name: "",
  email: "",
  phone: "",
  dates: "",
  travellers: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s+()-]{7,}$/;

const validate = (values: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";

  const hasEmail = Boolean(values.email.trim());
  const hasPhone = Boolean(values.phone.trim());
  if (!hasEmail && !hasPhone) {
    errors.email = "Please provide an email address or telephone number.";
    errors.phone = "Please provide an email address or telephone number.";
  }
  if (hasEmail && !EMAIL_REGEX.test(values.email)) errors.email = "Please enter a valid email address.";
  if (hasPhone && !PHONE_REGEX.test(values.phone)) errors.phone = "Please enter a valid telephone number.";

  if (values.travellers && !/^\d+$/.test(values.travellers)) errors.travellers = "Please enter a whole number.";
  else if (values.travellers && (Number(values.travellers) < 1 || Number(values.travellers) > 99)) errors.travellers = "Number of travellers must be between 1 and 99.";

  if (!values.message.trim()) errors.message = "Please tell us about your trip.";
  else if (values.message.trim().length < 5) errors.message = "Please write a little more about your plans.";

  return errors;
};

export const InquiryForm = ({ prefillTour }: InquiryFormProps) => {
  const [values, setValues] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefillTour) {
      setValues((prev) => ({
        ...prev,
        message: prev.message || `I am interested in the "${prefillTour}" itinerary and would like to plan a trip to Sri Lanka.`,
      }));
    }
  }, [prefillTour]);

  const setField = useCallback((key: keyof FormData, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }, [errors]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitting(true);
    try {
      const payload: InquiryPayload = {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        dates: values.dates.trim(),
        travellers: values.travellers.trim(),
        destination: "Sri Lanka",
        tour: prefillTour ?? "",
        message: values.message.trim(),
      };
      const result = await submitInquiry(payload);
      if (result.ok) {
        setSubmitted(true);
        toast.success("Inquiry prepared", {
          description: "Your details are ready. Please use WhatsApp to send them to us.",
        });
      } else {
        toast.error("Submission failed", {
          description: result.error ?? "Could not send your inquiry. Please try WhatsApp instead.",
        });
      }
    } catch {
      toast.error("Submission failed", { description: "Could not send your inquiry. Please try WhatsApp instead." });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-background p-8 text-center">
        <h2 className="text-2xl font-display font-semibold mb-2">Thank you.</h2>
        <p className="text-muted-foreground mb-6">
          Your inquiry has been recorded and we will get back to you as soon as possible.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => setSubmitted(false)}>Send another inquiry</Button>
          <a
            href={waLink(`Hello ${siteConfig.name}! I just sent an inquiry through the website and would like to discuss planning a trip to Sri Lanka.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent transition-colors"
          >
            Message us on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">Full name</label>
          <input id="name" name="name" type="text" autoComplete="name" required value={values.name} onChange={(e) => setField("name", e.target.value)} className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.name ? "border-destructive" : ""}`} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name && <p id="name-error" className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={(e) => setField("email", e.target.value)} className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.email ? "border-destructive" : ""}`} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} placeholder="you@example.com" />
          {errors.email && <p id="email-error" className="text-xs text-destructive">{errors.email}</p>}
          <p className="text-xs text-muted-foreground">Optional if you provide a telephone number instead.</p>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-foreground">Telephone / WhatsApp</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(e) => setField("phone", e.target.value)} className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.phone ? "border-destructive" : ""}`} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} placeholder="+94 77 123 4567" />
        {errors.phone && <p id="phone-error" className="text-xs text-destructive">{errors.phone}</p>}
        <p className="text-xs text-muted-foreground">Optional if you provide an email address instead. WhatsApp users: use this number so we can reply on WhatsApp.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="dates" className="text-sm font-medium text-foreground">Travel dates (if known)</label>
          <input id="dates" name="dates" type="text" autoComplete="off" value={values.dates} onChange={(e) => setField("dates", e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="e.g. 15–22 January" />
        </div>

        <div className="space-y-2">
          <label htmlFor="travellers" className="text-sm font-medium text-foreground">Number of travellers</label>
          <input id="travellers" name="travellers" type="number" min="1" max="99" value={values.travellers} onChange={(e) => setField("travellers", e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          {errors.travellers && <p id="travellers-error" className="text-xs text-destructive">{errors.travellers}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">Your travel plans</label>
        <textarea id="message" name="message" rows={5} value={values.message} onChange={(e) => setField("message", e.target.value)} className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.message ? "border-destructive" : ""}`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} placeholder="Where would you like to go, and what would you like to see?" />
        {errors.message && <p id="message-error" className="text-xs text-destructive">{errors.message}</p>}
      </div>

      <p className="text-xs text-muted-foreground">We will reply by email or WhatsApp. No booking is made until you confirm the itinerary and price with us directly.</p>

      <Button type="submit" size="lg" disabled={submitting} className="w-full md:w-auto">{submitting ? "Sending…" : "Send Inquiry"}</Button>
    </form>
  );
};
