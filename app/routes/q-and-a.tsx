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

      <div className="space-y-4">
        {questions.map((item) => (
          <QuestionItem key={item.question} item={item} />
        ))}
      </div>
    </section>
  );
}

function QuestionItem({ item }: { item: (typeof questions)[number] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-wedding-borderSoft bg-wedding-surface shadow-wedding-card">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-sans text-base font-medium text-wedding-ink"
      >
        <span>{item.question}</span>
        <span
          className={[
            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-wedding-surfaceWarm text-wedding-muted transition",
            isOpen
              ? "rotate-180 border-wedding-accent text-wedding-ink"
              : "border-wedding-border",
          ].join(" ")}
        >
          <i className="fa-solid fa-chevron-down text-sm" aria-hidden="true"></i>
        </span>
      </button>

      <div
        className={[
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div
            className={[
              "border-t border-wedding-border px-5 font-sans text-sm leading-7 text-wedding-bodySoft transition-[padding,opacity] duration-300 ease-in-out",
              isOpen ? "pb-5 pt-4 opacity-100" : "pb-0 pt-0 opacity-0",
            ].join(" ")}
          >
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
}
