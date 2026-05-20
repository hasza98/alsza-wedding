import { useState } from "react";

import { FormField } from "./form-field";
import { MealPreferenceField } from "./meal-preference-field";
import { RadioCard } from "./radio-card";
import { SelectField } from "./select-field";
import { TextAreaField } from "./text-area-field";

type RsvpFormCardProps = {
  isSubmitted: boolean;
  error?: string;
};

export function RsvpFormCard({ isSubmitted, error }: RsvpFormCardProps) {
  const [guestCount, setGuestCount] = useState(1);
  const [attendance, setAttendance] = useState("Igen");
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());
  const additionalGuestCount = Math.max(0, Math.min(guestCount, 10) - 1);
  const additionalGuests = Array.from(
    { length: additionalGuestCount },
    (_, index) => index + 2,
  );
  const isAttending = attendance === "Igen";
  const showInvalid = (fieldName: string) => invalidFields.has(fieldName);
  const clearInvalid = (fieldName: string) => {
    setInvalidFields((currentFields) => {
      const nextFields = new Set(currentFields);
      nextFields.delete(fieldName);
      return nextFields;
    });
  };
  const clearInvalidFromTarget = (target: EventTarget) => {
    if (
      !(target instanceof HTMLInputElement) &&
      !(target instanceof HTMLSelectElement)
    ) {
      return;
    }

    clearInvalid(target.name || target.id);
  };

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

      <form
        method="POST"
        className="space-y-6"
        onInvalidCapture={(event) => {
          event.preventDefault();
          const field = event.target;

          if (
            field instanceof HTMLInputElement ||
            field instanceof HTMLSelectElement
          ) {
            setInvalidFields((currentFields) => {
              const nextFields = new Set(currentFields);
              nextFields.add(field.name || field.id);
              return nextFields;
            });
          }
        }}
        onInput={(event) => clearInvalidFromTarget(event.target)}
        onChange={(event) => clearInvalidFromTarget(event.target)}
      >
        <input type="hidden" name="_subject" value="New wedding RSVP" />

        <FormField
          id="guestName"
          label="Név"
          name="guestName"
          placeholder="Mikorka Kálmán"
          showInvalid={showInvalid("guestName")}
          required
        />

        <FormField
          id="email"
          label="E-mail"
          name="email"
          placeholder="kálmán@anagy.hu"
          type="email"
          showInvalid={showInvalid("email")}
          errorMessage="Légyszi használható emailt adj meg."
          required
        />

        <FormField
          id="phone"
          label="Telefonszámod"
          name="phone"
          placeholder="+36 30 123 4567"
          type="tel"
          pattern="^\\s*\\+36\\s*(?:20|30|31|50|70)\\s*\\d{3}\\s*\\d{4}\\s*$"
          showInvalid={showInvalid("phone")}
          errorMessage="Bocsi, csak ezt a formát szeretem: +36 30 123 4567."
          required
        />

        <fieldset>
          <legend
            className="text-sm font-medium uppercase tracking-[0.2em] text-[#5f524c]"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Ott leszel az esküvőnkön?
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <RadioCard
              id="attending-yes"
              name="attendance"
              value="Igen"
              label="Naná"
              checked={attendance === "Igen"}
              onChange={(event) => setAttendance(event.target.value)}
              required
            />
            <RadioCard
              id="attending-no"
              name="attendance"
              value="Nem"
              checked={attendance === "Nem"}
              onChange={(event) => setAttendance(event.target.value)}
              label="Szeretnék, de nem tudok."
            />
          </div>
        </fieldset>

        {isAttending ? (
          <>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            id="nickname"
            label="Ahogy szólítunk"
            name="nickname"
            placeholder="Kálmicica"
          />
          <FormField
            id="guestCount"
            label="Hányan jöttök?"
            name="guestCount"
            placeholder="1"
            type="number"
            min="1"
            max="10"
            value={guestCount}
            showInvalid={showInvalid("guestCount")}
            required
            onChange={(event) => {
              const nextGuestCount = Number(event.target.value);
              setGuestCount(Number.isNaN(nextGuestCount) ? 1 : nextGuestCount);
              clearInvalid("guestCount");
            }}
          />
        </div>

        <MealPreferenceField
          id="mealPreference"
          label="Kaja"
          name="mealPreference"
          placeholder="Válassz, vagy írd be ha valami egyéb."
          showInvalid={showInvalid("mealPreference")}
        />

        {additionalGuests.length > 0 && (
          <section className="space-y-5 rounded-2xl border border-[#eadfd4] bg-[#fcfaf7] p-5">
            <div>
              <h2
                className="text-sm font-medium uppercase tracking-[0.2em] text-[#5f524c]"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Aki veled jön
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#6c5c52]">
                Kérlek add meg a pótkerekeid adataid is, hogy rájuk is fel tudjunk készülni. :)
              </p>
            </div>

            <div className="space-y-6">
              {additionalGuests.map((guestNumber, index) => {
                const fieldPrefix = `additionalGuest${index + 1}`;

                return (
                  <div key={guestNumber} className="space-y-4">
                    <h3
                      className="text-sm font-medium uppercase tracking-[0.18em] text-[#7b685e]"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      {guestNumber -1 }. Pótkerék 
                    </h3>
                    <div className="flex flex-col gap-6 sm:grid-cols-3">
                      <FormField
                        id={`${fieldPrefix}Name`}
                        label="Név"
                        name={`${fieldPrefix}Name`}
                        placeholder={`${guestNumber - 1}. Pót ${guestNumber % 2 === 0 ? 'Károly' : 'Katinka'}`}
                        showInvalid={showInvalid(`${fieldPrefix}Name`)}
                        required
                      />
                      <MealPreferenceField
                        id={`${fieldPrefix}MealPreference`}
                        label="Kaja"
                        name={`${fieldPrefix}MealPreference`}
                        placeholder="Válassz, vagy írd be ha valami egyéb."
                        showInvalid={showInvalid(
                          `${fieldPrefix}MealPreference`,
                        )}
                      />
                      <FormField
                        id={`${fieldPrefix}Nickname`}
                        label="Ahogy szólitjuk"
                        name={`${fieldPrefix}Nickname`}
                        placeholder={`${guestNumber - 1}. Kerekecske`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

 <fieldset>
          <legend
            className="text-sm font-medium uppercase tracking-[0.2em] text-[#5f524c]"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Elszállásoljunk?
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <RadioCard
              id="accomodation-yes"
              name="accomodation"
              value="Igen"
              label="Igen, légyszi"
              required
            />
            <RadioCard
              id="accomodation-no"
              name="accomodation"
              value="Nem"
              label="Nem kell köszi."
            />
          </div>
        </fieldset>


        <TextAreaField
          id="songRequest"
          label="Zene kérés"
          name="songRequest"
          placeholder="Ide írd be, mik azok a zenék amikre biztosan ropnád."
        />

        <TextAreaField
          id="message"
          label="Üzenet a párnak"
          name="message"
          placeholder="Bármi egyéb amit tudatnál velünk."
        />

          </>
        ) : (
          <div className="rounded-2xl border border-[#d8b197] bg-[#fff4eb] px-4 py-4 text-sm leading-6 text-[#7b4c33]">
            Nagyon sajnáljuk, hogy nem tudsz velünk ünnepelni. Köszönjük hogy szóltál, mindenképp fussunk össze koccintani egyet!
          </div>
        )}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#2f2421] px-6 py-4 text-sm font-medium uppercase leading-none tracking-[0.25em] text-white transition hover:bg-[#473632]"
        >
          <i
            className="fa-solid fa-envelope inline-flex h-[1em] w-[1em] items-center justify-center text-[1em] leading-none"
            aria-hidden="true"
          ></i>
          Küldés
        </button>
      </form>
    </div>
  );
}
