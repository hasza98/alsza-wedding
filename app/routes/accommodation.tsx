import { useState } from "react";

type PaymentMethod = "bank" | "revolut" | "nature";

const paymentOptions: Array<{ label: string; value: PaymentMethod }> = [
  { label: "Bank", value: "bank" },
  { label: "Revolut", value: "revolut" },
  { label: "Nature", value: "nature" },
];

const paymentDetails: Record<
  PaymentMethod,
  Array<{ label: string; value: string }>
> = {
  bank: [
    { label: "Account holder", value: "Name Surname" },
    { label: "Bank account / IBAN", value: "HU00 0000 0000 0000 0000 0000 0000" },
    { label: "Note", value: "Accommodation - your name" },
  ],
  revolut: [
    { label: "Revolut name", value: "@username" },
    { label: "Recipient", value: "Name Surname" },
    { label: "Note", value: "Accommodation - your name" },
  ],
  nature: [
    { label: "Option", value: "Bring something useful for the weekend" },
    { label: "Please coordinate with", value: "Name Surname" },
    { label: "Note", value: "Let us know before the wedding" },
  ],
};

export default function Accommodation() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank");

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="font-sans text-sm uppercase tracking-[0.35em] text-wedding-labelWarm">
          Accommodation
        </p>
        <h1 className="mt-4 font-display text-4xl text-wedding-ink sm:text-5xl">
          Where To Sleep
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-7 text-wedding-muted">
          We will collect accommodation needs through the RSVP form and share
          the exact details once everything is organized.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-wedding-borderSoft bg-wedding-surface p-6 shadow-wedding-card">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-wedding-border bg-wedding-surfaceWarm text-wedding-muted">
              <i className="fa-solid fa-bed" aria-hidden="true"></i>
            </span>
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-wedding-labelWarm">
                The place
              </p>
              <h2 className="mt-2 font-display text-2xl text-wedding-ink">
                Sleeping close to the party
              </h2>
              <p className="mt-3 font-sans text-sm leading-7 text-wedding-bodySoft">
                We are organizing nearby accommodation for guests who would like
                to stay after the celebration. Please mark your accommodation
                preference in the RSVP form so we can plan the rooms properly.
              </p>
              <p className="mt-3 font-sans text-sm leading-7 text-wedding-bodySoft">
                Once the final headcount is clear, we will confirm the exact
                room assignments and any practical arrival details.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-wedding-borderSoft bg-wedding-surface p-6 shadow-wedding-card">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-wedding-border bg-wedding-surfaceWarm text-wedding-muted">
              <i className="fa-solid fa-money-bill-transfer" aria-hidden="true"></i>
            </span>
            <div className="min-w-0">
              <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-wedding-labelWarm">
                Payment
              </p>
              <h2 className="mt-2 font-display text-2xl text-wedding-ink">
                Accommodation fee
              </h2>
              <p className="mt-3 font-sans text-sm leading-7 text-wedding-bodySoft">
                If you are staying overnight, please send the accommodation fee
                using the details below.
              </p>

              <div className="mt-5 grid gap-2 rounded-2xl border border-wedding-border bg-wedding-surfaceWarm p-1 sm:grid-cols-3">
                {paymentOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPaymentMethod(option.value)}
                    className={`rounded-xl px-3 py-2 font-sans text-xs font-medium uppercase tracking-[0.16em] transition ${
                      paymentMethod === option.value
                        ? "bg-wedding-surface text-wedding-ink shadow-wedding-radio"
                        : "text-wedding-muted hover:bg-wedding-panelHover hover:text-wedding-ink"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <dl className="mt-5 space-y-3 font-sans text-sm">
                {paymentDetails[paymentMethod].map((detail) => (
                  <div
                    key={detail.label}
                    className="rounded-2xl border border-wedding-border bg-wedding-surfaceWarm px-4 py-3"
                  >
                    <dt className="text-xs font-medium uppercase tracking-[0.18em] text-wedding-muted">
                      {detail.label}
                    </dt>
                    <dd className="mt-1 break-words text-wedding-ink">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
