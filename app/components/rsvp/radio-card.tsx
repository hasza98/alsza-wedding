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
    ? "border-[#c85745] bg-[#fff7f5] hover:border-[#c85745] hover:bg-[#fff7f5]"
    : "border-[#e2d6ca] bg-[#fcfaf7] hover:border-[#b7937f] hover:bg-[#faf3ed] has-[:checked]:border-[#9f7f6d] has-[:checked]:bg-[#f4ebe4] has-[:checked]:shadow-[0_10px_28px_rgba(80,56,38,0.10)]";

  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 text-[#2f2421] transition ${stateClasses}`}
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
        className="h-4 w-4 border-[#9f7f6d] text-[#2f2421] focus:ring-[#d9c1b1]"
      />
      <span
        className="text-sm font-medium uppercase tracking-[0.18em]"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        {label}
      </span>
    </label>
  );
}
