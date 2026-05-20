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
        className="mb-2 block text-sm font-medium uppercase tracking-[0.2em] text-[#5f524c]"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        {label}
      </span>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className={`peer w-full appearance-none rounded-2xl border border-[#e2d6ca] bg-[#fcfaf7] px-4 py-3 text-base text-[#2f2421] outline-none transition has-[option[value='']:checked]:text-[#a29185] focus:border-[#9f7f6d] focus:ring-2 focus:ring-[#d9c1b1] ${
          showInvalid
            ? "invalid:border-[#c85745] invalid:bg-[#fff7f5] focus:invalid:border-[#c85745] focus:invalid:ring-[#e7aaa0]"
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
        <span className="mt-2 hidden text-sm font-medium text-[#c85745] peer-invalid:block">
          {errorMessage}
        </span>
      )}
    </label>
  );
}
