import { InfoRow } from "./info-row";

export function RsvpIntroCard() {
  return (
    <div className="rounded-[2rem] border border-[#e6ddd2] bg-[#f4ede4] p-8 shadow-[0_24px_70px_rgba(80,56,38,0.08)]">
      <p
        className="text-sm uppercase tracking-[0.35em] text-[#8b6f60]"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        RSVP
      </p>
      <h2
        className="mt-4 text-4xl text-[#2f2421] sm:text-5xl"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
      >
        Let us know if you can celebrate with us
      </h2>
      <p
        className="mt-5 text-base leading-7 text-[#5f524c]"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        Please send one response per household. You can include dietary notes,
        song requests, and any extra details we should know before the big day.
      </p>

      <div className="mt-8 space-y-4 text-sm text-[#5f524c]">
        <InfoRow label="Deadline" value="August 1, 2026" />
        <InfoRow label="Wedding date" value="September 5, 2026" />
        <InfoRow
          label="Where replies go"
          value="Directly to your Formspree inbox"
        />
      </div>
    </div>
  );
}
