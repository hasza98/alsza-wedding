import type { ChangeEventHandler } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  min?: string;
  max?: string;
  pattern?: string;
  title?: string;
  showInvalid?: boolean;
  errorMessage?: string;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export function FormField({
  id,
  label,
  name,
  placeholder,
  type = "text",
  required = false,
  min,
  max,
  pattern,
  title,
  showInvalid = false,
  errorMessage = "Légyszi tölts ki.",
  value,
  onChange,
}: FormFieldProps) {
  return (
    <label className="block">
      <span
        className="mb-2 block text-sm font-medium uppercase tracking-[0.2em] text-wedding-muted"
        
      >
        {label}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        pattern={pattern}
        title={title}
        value={value}
        onChange={onChange}
        className={`peer w-full rounded-2xl border border-wedding-border bg-wedding-surfaceWarm px-4 py-3 text-base text-wedding-ink outline-none transition placeholder:text-wedding-placeholder focus:border-wedding-accent focus:ring-2 focus:ring-wedding-accentSoft ${
          showInvalid
            ? "invalid:border-wedding-errorBorder invalid:bg-wedding-errorBg focus:invalid:border-wedding-errorBorder focus:invalid:ring-wedding-errorRing"
            : ""
        }`}
      />
      {showInvalid && (
        <span className="mt-2 hidden text-sm font-medium text-wedding-errorText peer-invalid:block">
          {errorMessage}
        </span>
      )}
    </label>
  );
}
