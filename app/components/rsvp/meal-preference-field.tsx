import { useState, type KeyboardEvent } from "react";

const mealOptions = [
  "Mindenevő",
  "Vegetáriánus",
  "Vegán",
  "Gluténmentes",
  "Laktózmentes",
];

type MealPreferenceFieldProps = {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  showInvalid?: boolean;
  errorMessage?: string;
};

export function MealPreferenceField({
  id,
  label,
  name,
  placeholder,
  required = false,
  showInvalid = false,
  errorMessage = "Please fill out this field.",
}: MealPreferenceFieldProps) {
  const [chips, setChips] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const addChip = (value: string) => {
    const nextChip = value.trim();

    if (!nextChip) {
      return;
    }

    setChips((currentChips) => {
      const alreadyAdded = currentChips.some(
        (chip) => chip.toLowerCase() === nextChip.toLowerCase(),
      );

      if (alreadyAdded) {
        return currentChips;
      }

      return [...currentChips, nextChip];
    });
    setInputValue("");
    setIsDropdownOpen(false);
  };

  const removeChip = (chipToRemove: string) => {
    setChips((currentChips) =>
      currentChips.filter((chip) => chip !== chipToRemove),
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addChip(inputValue);
    }

    if (event.key === "Backspace" && !inputValue) {
      setChips((currentChips) => currentChips.slice(0, -1));
    }

    if (event.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  const availableOptions = mealOptions.filter(
    (option) =>
      option.toLowerCase().includes(inputValue.trim().toLowerCase()) &&
      !chips.some((chip) => chip.toLowerCase() === option.toLowerCase()),
  );

  return (
    <div className="relative">
      <label htmlFor={id} className="block">
        <span
          className="mb-2 block text-sm font-medium uppercase tracking-[0.2em] text-wedding-muted"
          
        >
          {label}
        </span>
      </label>

      <input type="hidden" name={name} value={chips.join(", ")} />

      <div
        className={`rounded-2xl border border-wedding-border bg-wedding-surfaceWarm px-4 py-3 transition focus-within:border-wedding-accent focus-within:ring-2 focus-within:ring-wedding-accentSoft ${
          showInvalid
            ? "has-[:invalid]:border-wedding-errorBorder has-[:invalid]:bg-wedding-errorBg focus-within:has-[:invalid]:border-wedding-errorBorder focus-within:has-[:invalid]:ring-wedding-errorRing"
            : ""
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-2 rounded-full border border-wedding-chipBorder bg-wedding-surface px-3 py-1 text-base text-wedding-ink"
            >
              {chip}
              <button
                type="button"
                aria-label={`Remove ${chip}`}
                onClick={() => removeChip(chip)}
                className="text-wedding-labelSoft transition hover:text-wedding-ink"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 512 512"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                </svg>
              </button>
            </span>
          ))}

          <input
            id={id}
            type="text"
            value={inputValue}
            required={required && chips.length === 0}
            placeholder={chips.length === 0 ? placeholder : undefined}
            onChange={(event) => {
              setInputValue(event.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            onClick={() => setIsDropdownOpen(true)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              addChip(inputValue);
              setIsDropdownOpen(false);
            }}
            className="min-w-[12rem] flex-1 bg-transparent text-base text-wedding-ink outline-none placeholder:text-wedding-placeholder"
          />
        </div>
      </div>

      {isDropdownOpen && availableOptions.length > 0 && (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-wedding-border bg-wedding-surface shadow-wedding-dropdown">
          <p className="border-b border-wedding-borderSoft px-4 py-3 text-xs leading-5 text-wedding-mutedSoft">
            Többet is választhatsz és sajátot is beírhatsz, ha nem találod a megfelelőt.
          </p>
          {availableOptions.map((option) => (
            <button
              key={option}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => addChip(option)}
              className="block w-full px-4 py-3 text-left text-sm text-wedding-ink transition hover:bg-wedding-panelHover"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {showInvalid && required && chips.length === 0 && (
        <p className="mt-2 text-sm font-medium text-wedding-errorText">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
