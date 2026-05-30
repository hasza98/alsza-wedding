import { useActionData } from "react-router";

import { RsvpFormCard } from "../components/rsvp/rsvp-form-card";
import { RsvpIntroCard } from "../components/rsvp/rsvp-intro-card";
import { RsvpPhotoCard } from "../components/rsvp/rsvp-photo-card";
import type { Route } from "./+types/rsvp";

type AdditionalGuest = {
  name: string;
  mealPreference: string;
  nickname: string;
};

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function collectAdditionalGuests(formData: FormData): AdditionalGuest[] {
  const guestCount = Number(getStringValue(formData, "guestCount"));
  const additionalGuestCount = Number.isFinite(guestCount)
    ? Math.max(0, Math.min(guestCount, 10) - 1)
    : 0;

  return Array.from({ length: additionalGuestCount }, (_, index) => {
    const fieldPrefix = `additionalGuest${index + 1}`;

    return {
      name: getStringValue(formData, `${fieldPrefix}Name`),
      mealPreference: getStringValue(formData, `${fieldPrefix}MealPreference`),
      nickname: getStringValue(formData, `${fieldPrefix}Nickname`),
    };
  }).filter((guest) =>
    Object.values(guest).some((value) => value.length > 0),
  );
}

function replaceAdditionalGuestFields(formData: FormData) {
  const additionalGuests = collectAdditionalGuests(formData);

  for (const key of Array.from(formData.keys())) {
    if (/^additionalGuest\d+(Name|MealPreference|Nickname)$/.test(key)) {
      formData.delete(key);
    }
  }

  formData.set("additionalGuests", JSON.stringify(additionalGuests));
}

export async function action({ request }: Route.ActionArgs) {
  const sheetMonkeyEndpoint = process.env.SHEETMONKEY_FORM_URL;

  if (!sheetMonkeyEndpoint) {
    return {
      error:
        "RSVP submission is not configured on the server yet. Add SHEETMONKEY_FORM_URL.",
    };
  }

  const formData = await request.formData();
  const phone = formData.get("phone");
  replaceAdditionalGuestFields(formData);

  if (typeof phone === "string") {
    formData.set("phone", phone.replace(/\s+/g, ""));
  }

  const response = await fetch(sheetMonkeyEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    return {
      error:
        "We could not send your RSVP just now. Please try again in a moment.",
    };
  }

  return { success: true };
}

export default function RsvpPage() {
  const actionData = useActionData<typeof action>();
  const isSubmitted = actionData?.success === true;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-8">
          <RsvpIntroCard />
          <div className="hidden flex-1 lg:block">
            <RsvpPhotoCard src="/couple_1.jpg" />
          </div>
        </div>
        <RsvpFormCard isSubmitted={isSubmitted} error={actionData?.error} />
      </div>
    </section>
  );
}
