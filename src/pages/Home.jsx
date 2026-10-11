import { Link } from 'react-router'
import { Seo } from '@/lib/head'
import IntroSequence from '@/components/home/IntroSequence'
import CollectionMenu from '@/components/home/CollectionMenu'
import HorizontalGallery from '@/components/home/HorizontalGallery'
import DropletsSection from '@/components/home/DropletsSection'
import RevealText from '@/components/motion/RevealText'
import ScrubWords from '@/components/motion/ScrubWords'
import Parallax from '@/components/motion/Parallax'
import CountUp from '@/components/motion/CountUp'
import { ArrowRight, Flame, Forever, Hand, Layers } from '@/components/Icons'
import { Ornament, Tricolore } from '@/components/Logo'
import { promises, site } from '@/data/site'
import { inoxFacts } from '@/data/products'

const PILLARS = [
  { icon: Layers, title: 'La matière avant tout', text: "Un seul matériau : l'inox 3 plis. Aucun revêtement qui s'use ou s'écaille." },
  { icon: Flame, title: 'Pensées pour le feu', text: "Un cœur d'aluminium qui répartit la chaleur jusqu'aux bords. Tous feux, four compris." },
  { icon: Hand, title: 'Faites pour la main', text: 'Poignées rivetées en finition cuivre, équilibrées, qui restent en main des années.' },
  { icon: Forever, title: 'Pour toute une vie', text: "L'inox ne rouille pas et ne s'use pas. Une pièce Silkura se transmet." },
]

