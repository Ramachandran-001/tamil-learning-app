import React from "react";

export const Input = ({
  label,
  helperText,
  error,
  icon,
  className = "",
  id,
  ...props
}) => {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
        >
          {label}
        </label>
      )}
      <div className="relative rounded-2xl shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full rounded-2xl border ${
            error
              ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/30"
              : "border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/20 hover:border-slate-700"
          } bg-slate-900/90 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-4 transition duration-200 ${
            icon ? "pl-10" : ""
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
      {!error && helperText && (
        <p className="text-xs text-slate-400">{helperText}</p>
      )}
    </div>
  );
};
