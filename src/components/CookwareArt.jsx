/* ============================================================
   Illustrations vectorielles des pièces (inox), utilisées tant qu'il n'y a pas de photo.
   Vue de profil légèrement plongeante, dessinée à partir de quelques paramètres
   (centre, bord, profondeur) : une nouvelle forme = une entrée dans SHAPES.
   ============================================================ */

import { useId } from 'react'

const FINISH = {
  body: [['0', '#7F8488'], ['0.22', '#C9CDD0'], ['0.4', '#F1F2F2'], ['0.62', '#A3A8AC'], ['1', '#6E7377']],
  inside: ['#A9AEB1', '#DADDDF'],
  lip: 'rgba(255,255,255,0.9)',
  handle: [['0', '#C5C9CC'], ['0.5', '#EEF0F1'], ['1', '#8D9296']],
}

const SHAPES = {
  poele: { cx: 150, rimY: 172, rx: 112, ry: 23, depth: 42, taper: 21, handle: { length: 130, angle: -9 } },
  crepiere: { cx: 150, rimY: 190, rx: 120, ry: 25, depth: 18, taper: 8, handle: { length: 124, angle: -7 } },
  casserole: { cx: 140, rimY: 120, rx: 86, ry: 20, depth: 100, taper: 3, handle: { length: 158, angle: -13 } },
  sauteuse: { cx: 150, rimY: 142, rx: 106, ry: 22, depth: 72, taper: 3, handle: { length: 130, angle: -8 }, helper: true },
  wok: { cx: 158, rimY: 150, rx: 114, ry: 24, depth: 62, bowl: 48, handle: { length: 122, angle: -12 }, helper: true },
  faitout: { cx: 200, rimY: 116, rx: 112, ry: 22, depth: 106, taper: 2, sideHandles: true, lid: true },
}

function Stops({ stops }) {
  return stops.map(([offset, color]) => <stop key={offset} offset={offset} stopColor={color} />)
}

export default function CookwareArt({ shape = 'poele', className = '', title }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const id = (name) => `${name}-${uid}`

  const s = SHAPES[shape] || SHAPES.poele
  const f = FINISH
  const bottomY = s.rimY + s.depth
  const rx2 = s.bowl ?? s.rx - s.taper
  const ry2 = s.ry * 0.86

  const body = s.bowl
    ? `M${s.cx - s.rx},${s.rimY} C${s.cx - s.rx + 14},${bottomY - 8} ${s.cx - rx2 - 30},${bottomY} ${s.cx - rx2},${bottomY}
       A${rx2} ${ry2 * 0.6} 0 0 0 ${s.cx + rx2},${bottomY}
       C${s.cx + rx2 + 30},${bottomY} ${s.cx + s.rx - 14},${bottomY - 8} ${s.cx + s.rx},${s.rimY}
       A${s.rx} ${s.ry} 0 0 1 ${s.cx - s.rx},${s.rimY} Z`
    : `M${s.cx - s.rx},${s.rimY} L${s.cx - rx2},${bottomY} A${rx2} ${ry2} 0 0 0 ${s.cx + rx2},${bottomY}
       L${s.cx + s.rx},${s.rimY} A${s.rx} ${s.ry} 0 0 1 ${s.cx - s.rx},${s.rimY} Z`

  const shadowY = bottomY + (s.bowl ? ry2 * 0.6 : ry2) + 2

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={id('body')} x1="0" x2="1" y1="0" y2="0">
          <Stops stops={f.body} />
        </linearGradient>
        <linearGradient id={id('handle')} x1="0" x2="0" y1="0" y2="1">
          <Stops stops={f.handle} />
        </linearGradient>
        <radialGradient id={id('inside')} cx="0.5" cy="0.7" r="0.7">
          <stop offset="0" stopColor={f.inside[1]} />
          <stop offset="1" stopColor={f.inside[0]} />
        </radialGradient>
        <filter id={id('blur')} x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      <ellipse cx={s.cx + 6} cy={shadowY} rx={s.rx * 0.92} ry="9" fill="rgba(20,18,16,0.28)" filter={`url(#${id('blur')})`} />

      {s.handle && <LongHandle s={s} fill={`url(#${id('handle')})`} />}
      {s.helper && <HelperHandle s={s} fill={`url(#${id('handle')})`} />}
      {s.sideHandles && <SideHandles s={s} fill={`url(#${id('handle')})`} />}

      <path d={body} fill={`url(#${id('body')})`} />

      {s.lid ? (
        <Lid s={s} body={`url(#${id('body')})`} lip={f.lip} handle={`url(#${id('handle')})`} />
      ) : (
        <>
          <ellipse cx={s.cx} cy={s.rimY} rx={s.rx} ry={s.ry} fill={`url(#${id('inside')})`} />
          <ellipse cx={s.cx} cy={s.rimY} rx={s.rx - 1} ry={s.ry - 0.5} fill="none" stroke={f.lip} strokeWidth="1.6" />
        </>
      )}

      {s.handle && (
        <g fill={f.lip} opacity="0.7">
          <circle cx={s.cx + s.rx - 16} cy={s.rimY + 12} r="2.6" />
          <circle cx={s.cx + s.rx - 15} cy={s.rimY + 24} r="2.6" />
        </g>
      )}
    </svg>
  )
}

