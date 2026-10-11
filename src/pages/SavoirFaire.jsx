import { Link } from 'react-router'
import { Seo } from '@/lib/head'
import PageHeader from '@/components/PageHeader'
import Media from '@/components/Media'
import { ArrowRight } from '@/components/Icons'
import { site } from '@/data/site'
import { Ornament, Tricolore } from '@/components/Logo'

/* ⚠ Textes provisoires : l'histoire, les lieux et les étapes de fabrication sont à réécrire
   avec le fondateur (qui, où, comment, pourquoi). */

const STEPS = [
  {
    title: 'Le dessin',
    text: "Chaque pièce part d'un geste de cuisine : saisir, verser, remuer. Nous dessinons la forme autour de ce geste, puis nous la testons des semaines en conditions réelles avant de la valider.",
  },
  {
    title: 'La matière',
    text: "Un seul matériau : l'inox 3 plis. Un cœur d'aluminium qui conduit la chaleur, pris entre deux couches d'inox qui ne bougent pas. Des épaisseurs choisies pour que la chaleur se répartisse sans point chaud.",
  },
  {
    title: 'La mise en forme',
    text: "Emboutissage, rivetage, polissage miroir à l'intérieur, satiné à l'extérieur. Les queues sont rivetées et non soudées : c'est plus long à fabriquer, mais rien ne se desserre avec les années.",
  },
  {
    title: 'Le contrôle',
    text: "Planéité du fond, tenue des rivets, finition des bords : chaque pièce est vérifiée à la main avant de partir. Celles qui ne passent pas ne partent pas.",
  },
]

const COMMITMENTS = [
  ['Sans revêtement', "Pas de PTFE, pas de PFAS, rien qui s'écaille. La surface de cuisson, c'est le métal lui-même."],
  ['Inaltérable', "L'inox ne rouille pas, ne s'écaille pas, ne garde pas les odeurs. Une pièce ternie ou brûlée retrouve son éclat en quelques minutes."],
  ['Garantie à vie', "Le corps de chaque pièce est garanti à vie contre les défauts de fabrication. Parce que nous savons qu'il tiendra."],
  ['Emballage sobre', "Carton recyclé, calage papier, aucun plastique. Juste ce qu'il faut pour que la pièce arrive intacte."],
]

export default function SavoirFaire() {
  return (
    <>
      <Seo
        title="Savoir-faire"
        description="Comment Silkura conçoit et fabrique ses poêles, casseroles et faitouts : le choix de la matière, la mise en forme, le contrôle, et nos engagements de durabilité."
      />
      <PageHeader
        eyebrow="Savoir-faire"
        title="Des pièces faites pour ne jamais être remplacées."
        intro="Silkura est née d'une frustration simple : des poêles qui ne tiennent pas trois ans. Nous avons pris le problème à l'envers, en partant de la matière, et en fabriquant en France."
      >
        <p className="eyebrow flex items-center gap-4 text-muted">
          <Tricolore /> Fabriqué en France
        </p>
      </PageHeader>

      <section className="wrap pb-24 md:pb-32">
        <Media src={site.media.atelier} alt="Mains d'artisan polissant une poêle Silkura en inox à l'atelier" shape="sauteuse" tone="stone" ratio="16 / 7" priority sizes="100vw" artClassName="w-[52%] max-w-[640px]" className="rise rise-3 rounded-[2px] max-md:!aspect-[4/3]" />
      </section>

      <section className="wrap pb-24 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p data-reveal="" className="eyebrow text-copper-deep">La fabrication</p>
              <h2 data-reveal="80" className="display-lg mt-4">En quatre temps.</h2>
            </div>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {STEPS.map((step, i) => (
              <li key={step.title} data-reveal="" className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line py-10 md:grid-cols-[6rem_1fr] md:py-12">
                <span className="font-display text-3xl leading-none text-copper-deep md:text-5xl">0{i + 1}</span>
                <div>
                  <h3 className="display-sm">{step.title}</h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-ink-2">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line bg-paper-2">
        <div className="wrap grid items-center gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal="">
            <Media
              src={site.media.detail}
              alt="Rivets cuivrés d'une poignée Silkura et couvercle gravé au nom de la marque"
              shape="poele"
              tone="stone"
              ratio="16 / 10"
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="rounded-[2px]"
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Ornament className="text-copper-deep" />
            <h2 data-reveal="" className="display-lg mt-6">Le détail, partout.</h2>
            <p data-reveal="80" className="lede mt-6 text-ink-2">
              Des poignées rivetées en finition cuivre rosé, des couvercles gravés à notre nom, un poli miroir à l'intérieur. Des
              détails qu'on remarque à peine, et qu'on ne quitte plus.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-night text-on-night">
        <div className="wrap py-24 md:py-32">
          <p data-reveal="" className="eyebrow text-copper">Nos engagements</p>
          <h2 data-reveal="80" className="display-lg mt-4 max-w-3xl text-on-night">
            Durable, au sens premier du mot.
          </h2>
          <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {COMMITMENTS.map(([title, text], i) => (
              <li key={title} data-reveal={i * 90} className="border-t border-on-night/20 pt-6">
                <h3 className="font-display text-[1.75rem] leading-tight text-on-night">{title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-on-night-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap py-24 text-center md:py-32">
        <h2 data-reveal="" className="display-lg mx-auto max-w-3xl">
          La meilleure façon de comprendre, c'est de cuisiner avec.
        </h2>
        <Link data-reveal="100" to="/collection" className="btn btn-primary mt-10">
          Voir la collection <ArrowRight />
        </Link>
      </section>
    </>
  )
}
