"use client";
import { useState, useTransition } from "react";
import { setUserLocale } from "@/utils/locale";
import { FaLanguage } from "react-icons/fa";
import { Field, Label, Select } from "@headlessui/react";

export default function LocaleSwitcherSelect({ defaultValue, items, label }) {
  const [isPending, startTransition] = useTransition();

  const [selected, setSelected] = useState(defaultValue);

  function onChange(e) {
    const locale = e.target.value;
    setSelected(locale);

    console.log(locale);

    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="flex items-center space-x-1 text-blue-600">
      <Field className="flex gap-1 items-center cursor-pointer">
        <Label htmlFor="localeSelect"><FaLanguage className="text-3xl"/></Label>
        <Select
          name="language"
          aria-label="Language Select"
          id="localeSelect"
          onChange={onChange}
          value={selected}
          className="flex items-center outline-none cursor-pointer gap-1"
        >
          {items.map((opt, index) => {
            return (
              <option value={opt.value} key={index}>
                {opt.label}
              </option>
            );
          })}
        </Select>
      </Field>
    </div>
  );
}