function LongHandle({ s, fill }) {
  const { length, angle } = s.handle
  const x = s.cx + s.rx - 10
  const y = s.rimY + 8
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path d={`M0,-9 L${length - 14},-8 Q${length},-8 ${length},0 Q${length},8 ${length - 14},8 L0,9 Z`} fill={fill} />
      <circle cx={length - 16} cy="0" r="3.4" fill="rgba(0,0,0,0.25)" />
    </g>
  )
}

function HelperHandle({ s, fill }) {
  const x = s.cx - s.rx + 4
  const y = s.rimY + 10
  return <path d={`M${x},${y - 6} C${x - 30},${y - 10} ${x - 34},${y + 14} ${x},${y + 10} L${x},${y + 4} C${x - 22},${y + 6} ${x - 20},${y - 4} ${x},${y} Z`} fill={fill} />
}

function SideHandles({ s, fill }) {
  const y = s.rimY + 14
  const left = s.cx - s.rx + 2
  const right = s.cx + s.rx - 2
  return (
    <g fill={fill}>
      <path d={`M${left},${y - 7} C${left - 40},${y - 12} ${left - 44},${y + 16} ${left},${y + 12} L${left},${y + 5} C${left - 28},${y + 8} ${left - 26},${y - 4} ${left},${y} Z`} />
      <path d={`M${right},${y - 7} C${right + 40},${y - 12} ${right + 44},${y + 16} ${right},${y + 12} L${right},${y + 5} C${right + 28},${y + 8} ${right + 26},${y - 4} ${right},${y} Z`} />
    </g>
  )
}

function Lid({ s, body, lip, handle }) {
  const top = s.rimY - s.ry * 2.6
  return (
    <g>
      <path d={`M${s.cx - s.rx + 2},${s.rimY} C${s.cx - s.rx + 10},${top} ${s.cx + s.rx - 10},${top} ${s.cx + s.rx - 2},${s.rimY} A${s.rx - 2} ${s.ry} 0 0 1 ${s.cx - s.rx + 2},${s.rimY} Z`} fill={body} />
      <path d={`M${s.cx - s.rx + 2},${s.rimY} A${s.rx - 2} ${s.ry} 0 0 0 ${s.cx + s.rx - 2},${s.rimY}`} fill="none" stroke={lip} strokeWidth="1.6" />
      <path d={`M${s.cx - 24},${top + 18} C${s.cx - 26},${top - 6} ${s.cx + 26},${top - 6} ${s.cx + 24},${top + 18} L${s.cx + 14},${top + 18} C${s.cx + 14},${top + 6} ${s.cx - 14},${top + 6} ${s.cx - 14},${top + 18} Z`} fill={handle} />
    </g>
  )
}
