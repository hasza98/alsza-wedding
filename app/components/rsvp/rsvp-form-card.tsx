import { useEffect, useRef, useState } from "react";
import { Form } from "react-router";

import { FormField } from "./form-field";
import { MealPreferenceField } from "./meal-preference-field";
import { RadioCard } from "./radio-card";
import { TextAreaField } from "./text-area-field";

type RsvpFormCardProps = {
  isSubmitted: boolean;
  error?: string;
};

export function RsvpFormCard({ isSubmitted, error }: RsvpFormCardProps) {
  const successMessageRef = useRef<HTMLDivElement>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [attendance, setAttendance] = useState("");
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());
  const additionalGuestCount = Math.max(0, Math.min(guestCount, 10) - 1);
  const additionalGuests = Array.from(
    { length: additionalGuestCount },
    (_, index) => index + 2,
  );
  const isNotAttending = attendance === "Nem";
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

  useEffect(() => {
    if (!isSubmitted) {
      return;
    }

    successMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [isSubmitted]);

  return (
    <div className="rounded-[2rem] border border-wedding-borderSoft bg-wedding-surface p-8 shadow-wedding-card">
      {isSubmitted && (
        <div
          ref={successMessageRef}
          className="rounded-2xl border border-wedding-successBorder bg-wedding-successBg px-5 py-5 text-wedding-successText"
        >
          <h2
            className="font-display text-2xl text-wedding-successHeading"
            
          >
            Koszonjuk, megkaptuk a visszajelzesed!
          </h2>
          <p className="mt-2 text-sm leading-6">
            Elmentettuk az RSVP-d. Mi mar nagyon varjuk, hogy egyutt
            unnepeljunk.
          </p>
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-2xl border border-wedding-errorPanelBorder bg-wedding-errorPanel px-4 py-3 text-sm text-wedding-errorPanelText">
          {error}
        </div>
      )}

      {!isSubmitted && (
      <Form
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
          pattern="^(\+?36)?[ -]?(\d{1,2}|(\(\d{1,2}\)))/?([ -]?\d){6,7}$"
          showInvalid={showInvalid("phone")}
          errorMessage="Bocsi, csak ezt a formát szeretem: +36 30 123 4567."
          required
        />

        <fieldset>
          <legend
            className="text-sm font-medium uppercase tracking-[0.2em] text-wedding-muted"
            
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
              showInvalid={showInvalid("attendance")}
              required
            />
            <RadioCard
              id="attending-no"
              name="attendance"
              value="Nem"
              checked={attendance === "Nem"}
              onChange={(event) => setAttendance(event.target.value)}
              showInvalid={showInvalid("attendance")}
              label="Szeretnék, de nem tudok."
            />
          </div>
          {showInvalid("attendance") && (
            <p className="mt-2 text-sm font-medium text-wedding-errorText">
              Kérlek valassz, hogy ott leszel-e.
            </p>
          )}
        </fieldset>

        {isNotAttending ? (
          <div className="rounded-2xl border border-wedding-errorPanelBorder bg-wedding-errorPanel px-4 py-4 text-sm leading-6 text-wedding-errorPanelText">
            Nagyon sajnáljuk, hogy nem tudsz velünk ünnepelni. Köszönjük hogy szóltál, mindenképp fussunk össze koccintani egyet!
          </div>
        ) : (
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
          <section className="space-y-5 rounded-2xl border border-wedding-borderSoft bg-wedding-surfaceWarm p-5">
            <div>
              <h2
                className="text-sm font-medium uppercase tracking-[0.2em] text-wedding-muted"
                
              >
                Aki veled jön
              </h2>
              <p className="mt-2 text-sm leading-6 text-wedding-bodySoft">
                Kérlek add meg a pótkerekeid adataid is, hogy rájuk is fel tudjunk készülni. :)
              </p>
            </div>

            <div className="space-y-6">
              {additionalGuests.map((guestNumber, index) => {
                const fieldPrefix = `additionalGuest${index + 1}`;

                return (
                  <div key={guestNumber} className="space-y-4">
                    <h3
                      className="text-sm font-medium uppercase tracking-[0.18em] text-wedding-labelSoft"
                      
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

        <div>
          <fieldset className="mb-2">
            <legend
              className="text-sm font-medium uppercase tracking-[0.2em] text-wedding-muted"
              
            >
              Elszállásoljunk?
            </legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <RadioCard
                id="accomodation-yes"
                name="accomodation"
                value="Igen"
                showInvalid={showInvalid("accomodation")}
                label="Igen, légyszi"
                required
              />
              <RadioCard
                id="accomodation-no"
                name="accomodation"
                value="Nem"
                showInvalid={showInvalid("accomodation")}
                label="Nem kell köszi."
              />
            </div>
          </fieldset>

          <p className="text-xs leading-6 text-wedding-mutedSoft">
            A szállás részleteit{" "}
            <a
              href="/travel"
              className="font-medium text-wedding-muted underline decoration-wedding-accentWarm underline-offset-4 transition hover:text-wedding-ink"
            >
              itt találod
            </a>
            .
          </p>
        </div>


        <TextAreaField
          id="message"
          label="Üzenet a párnak"
          name="message"
          placeholder="Bármi egyéb amit tudatnál velünk."
        />

          </>
        ) }

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-wedding-ink px-6 py-4 text-sm font-medium uppercase leading-none tracking-[0.25em] text-wedding-onInk transition hover:bg-wedding-buttonHover"
        >
          <i
            className="fa-solid fa-envelope inline-flex h-[1em] w-[1em] items-center justify-center text-[1em] leading-none"
            aria-hidden="true"
          ></i>
          Küldés
        </button>
      </Form>
      )}
    </div>
  );
}
