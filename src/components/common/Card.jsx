import React from "react";

export const Card = ({
  children,
  variant = "default",
  hoverEffect = false,
  className = "",
  ...props
}) => {
  const baseStyles = "rounded-3xl transition-all duration-300 relative";

  const variantStyles = {
    default:
      "bg-slate-900/80 backdrop-blur-md border border-slate-800/80 shadow-xl shadow-slate-950/50 text-slate-100",
    flat: "bg-slate-900/50 border border-slate-800/50 text-slate-200",
    elevated:
      "bg-slate-900 border border-slate-700/60 shadow-2xl shadow-slate-950/80 text-slate-100",
    glass:
      "bg-slate-900/70 backdrop-blur-xl border border-slate-700/40 shadow-xl text-slate-100",
    accent:
      "bg-gradient-to-br from-emerald-950/60 via-slate-900/90 to-slate-950 border border-emerald-500/30 text-emerald-100",
    bento: "bento-card text-slate-100",
    "bento-emerald": "bento-card bento-card-emerald text-emerald-100",
    "bento-amber": "bento-card bento-card-amber text-amber-100",
    "bento-indigo": "bento-card bento-card-indigo text-indigo-100",
    "bento-rose": "bento-card bento-card-rose text-rose-100",
  };

  const hoverStyles = hoverEffect
    ? "hover:shadow-2xl hover:-translate-y-1 hover:border-slate-600/80"
    : "";

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
