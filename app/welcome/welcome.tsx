import { CountdownTimer } from "../components/countdown/wedding-countdown";

export function Welcome() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-wedding-borderWarm bg-wedding-surface shadow-wedding-card">
        <div className="px-6 py-10 text-center sm:px-12 sm:py-14">
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight text-wedding-ink sm:text-5xl">
            Kedves családunk, barátaink!
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-display text-2xl leading-8 text-wedding-muted">
            Ha ide jutottatok, az azt jelenti, hogy van egy jó hírünk! Szeretettel meghívunk benneteket a
          </p>
          <CountdownTimer compact />
          <p className="mx-auto mt-6 max-w-2xl font-display text-2xl leading-8 text-wedding-muted">
            múlva levő esküvőnkre! Ezen az oldalon remélhetőleg minden az esküvővel kapcsolatos kérdés megválaszolásra kerül, és ti is többet tudtok meg a Nagy Napunk lefolyásának részleteiről! :)
          </p>
          <p className="mx-auto mt-6 max-w-2xl font-display text-2xl leading-8 text-wedding-muted">
            Mi már nagyon várjuk - Aliz & Szatya
          </p>
        </div>
      </div>
    </section>
  );
}
