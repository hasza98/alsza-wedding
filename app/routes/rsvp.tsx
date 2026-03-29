import { redirect, useActionData, useSearchParams } from "react-router";

import { RsvpFormCard } from "../components/rsvp/rsvp-form-card";
import { RsvpIntroCard } from "../components/rsvp/rsvp-intro-card";
import type { Route } from "./+types/rsvp";

export async function action({ request }: Route.ActionArgs) {
  const sheetMonkeyEndpoint = process.env.SHEETMONKEY_FORM_URL;

  if (!sheetMonkeyEndpoint) {
    return {
      error:
        "RSVP submission is not configured on the server yet. Add SHEETMONKEY_FORM_URL.",
    };
  }

  const formData = await request.formData();
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

  return redirect("/rsvp?submitted=1");
}

export default function RsvpPage() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  const isSubmitted = searchParams.get("submitted") === "1";

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <RsvpIntroCard />
        <RsvpFormCard isSubmitted={isSubmitted} error={actionData?.error} />
      </div>
    </section>
  );
}