export default function Home() {
  return (
    <>
      <Seo
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: site.name,
          url: site.url,
          logo: `${site.url}/apple-touch-icon.png`,
          email: site.email,
          sameAs: [site.instagram],
        }}
      />

      {/* 1. Le faitout s'ouvre au défilement */}
      <IntroSequence />

      {/* 2. Le menu : les familles de pièces */}
      <CollectionMenu />

      {/* 3. Engagements */}
      <section aria-label="Nos engagements" className="border-b border-line bg-paper py-5">
        <div className="marquee text-[0.8125rem] tracking-[0.16em] text-ink uppercase">
          {[0, 1].map((copy) => (
            <ul key={copy} className="marquee-track" aria-hidden={copy === 1 ? true : undefined}>
              {promises.map((p) => (
                <li key={p} className="flex items-center gap-3.5 whitespace-nowrap">
                  <span className="h-1 w-1 rounded-full bg-copper" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* 4. Manifeste : les mots s'allument au fil de la lecture */}
      <section className="bg-paper">
        <div className="wrap py-28 md:py-40">
          <p className="eyebrow text-copper-deep">Notre parti pris</p>
          <ScrubWords
            text="Une cuisine n'a pas besoin de vingt casseroles. Elle a besoin de quelques pièces justes, qui chauffent bien et ne s'abîment jamais. C'est tout ce que nous faisons."
            className="mt-8 max-w-5xl font-display text-[clamp(2rem,4.4vw,4.1rem)] leading-[1.12] tracking-[-0.01em] text-ink"
          />
          <ul className="mt-20 grid gap-x-10 gap-y-12 border-t border-line pt-12 sm:grid-cols-2 md:mt-28 lg:grid-cols-4">
            {PILLARS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} data-reveal={i * 90}>
                <Icon className="h-7 w-7 text-copper-deep" />
                <h3 className="mt-6 font-display text-[1.6rem] leading-tight">{title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Les pièces, en défilement horizontal */}
      <HorizontalGallery />

      {/* 6. Le test de la goutte d'eau */}
      <DropletsSection />

      {/* 7. La matière, en chiffres */}
      <section className="bg-paper-2">
        <div className="wrap py-28 md:py-36">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow text-copper-deep">La matière</p>
              <RevealText text={"Pourquoi\nl'inox 3 plis."} className="display-lg mt-5" />
            </div>
            <p className="lede self-end text-ink-2 lg:col-span-5 lg:col-start-8" data-reveal="">
              Le matériau des cuisines professionnelles. Il ne rouille pas, ne réagit pas aux aliments, ne garde pas les odeurs. Avec un
              cœur d'aluminium, il chauffe vite et partout.
            </p>
          </div>
          <dl className="mt-16 grid gap-px overflow-hidden rounded-[2px] bg-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
            {inoxFacts.map(({ value, unit, text }, i) => (
              <div key={value} data-reveal={i * 90} className="bg-paper p-8 md:p-10">
                <dt className="flex items-baseline gap-3 text-ink">
                  <CountUp value={value} className="font-display text-[clamp(3.2rem,5vw,4.8rem)] leading-none" />
                  {unit && <span className="font-display text-[1.6rem] leading-none text-copper-deep">{unit}</span>}
                </dt>
                <dd className="mt-5 text-[0.9375rem] leading-relaxed text-ink-2">{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 8. Le détail */}
      <section className="bg-paper">
        <div className="wrap grid items-center gap-12 py-28 md:py-36 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Parallax
              src={site.media.detail}
              alt="Rivets cuivrés d'une poignée Silkura et couvercle gravé au nom de la marque"
              ratio="16 / 10"
              sizes="(min-width: 1024px) 58vw, 100vw"
              reveal
              className="rounded-[2px]"
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Ornament className="text-copper-deep" />
            <RevealText text="Le détail, partout." className="display-lg mt-6" />
            <p className="lede mt-6 text-ink-2" data-reveal="80">
              Poignées rivetées en finition cuivre, couvercles gravés à notre nom, poli miroir à l'intérieur. Des détails qu'on remarque à
              peine, et qu'on ne quitte plus.
            </p>
            <Link to="/savoir-faire" className="btn btn-ghost mt-10" data-reveal="140">
              Notre savoir-faire <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. L'écrin */}
      <section data-header="dark" className="grain relative bg-night text-on-night">
        <div className="relative z-[2] grid lg:grid-cols-2">
          <Parallax
            src={site.media.packaging}
            alt="Le coffret Silkura bleu nuit, logo argenté et mention Made in France"
            className="min-h-[24rem] lg:min-h-[44rem]"
            speed={16}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="flex items-center px-[clamp(20px,6vw,96px)] py-20 lg:py-28">
            <div className="max-w-lg">
              <Ornament className="text-copper-light" />
              <RevealText text="Livrée dans son écrin." className="display-lg mt-6 text-on-night" />
              <p className="lede mt-6 text-on-night-muted" data-reveal="80">
                Chaque pièce arrive dans un coffret bleu nuit, logo argenté, calée sans plastique. Prête à être offerte, ou à être gardée.
              </p>
              <ul className="mt-10 space-y-4 border-t border-on-night/15 pt-8 text-[0.9375rem] text-on-night" data-reveal="140">
                <li className="flex items-center gap-4">
                  <Tricolore /> Fabriqué en France
                </li>
                <li className="flex items-center gap-4">
                  <span className="h-px w-9 bg-copper-light" aria-hidden="true" /> Carton recyclé, aucun plastique
                </li>
                <li className="flex items-center gap-4">
                  <span className="h-px w-9 bg-copper-light" aria-hidden="true" /> Message personnalisé sur demande
                </li>
              </ul>
              <Link to="/produit/coffret-essentiel" className="btn btn-light mt-10" data-reveal="200">
                Le coffret de l'essentiel <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Appel final */}
      <section className="bg-paper">
        <div className="wrap flex flex-col items-center py-32 text-center md:py-44">
          <p className="eyebrow text-copper-deep">Silkura</p>
          <RevealText text={'Faites-vous une cuisine\npour la vie.'} className="display-xl mt-6" />
          <div className="mt-12 flex flex-wrap justify-center gap-3" data-reveal="120">
            <Link to="/collection" className="btn btn-primary">
              Découvrir la collection <ArrowRight />
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Nous écrire
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
