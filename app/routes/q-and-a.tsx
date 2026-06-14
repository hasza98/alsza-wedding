import { useState, type ReactNode } from "react";

import contactPhotoDori from "../assets/contacts/dori.jpg";
import contactPhotoEvelin from "../assets/contacts/evelin.jpg";
import contactPhotoSasa from "../assets/contacts/sasa.jpg";
import contactPhotoBogi from "../assets/contacts/bogi.jpg";
import contactPhotoCarlos from "../assets/contacts/carlos.jpg";
import contactPhotoCinti from "../assets/contacts/cinti.jpg";
import contactPhotoBandi from "../assets/contacts/bandi.jpg";
import contactPhotoTimi from "../assets/contacts/timi.jpg";

type Question = {
  question: string;
  answer: ReactNode;
};

type ContactPhotoPosition =
  | "object-center"
  | "object-top"
  | "object-bottom"
  | "object-left"
  | "object-left-top"
  | "object-left-bottom"
  | "object-right"
  | "object-right-top"
  | "object-right-bottom";

const weddingContacts = [
  {
    name: "Dóri",
    title: "A vőlegény tanúja",
    image: contactPhotoDori,
    position: "object-center",
  },
    {
    name: "Bogi",
    title: "A menyasszony 1/2 tanúja, Koszorúslány",
    image: contactPhotoBogi,
    position: "object-center",
  },
    {
    name: "Bandi",
    title: "Koszorúsfiú",
    image: contactPhotoBandi,
    position: "object-center",
  },
  {
    name: "Evelin",
    title: "A menyasszony 1/2 tanúja, Koszorúslány",
    image: contactPhotoEvelin,
    position: "object-top",
  },
  {
    name: "Carlos",
    title: "Koszorúsfiú",
    image: contactPhotoCarlos,
    position: "object-center",
  },
  {
    name: "Cinti",
    title: "Koszorúslány",
    image: contactPhotoCinti,
    position: "object-top",
  },
  {
    name: "Sasa",
    title: "Koszorúsfiú",
    image: contactPhotoSasa,
    position: "object-center",
  },
  {
    name: "Timi",
    title: "CeremóniaMester, Koszorúslány",
    image: contactPhotoTimi,
    position: "object-center",
  },
] satisfies Array<{
  name: string;
  title: string;
  image: string;
  position: ContactPhotoPosition;
}>;

const questions: Question[] = [
  {
    question: "Meddig kell visszajeleznem, hogy megyek-e?",
    answer: (
      <p>
        Kérlek <b>Július 31.-ig</b> töltsd ki a <a href="/visszajelzes">visszajelző formot</a>, hogy még legyen időnk a
        szállást és a megfelelő étkezést előkészíteni.
      </p>
    ),
  },
  {
    question: "Mit vegyek fel?",
    answer: (
      <p>
        A legfontosabb, hogy amiben jól érzed magad! <br /> Ha minden jól alakul kint leszünk éjszaka is, szóval készülj valamivel, ami kívülről átmelegít (a belső melegítésről mi gondoskodunk 😉). <br /> Cipőből is jó ha van stabilabb, mert a táncparkett térköves lesz. <br /> Ezenkívül a gyakran ismételt kérdés, hogy van-e tabu szín? A fehéret már stoppoltuk, de ezenkívül tárt karokkal várjuk a színeket, legyetek a dekorunk része!
      </p>
    ),
  },
  {
    question: "Tudom milyen zenétől futna mindenki a táncparkettre. Tehetek javaslatokat?",
    answer: (
      <p>
        Persze! Nyugodtan adj hozzá zenéket <a href="https://open.spotify.com/playlist/47oB7IGUVLuu0p0rsTl3UU?si=l8CSLKZ_R0mxWy5fHD4o7w&pt=a9416fc4f56a55456cbd98aeb85dfb23&pi=LApjI9rVRaWYi" target="_blank">ehhez a listához</a>, de figyelj, hogy ne csak a te zenéid töltsék ki az egészet, hogy mindenki kívánságát egységesen tudjuk figyelembe venni (igen Gábor és Frici, ez főként nektek szól)
      </p>
    ),
  },
  {
    question: "Le tudok parkolni az esküvő helyszínén?",
    answer: (
      <p>
        Ez egy falu. Ahol helyet találsz megállhatsz.
      </p>
    ),
  },
  {
    question: "Lesz szállás vagy a reggeli első buszig kell táncolnom?",
    answer: (
      <p>
        Természetesen lesz, részletes infókat <a href="/szallas">itt olvashatsz</a> róla.
      </p>
    ),
  },
  {
    question: "Hogyan jutok el az esküvő helyszínére?",
    answer: (
      <p>
        Erről részletes tájékoztatót <a href="/helyszin">itt kaphatsz</a>.
      </p>
    ),
  },
  {
    question: "Reggel, ha felébredtem lépjek is le?",
    answer: (
      <p>
        Ha időd engedi, akkor ne! Készülünk nektek egy kis morzsapartyval másnap reggel 9:30-11:00. Megesszük a maradékot, és felidézzük az előző esti meghomályosodott emlékeket.
      </p>
    ),
  },
  {
    question: "Mit kell vinni ajándékba?",
    answer: (
      <>
      <p className="mb-2">
        Magadon kívül semmit! <br /> 
        Ha mégis meglepnél minket, egy borítékkal nem lehet mellé lőni, de ha maradandó tárgyat adnál <a href="https://docs.google.com/spreadsheets/d/1H9UNWvLfmNZA_EbXMMnsJib3DGjN7p1qvkIdNfiWb5A/edit?usp=sharing" target="_blank">itt egy lista</a>, aminek biztos, hogy meglenne a helye a kis lakásunkban. <br/> 
        Ezeket a <u>polgári esküvő utáni gratuláció során</u> lesz lehetőségetek átadni.
      </p>
      <p>
        Ha szeretnétek megtáncoltatni éjfélkor az ifjú párt, akkor mindenképp készüljetek <b>kaparós sorsjeggyel</b>, hogy meghozzátok a szerencsénk.
      </p>
      </>

    ),
  },
  {
    question: "Kit keressek, ha kérdésem van?",
    answer: (
      <>
        <p>
          Az esküvő előtti napig bátran keress minket, de a nagy napon eléggé
          elfoglaltak leszünk, ezért az alábbi 8 szimpatikus arcot keresd a
          kérdéseiddel. Vagy tudni fogják a választ, vagy tudják, kit kell
          keresni.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {weddingContacts.map((contact, index) => (
            <div
              key={`${contact.name}-${index}`}
              className="flex items-center gap-5"
            >
              <img
                src={contact.image}
                alt={`${contact.name} portréja`}
                className={[
                  "h-32 w-32 shrink-0 rounded-2xl border border-wedding-border object-cover shadow-wedding-radio sm:h-40 sm:w-40",
                  contact.position,
                ].join(" ")}
              />
              <div className="min-w-0">
                <h3 className="font-display text-2xl leading-tight text-wedding-ink">
                  {contact.name}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-wedding-labelWarm">
                  {contact.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
];

export default function QAndAPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mt-4 font-display text-4xl text-wedding-ink sm:text-5xl">
          Hasznos infók
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-7 text-wedding-muted">
          Itt remélhetőleg minden felmerülő kérdésre választ kaptok, ha mégsem, akkor az utolsó pontban tudtok további infót szerezni.
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

function QuestionItem({ item }: { item: Question }) {
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
