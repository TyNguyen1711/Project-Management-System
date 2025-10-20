import React, { useState, useMemo } from "react";
import { Plus, ChevronDown } from "lucide-react";
// Dropdown component
const FilterDropdown = ({
  label,
  icon,
  options,
  selected,
  onSelect,
  onClear,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
      >
        <span className="w-4 h-4">{icon}</span>
        {label}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-80 overflow-y-auto">
            <div className="p-2">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onSelect(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center gap-2 ${
                    selected.includes(option.id) ? "bg-blue-50" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option.id)}
                    onChange={() => {}}
                    className="rounded border-gray-300"
                  />
                  {option.initial && (
                    <div
                      className={`w-6 h-6 rounded ${
                        option.color || "bg-gray-200"
                      } flex items-center justify-center text-white text-xs font-semibold`}
                    >
                      {option.initial}
                    </div>
                  )}
                  <span className="text-sm text-gray-700">{option.name}</span>
                </button>
              ))}
            </div>
            {selected.length > 0 && (
              <div className="border-t border-gray-200 p-2">
                <button
                  onClick={() => {
                    onClear();
                    setIsOpen(false);
                  }}
                  className="w-full text-sm text-blue-600 hover:text-blue-700 py-1"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default FilterDropdown;
