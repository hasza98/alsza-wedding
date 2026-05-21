type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  id: string;
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  showInvalid?: boolean;
  errorMessage?: string;
};

export function SelectField({
  id,
  label,
  name,
  options,
  placeholder,
  required = false,
  showInvalid = false,
  errorMessage = "Please fill out this field.",
}: SelectFieldProps) {
  return (
    <label className="block">
      <span
        className="mb-2 block text-sm font-medium uppercase tracking-[0.2em] text-wedding-muted"
        
      >
        {label}
      </span>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className={`peer w-full appearance-none rounded-2xl border border-wedding-border bg-wedding-surfaceWarm px-4 py-3 text-base text-wedding-ink outline-none transition has-[option[value='']:checked]:text-wedding-placeholder focus:border-wedding-accent focus:ring-2 focus:ring-wedding-accentSoft ${
          showInvalid
            ? "invalid:border-wedding-errorBorder invalid:bg-wedding-errorBg focus:invalid:border-wedding-errorBorder focus:invalid:ring-wedding-errorRing"
            : ""
        }`}
      >
        {placeholder ? (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {showInvalid && (
        <span className="mt-2 hidden text-sm font-medium text-wedding-errorText peer-invalid:block">
          {errorMessage}
        </span>
      )}
    </label>
  );
}
