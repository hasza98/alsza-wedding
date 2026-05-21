import type { ChangeEventHandler } from "react";

type RadioCardProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  showInvalid?: boolean;
};

export function RadioCard({
  id,
  name,
  value,
  label,
  checked,
  defaultChecked = false,
  onChange,
  required = false,
  showInvalid = false,
}: RadioCardProps) {
  const stateClasses = showInvalid
    ? "border-wedding-errorBorder bg-wedding-errorBg hover:border-wedding-errorBorder hover:bg-wedding-errorBg"
    : "border-wedding-border bg-wedding-surfaceWarm hover:border-wedding-accentWarm hover:bg-wedding-panelHover has-[:checked]:border-wedding-accent has-[:checked]:bg-wedding-panelSelected has-[:checked]:shadow-wedding-radio";

  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 text-wedding-ink transition ${stateClasses}`}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={checked === undefined ? defaultChecked : undefined}
        onChange={onChange}
        required={required}
        className="h-4 w-4 border-wedding-accent text-wedding-ink focus:ring-wedding-accentSoft"
      />
      <span
        className="text-sm font-medium uppercase tracking-[0.18em]"
        
      >
        {label}
      </span>
    </label>
  );
}
