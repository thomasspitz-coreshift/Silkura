/* Logo Silkura, reproduit d'après le coffret : nom en serif, filet trait — point — trait,
   « MADE IN FRANCE » en capitales espacées et filet tricolore.
   À remplacer par le fichier vectoriel officiel (SVG) dès qu'il est fourni. */

export function Tricolore({ className = '' }) {
  return (
    <span className={`tricolore ${className}`} aria-hidden="true">
      <span className="bg-fr-blue" />
      <span className="bg-white" />
      <span className="bg-fr-red" />
    </span>
  )
}

export function Ornament({ className = '' }) {
  return (
    <span className={`ornament ${className}`} aria-hidden="true">
      <span />
    </span>
  )
}

export default function Logo({ className = 'text-[1.9em]' }) {
  return <span className={`font-display leading-none font-normal tracking-[0.01em] ${className}`}>Silkura</span>
}
