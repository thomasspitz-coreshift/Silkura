const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function ArrowRight({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function Plus({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function Menu({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  )
}

export function Close({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function Flame({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 21c-3.9 0-7-2.7-7-6.6 0-3.1 2-5.2 3.6-7 .4 1.8 1.4 3 2.6 3.4C11 7.6 12.4 5 14.6 3c.3 3 4.4 5.4 4.4 10.4 0 4.6-3.1 7.6-7 7.6z" />
    </svg>
  )
}

export function Layers({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </svg>
  )
}

export function Forever({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6.5 8.5C4 8.5 2.5 10.2 2.5 12s1.5 3.5 4 3.5c4 0 7-7 11-7 2.5 0 4 1.7 4 3.5s-1.5 3.5-4 3.5c-4 0-7-7-11-7z" />
    </svg>
  )
}

export function Hand({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M8 13V5.5a1.5 1.5 0 013 0V11m0-6.5a1.5 1.5 0 013 0V11m0-5a1.5 1.5 0 013 0v7m0-4.5a1.5 1.5 0 013 0V15a7 7 0 01-7 7h-1.2a6 6 0 01-4.6-2.2L3.4 16a1.6 1.6 0 012.4-2.1L8 16" />
    </svg>
  )
}

export function Instagram({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}

export function Mail({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </svg>
  )
}
