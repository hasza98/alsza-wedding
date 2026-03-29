import { FormField } from "./form-field";
import { RadioCard } from "./radio-card";
import { TextAreaField } from "./text-area-field";

type RsvpFormCardProps = {
  isSubmitted: boolean;
  error?: string;
};

export function RsvpFormCard({ isSubmitted, error }: RsvpFormCardProps) {
  return (
    <div className="rounded-[2rem] border border-[#eadfd4] bg-white p-8 shadow-[0_24px_70px_rgba(80,56,38,0.08)]">
      {isSubmitted && (
        <div className="mb-6 rounded-2xl border border-[#c7d9c8] bg-[#f3fbf1] px-4 py-3 text-sm text-[#38543a]">
          Thank you. Your RSVP has been sent successfully.
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-2xl border border-[#d8b197] bg-[#fff4eb] px-4 py-3 text-sm text-[#7b4c33]">
          {error}
        </div>
      )}

      <form method="POST" className="space-y-6">
        <input type="hidden" name="_subject" value="New wedding RSVP" />

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            id="guestName"
            label="Full name"
            name="guestName"
            placeholder="Alex Johnson"
            required
          />
          <FormField
            id="email"
            label="Email"
            name="email"
            placeholder="alex@example.com"
            type="email"
            required
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            id="phone"
            label="Phone"
            name="phone"
            placeholder="+36 30 123 4567"
            type="tel"
          />
          <FormField
            id="guestCount"
            label="Number attending"
            name="guestCount"
            placeholder="2"
            type="number"
            min="0"
            max="10"
          />
        </div>

        <fieldset>
          <legend
            className="text-sm font-medium uppercase tracking-[0.2em] text-[#5f524c]"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Will you be attending?
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <RadioCard
              id="attending-yes"
              name="attendance"
              value="Joyfully attending"
              label="Joyfully attending"
              defaultChecked
            />
            <RadioCard
              id="attending-no"
              name="attendance"
              value="Regretfully declining"
              label="Regretfully declining"
            />
          </div>
        </fieldset>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            id="mealPreference"
            label="Meal preference"
            name="mealPreference"
            placeholder="Vegetarian, vegan, no preference..."
          />
          <FormField
            id="plusOne"
            label="Guest names"
            name="guestNames"
            placeholder="Taylor Johnson, Jamie Smith"
          />
        </div>

        <TextAreaField
          id="dietaryNotes"
          label="Dietary restrictions or accessibility needs"
          name="dietaryNotes"
          placeholder="Let us know about allergies, mobility needs, or anything else we should prepare for."
        />

        <TextAreaField
          id="songRequest"
          label="Song request"
          name="songRequest"
          placeholder="Give us a song that will get you on the dance floor."
        />

        <TextAreaField
          id="message"
          label="Message for the couple"
          name="message"
          placeholder="Anything else we should know?"
        />

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-[#2f2421] px-6 py-4 text-sm font-medium uppercase tracking-[0.25em] text-white transition hover:bg-[#473632]"
        >
          Send RSVP
        </button>
      </form>
    </div>
  );
}
