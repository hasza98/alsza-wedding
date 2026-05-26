import { CountdownTimer } from "../components/countdown/wedding-countdown";

export function Welcome() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-wedding-borderWarm bg-wedding-surface shadow-wedding-card">
        <div className="px-6 py-10 text-center sm:px-12 sm:py-14">
          <p className="font-sans text-sm uppercase tracking-[0.35em] text-wedding-labelWarm">
            Kedves Családunk és Barátaink!
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight text-wedding-ink sm:text-5xl">
            Szeretettel köszöntünk az esküvőnk oldalán
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-8 text-wedding-muted">
            Nagyon örülünk, hogy velünk ünnepeltek ezen a különleges napon.
            Itt minden fontos információt megtaláltok, hogy együtt készülhessünk
            szeptember 5-re.
          </p>
        </div>

        <div className="border-t border-wedding-borderSoft bg-wedding-surfaceWarm px-5 py-9 text-center sm:px-10 sm:py-11">
          <p className="mb-7 font-sans text-xs font-medium uppercase tracking-[0.3em] text-wedding-labelWarm">
            Már csak ennyi van hátra
          </p>
          <CountdownTimer compact />
        </div>
      </div>
    </section>
  );
}
