"use client";
import { useState, useTransition } from "react";
import { setUserLocale } from "@/utils/locale";
import { FaLanguage } from "react-icons/fa";

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
    <div className="flex items-center space-x-1">
      <label htmlFor="locale-select" >
        <FaLanguage className="text-blue-700 text-xl"/>
      </label>
      <select
        id="locale-select"
        onChange={onChange}
        value={selected}
        className="block outline-none border-none rounded-md p-2 text-blue-700 sm:text-sm sm:leading-6"
        style={{ appearance: "none" }}
      >
        {items.map((opt, index) => {
          return (
            <option value={opt.value} key={index}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
