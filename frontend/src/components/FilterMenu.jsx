import React, { useState } from "react";
import { SlEqualizer } from "react-icons/sl";

export default function FilterMenu({ label, options, selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative inline-block text-left z-11">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 border rounded-md bg-teal-600 hover:bg-teal-700 text-white"
      >
        <SlEqualizer className="text-xl" />
        <span className="hidden sm:inline">{label}</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-white border rounded shadow-md">
          <div className="flex flex-col">
            <button
              className={`px-4 py-2 text-left text-sm rounded hover:bg-teal-200 active:bg-teal-300 ${
                selected === "" ? "bg-teal-100 text-teal-900" : ""
              }`}
              onClick={() => {
                onSelect("");
                setIsOpen(false);
              }}
            >
              All
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                className={`px-4 py-2 text-left text-sm rounded hover:bg-teal-100 active:bg-teal-200 ${
                  selected === opt ? "bg-teal-100 text-teal-900" : ""
                }`}
                onClick={() => {
                  onSelect(opt);
                  setIsOpen(false);
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
