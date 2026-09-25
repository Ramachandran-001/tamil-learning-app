import React from "react";

export const Badge = ({
  children,
  variant = "default",
  size = "md",
  icon,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full whitespace-nowrap select-none";

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
  };

  const variantStyles = {
    default: "bg-slate-100 text-slate-700 border border-slate-200/60",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    warning: "bg-amber-50 text-amber-800 border border-amber-200/60",
    danger: "bg-rose-50 text-rose-700 border border-rose-200/60",
    info: "bg-sky-50 text-sky-700 border border-sky-200/60",
    purple: "bg-purple-50 text-purple-700 border border-purple-200/60",
    outline: "bg-transparent text-slate-600 border border-slate-300",
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
