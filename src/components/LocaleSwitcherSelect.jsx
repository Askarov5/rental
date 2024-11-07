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
      <label 
        htmlFor="localeSelect" 
        className="flex gap-1 items-center"
        onClick={(e)=> document.getElementById('localeSelect').click()}
      >
        <FaLanguage className="text-blue-700 text-xl" />
      </label>
      <select
          id="localeSelect"
          onChange={onChange}
          value={selected}
          className="block cursor-pointer outline-none border-none rounded-md p-2 text-blue-700 sm:text-sm sm:leading-6"
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
