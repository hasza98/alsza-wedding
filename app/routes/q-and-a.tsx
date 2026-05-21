import { useState } from "react";

const questions = [
  {
    question: "When should we RSVP by?",
    answer:
      "Please send your RSVP by September 1, 2026 so we can finalize the headcount, food, and accommodation details.",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "If your invitation includes a plus one, you can add them in the RSVP form by increasing the number attending and filling out their details.",
  },
  {
    question: "Is there accommodation on site?",
    answer:
      "Yes, there are limited on-site sleeping options. In the RSVP form, let us know if you would like us to arrange accommodation for you.",
  },
  {
    question: "What should I wear?",
    answer:
      "Wear something festive and comfortable enough for dinner, dancing, and wandering around the venue. We recommend avoiding very casual clothes.",
  },
  {
    question: "Can we request songs?",
    answer:
      "Absolutely. Add your song request in the RSVP form, especially if it is something that will get you on the dance floor.",
  },
  {
    question: "Who should we contact with questions?",
    answer:
      "Send us a message directly if anything is unclear. We would much rather answer early than have you guessing.",
  },
];

export default function QAndAPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const isSearching = normalizedSearchTerm.length > 0;
  const visibleQuestions = isSearching
    ? questions.filter((item) =>
        `${item.question} ${item.answer}`
          .toLowerCase()
          .includes(normalizedSearchTerm),
      )
    : questions;

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="font-sans text-sm uppercase tracking-[0.35em] text-wedding-labelWarm">
          Helpful details
        </p>
        <h1 className="mt-4 font-display text-4xl text-wedding-ink sm:text-5xl">
          Q + A
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-7 text-wedding-muted">
          A few answers before the big day. Open anything you are wondering
          about.
        </p>
      </div>

      <label className="mb-6 block">
        <span className="mb-2 block font-sans text-sm font-medium uppercase tracking-[0.2em] text-wedding-muted">
          Search questions
        </span>
        <div className="flex items-center gap-3 rounded-2xl border border-wedding-border bg-wedding-surfaceWarm px-4 py-3 transition focus-within:border-wedding-accent focus-within:ring-2 focus-within:ring-wedding-accentSoft">
          <i
            className="fa-solid fa-magnifying-glass text-wedding-placeholder"
            aria-hidden="true"
          ></i>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search questions and answers"
            className="min-w-0 flex-1 bg-transparent font-sans text-base text-wedding-ink outline-none placeholder:text-wedding-placeholder"
          />
        </div>
      </label>

      <div className="space-y-4">
        {visibleQuestions.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-wedding-borderSoft bg-wedding-surface shadow-wedding-card"
            open={isSearching}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-sans text-base font-medium text-wedding-ink marker:hidden">
              <span>{item.question}</span>
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-wedding-border bg-wedding-surfaceWarm text-wedding-muted transition group-open:border-wedding-accent group-open:text-wedding-ink">
                <i
                  className="fa-solid fa-chevron-down block text-sm group-open:!hidden"
                  aria-hidden="true"
                ></i>
                <i
                  className="fa-solid fa-chevron-up !hidden text-sm group-open:!block"
                  aria-hidden="true"
                ></i>
              </span>
            </summary>
            <div className="border-t border-wedding-border px-5 pb-5 pt-4 font-sans text-sm leading-7 text-wedding-bodySoft">
              {item.answer}
            </div>
          </details>
        ))}
      </div>

      {visibleQuestions.length === 0 && (
        <div className="rounded-2xl border border-wedding-borderSoft bg-wedding-surface px-5 py-5 font-sans text-sm leading-7 text-wedding-muted">
          No matching questions yet. Try a different search.
        </div>
      )}
    </section>
  );
}
