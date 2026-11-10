import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Mail, MessageCircle, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  hasInquiryEndpoint,
  inquiryMailtoLink,
  inquiryMessage,
  inquiryWhatsAppLink,
  submitInquiry,
  type InquiryPayload,
} from "@/lib/inquiry";
import { hasVerifiedContact } from "@/config/site";
import { toast } from "@/components/ui/sonner";
interface InquiryFormProps {
  prefillTour?: string;
}

type FormValues = {
  name: string;
  email: string;
  phone: string;
  dates: string;
  travellers: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL: FormValues = {
  name: "",
  email: "",
  phone: "",
  dates: "",
  travellers: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";

  const hasEmail = Boolean(values.email.trim());
  const hasPhone = Boolean(values.phone.trim());

  if (!hasEmail && !hasPhone) {
    errors.email = "Please provide an email address or telephone number.";
    errors.phone = "Please provide an email address or telephone number.";
  }
  if (hasEmail && !EMAIL_REGEX.test(values.email))
    errors.email = "Please enter a valid email address.";
  if (hasPhone) {
    const digits = values.phone.replace(/\D/g, "");
    if (!/^\+?[\d\s()-]+$/.test(values.phone) || digits.length < 7 || digits.length > 15)
      errors.phone = "Please enter a valid telephone number.";
  }

  if (values.travellers && !/^\d+$/.test(values.travellers)) {
    errors.travellers = "Please enter a whole number.";
  } else if (
    values.travellers &&
    (Number(values.travellers) < 1 || Number(values.travellers) > 99)
  ) {
    errors.travellers = "Number of travellers must be between 1 and 99.";
  }

  if (!values.message.trim())
    errors.message = "Please tell us about your trip.";
  else if (values.message.trim().length < 5)
    errors.message = "Please write a little more about your plans.";

  return errors;
};

const inputClass = (invalid?: boolean) =>
  [
    "flex h-11 w-full rounded-md border bg-white px-3 py-2 text-base text-brand-charcoal placeholder:text-muted-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    invalid ? "border-destructive" : "border-input",
  ].join(" ");

const tourTemplate = (tour: string) =>
  `I am interested in the "${tour}" itinerary and would like to plan a trip to Sri Lanka.`;

export const InquiryForm = ({ prefillTour }: InquiryFormProps) => {
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<InquiryPayload | null>(null);
  const [delivered, setDelivered] = useState(false);
  const [copied, setCopied] = useState(false);
  const appliedTemplate = useRef<string | null>(null);

  useEffect(() => {
    if (!prefillTour) return;
    const template = tourTemplate(prefillTour);
    const previous = appliedTemplate.current;
    if (previous === template) return;
    appliedTemplate.current = template;

    setValues((prev) => {
      const untouched = !prev.message.trim() || prev.message === previous;
      return untouched ? { ...prev, message: template } : prev;
    });
  }, [prefillTour]);

  const setField = useCallback(
    (key: keyof FormValues, value: string) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      setFormError(null);
      if (errors[key]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
    },
    [errors]
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setFormError(null);

    if (Object.keys(nextErrors).length > 0) {
      window.setTimeout(() => {
        document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      }, 0);
      return;
    }

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
      if (!result.ok) {
        setFormError(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(payload);
      setDelivered(result.delivered);
      if (result.delivered) {
        toast.success("Inquiry sent", {
          description: "Thank you — we will be in touch shortly.",
        });
      } else {
        toast.success("Your inquiry is ready", {
          description: "Choose WhatsApp, email or copy your details to send it.",
        });
      }
    } catch {
      setFormError(
        "Something went wrong while preparing your inquiry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const copyDetails = async (message: string) => {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const area = document.createElement("textarea");
      area.value = message;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopied(true);
    toast.success("Inquiry copied", {
      description: "Paste it into an email, WhatsApp or a message to us.",
    });
    window.setTimeout(() => setCopied(false), 2500);
  };

  if (submitted) {
    const message = inquiryMessage(submitted);
    const whatsApp = hasVerifiedContact ? inquiryWhatsAppLink(submitted) : null;
    const mailto = inquiryMailtoLink(submitted);

    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-brand-sand/60 bg-brand-ivory p-7 md:p-9"
      >
        {delivered ? (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-forest text-brand-ivory">
              <Check className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-display text-2xl text-brand-charcoal">
              Thank you — your inquiry is on its way.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We have received your details and will reply
              {submitted.email ? ` to ${submitted.email}` : " to your phone number"}{" "}
              as soon as possible.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-6"
              onClick={() => setSubmitted(null)}
            >
              Send another inquiry
            </Button>
          </>
        ) : (
          <>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand-sage">
              One more step
            </p>
            <h2 className="mt-3 font-display text-2xl text-brand-charcoal md:text-3xl">
              Your details are ready to send.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {hasInquiryEndpoint
                ? "We could not confirm delivery just now. Please send your inquiry using one of the options below."
                : "This site is not connected to an inbox yet, so we have prepared your inquiry for you. Send it in one tap using the option that suits you."}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {whatsApp && (
                <a
                  href={whatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-forest px-5 py-3 text-sm font-medium text-brand-ivory transition-colors hover:bg-brand-deep"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Continue on WhatsApp
                </a>
              )}
              {mailto && (
                <a
                  href={mailto}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-forest/30 bg-white px-5 py-3 text-sm font-medium text-brand-forest transition-colors hover:bg-brand-mist"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Send by email
                </a>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => copyDetails(message)}
                className="gap-2"
              >
                {copied ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                {copied ? "Copied" : "Copy details"}
              </Button>
            </div>

            {!whatsApp && !mailto && (
              <p className="mt-4 rounded-md border border-brand-sand/60 bg-white/60 px-4 py-3 text-xs leading-relaxed text-brand-charcoal/70">
                Phone and email details are still being finalised. Your details
                are copied and ready — please keep them safe and send them once
                our contact options are published.
              </p>
            )}

            <button
              type="button"
              onClick={() => setSubmitted(null)}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-forest underline-offset-4 hover:underline"
            >
              <Pencil className="h-4 w-4" aria-hidden="true" />
              Edit my details
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formError && (
        <div
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {formError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Full name <span className="text-brand-rose">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            className={inputClass(Boolean(errors.name))}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Your name"
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            className={inputClass(Boolean(errors.email))}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : "email-hint"}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p id="email-error" className="text-xs text-destructive">
              {errors.email}
            </p>
          ) : (
            <p id="email-hint" className="text-xs text-muted-foreground">
              Or give a telephone number below.
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-foreground">
          Telephone / WhatsApp
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          onChange={(e) => setField("phone", e.target.value)}
          className={inputClass(Boolean(errors.phone))}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
          placeholder="+94 77 123 4567"
        />
        {errors.phone ? (
          <p id="phone-error" className="text-xs text-destructive">
            {errors.phone}
          </p>
        ) : (
          <p id="phone-hint" className="text-xs text-muted-foreground">
            Optional if you gave an email address. Include your country code.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="dates" className="text-sm font-medium text-foreground">
            Travel dates (if known)
          </label>
          <input
            id="dates"
            name="dates"
            type="text"
            autoComplete="off"
            value={values.dates}
            onChange={(e) => setField("dates", e.target.value)}
            className={inputClass()}
            placeholder="e.g. 15–22 January"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="travellers"
            className="text-sm font-medium text-foreground"
          >
            Number of travellers
          </label>
          <input
            id="travellers"
            name="travellers"
            type="number"
            min="1"
            max="99"
            inputMode="numeric"
            value={values.travellers}
            onChange={(e) => setField("travellers", e.target.value)}
            className={inputClass(Boolean(errors.travellers))}
            aria-invalid={Boolean(errors.travellers)}
            aria-describedby={errors.travellers ? "travellers-error" : undefined}
          />
          {errors.travellers && (
            <p id="travellers-error" className="text-xs text-destructive">
              {errors.travellers}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Your travel plans <span className="text-brand-rose">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={2000}
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
          className={`${inputClass(
            Boolean(errors.message)
          )} h-auto resize-y leading-relaxed`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Where would you like to go, and what would you like to see?"
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        We reply by email or WhatsApp, usually within one working day. No
        booking is made until you confirm the itinerary and price with us
        directly.
      </p>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="w-full bg-brand-forest text-brand-ivory hover:bg-brand-deep md:w-auto"
      >
        {submitting ? "Sending…" : "Send inquiry"}
      </Button>
    </form>
  );
};

export default InquiryForm;
