import React from "react";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 select-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5 shadow-sm",
    md: "px-4 py-2 text-sm gap-2 shadow",
    lg: "px-6 py-3 text-base gap-2.5 shadow-md",
  };

  const variantStyles = {
    primary:
      "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-emerald-600/20",
    secondary:
      "bg-slate-800 hover:bg-slate-900 text-white focus:ring-slate-700 shadow-slate-900/20",
    outline:
      "border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-slate-400",
    ghost:
      "hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 focus:ring-slate-400 shadow-none",
    success:
      "bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500 shadow-teal-600/20",
    danger:
      "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-rose-600/20",
    accent:
      "bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold focus:ring-amber-400 shadow-amber-500/25",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        icon &&
        iconPosition === "left" && <span className="shrink-0">{icon}</span>
      )}
      <span className="truncate">{children}</span>
      {!isLoading && icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
};
