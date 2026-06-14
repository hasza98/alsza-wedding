import { PhotoGallery } from "../components/photos/photo-gallery";

export default function Photos() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mt-4 font-display text-4xl text-wedding-ink sm:text-5xl">
          Képeink
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-7 text-wedding-muted">
          Pár közös kép az elmúlt 6 évnyi a kalandozásunkról.
        </p>
      </div>
      <PhotoGallery />
    </section>
  );
}
