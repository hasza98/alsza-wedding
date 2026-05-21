type TextAreaFieldProps = {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
};

export function TextAreaField({
  id,
  label,
  name,
  placeholder,
}: TextAreaFieldProps) {
  return (
    <label className="block">
      <span
        className="mb-2 block text-sm font-medium uppercase tracking-[0.2em] text-wedding-muted"
        
      >
        {label}
      </span>
      <textarea
        id={id}
        name={name}
        rows={4}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-wedding-border bg-wedding-surfaceWarm px-4 py-3 text-base text-wedding-ink outline-none transition placeholder:text-wedding-placeholder focus:border-wedding-accent focus:ring-2 focus:ring-wedding-accentSoft"
      />
    </label>
  );
}
