/* Logo provisoire : marque (poêle vue du dessus) + nom en Instrument Serif.
   À remplacer par le logo officiel (SVG) dès qu'il est fourni. */
export function Mark({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="4 10 58 44" className={className} aria-hidden="true">
      <circle cx="25" cy="32" r="14" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="25" cy="32" r="6.5" fill="var(--color-copper)" />
      <rect x="38" y="29" width="20" height="6" rx="3" fill="currentColor" />
    </svg>
  )
}

export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Mark className="h-[1.1em] w-[1.45em]" />
      <span className="font-display text-[1.65em] leading-none tracking-[-0.01em]">Silkura</span>
    </span>
  )
}
