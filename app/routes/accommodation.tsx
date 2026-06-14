import { useState } from "react";

type PaymentMethod = "bank" | "revolut" | "nature";

const paymentOptions: Array<{ label: string; value: PaymentMethod }> = [
  { label: "Utalás", value: "bank" },
  { label: "Revolut", value: "revolut" },
  { label: "Természet", value: "nature" },
];

const paymentDetails: Record<
  Exclude<PaymentMethod, "nature">,
  Array<{ label: string; value: string }>
> = {
  bank: [
    { label: "Kedvezményezett", value: "Hadarics Szabolcs" },
    { label: "Számlaszám", value: "12010374 01971738 00100001" },
    { label: "Közlemény", value: "Esküvői szállás - Név" },
  ],
  revolut: [
    { label: "Revolut tag", value: "@szabolcs.hadarics" },
    { label: "Megjegyzés", value: "Esküvői szállás - Név" },
  ],
};

export default function Accommodation() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank");
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  async function copyPaymentValue(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      window.setTimeout(() => {
        setCopiedValue((current) => (current === value ? null : current));
      }, 2000);
    } catch {
      setCopiedValue(null);
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mt-4 font-display text-4xl text-wedding-ink sm:text-5xl">
          Szállás
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-7 text-wedding-muted">
          Itt mindent megtaláltok az ágyikóitokkal kapcsolatban. A szállás igényeiteket a visszajelzési űrlapon adhatjátok le.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-wedding-borderSoft bg-wedding-surface p-6 shadow-wedding-card">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-wedding-border bg-wedding-surfaceWarm text-wedding-muted">
              <i className="fa-solid fa-bed" aria-hidden="true"></i>
            </span>
            <div>
              <h2 className="mt-2 font-display text-2xl text-wedding-ink">
                Szálláslehetőségek
              </h2>
              <p className="mt-3 font-sans text-sm leading-7 text-wedding-bodySoft">
                Az éjszakai elhelyezés szerencsésebbeknek a <a href="/helyszin">helyszínen</a>, még szerencsésebbeknek pedig a falu Mama-Hoteljeiben lesz. 
                Nem kell aggódni pár perc séta alatt a saját ágyatoknál találjátok magatokat mindkét esetben. 
              </p>
              <p className="mt-3 font-sans text-sm leading-7 text-wedding-bodySoft">
                A szállások átvétele <b>13:00-tól</b> lehetséges a helyszínen, innen írányítunk titeket tovább a rezidenciátokba, és miután elkészült a hajatok és a sminketek, várunk vissza a finom falatokra és jéghideg italokra. 
              </p>
              <p className="mt-3 font-sans text-sm leading-7 text-wedding-bodySoft">
                Másnap a szállásokat <b>XX:XX-ig</b> kell elhagynunk, de mindenképpen nézzetek be a <b>morzsapartyra</b> mielőtt hazamennétek. 
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
              <h2 className="mt-2 font-display text-2xl text-wedding-ink">
                Fizetési információ
              </h2>
              <p className="mt-3 font-sans text-sm leading-7 text-wedding-bodySoft">
                A szállások egységesen 8000 Forintba kerülnek fejenként, ezt kérlek juttassátok el hozzánk <b>Augusztus 20.-ig</b> az itt felsorolt módok egyikén.
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

              {paymentMethod === "nature" ? (
                <div className="mt-5 rounded-2xl border border-wedding-border bg-wedding-surfaceWarm px-6 py-8 text-center">
                  <div
                    className="text-7xl leading-none sm:text-8xl"
                    aria-hidden="true"
                  >
                    😉
                  </div>
                  <p className="mx-auto mt-5 max-w-sm font-display text-2xl leading-8 text-wedding-ink">
                    Te kis huncut, mit keresel itt?
                  </p>
                </div>
              ) : (
                <dl className="mt-5 space-y-3 font-sans text-sm">
                  {paymentDetails[paymentMethod].map((detail) => (
                    <div
                      key={detail.label}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-wedding-border bg-wedding-surfaceWarm px-4 py-3"
                    >
                      <div className="min-w-0">
                        <dt className="text-xs font-medium uppercase tracking-[0.18em] text-wedding-muted">
                          {detail.label}
                        </dt>
                        <dd className="mt-1 break-words text-wedding-ink">
                          {detail.value}
                        </dd>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyPaymentValue(detail.value)}
                        aria-label={`${detail.label} másolása`}
                        title={`${detail.label} másolása`}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-wedding-border bg-wedding-surface text-wedding-muted transition hover:border-wedding-accentWarm hover:bg-wedding-panelHover hover:text-wedding-ink"
                      >
                        <i
                          className={`fa-solid ${
                            copiedValue === detail.value
                              ? "fa-check text-wedding-successText"
                              : "fa-copy"
                          }`}
                          aria-hidden="true"
                        />
                        <span className="sr-only">
                          {copiedValue === detail.value
                            ? "Másolva"
                            : `${detail.label} másolása`}
                        </span>
                      </button>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
