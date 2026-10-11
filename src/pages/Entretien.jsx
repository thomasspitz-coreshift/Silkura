import { Link } from 'react-router'
import { Seo } from '@/lib/head'
import PageHeader from '@/components/PageHeader'
import Media from '@/components/Media'
import { site } from '@/data/site'

const SECTIONS = [
  {
    id: 'premiere-utilisation',
    title: 'Avant la première utilisation',
    steps: [
      "Retirer les étiquettes, puis laver à l'eau chaude savonneuse pour éliminer les résidus de polissage.",
      'Rincer, sécher avec un torchon propre. Votre pièce est prête.',
    ],
  },
  {
    id: 'cuisson',
    title: 'Cuire sans que ça attache',
    steps: [
      "Chauffer la pièce à vide, à feu moyen, pendant 2 à 3 minutes. Inutile de pousser au maximum : le cœur d'aluminium répartit la chaleur très efficacement.",
      "Faire le test de la goutte d'eau : si elle s'évapore aussitôt, attendre encore ; si elle roule sur elle-même comme une bille de mercure, la température est parfaite.",
      "Ajouter la matière grasse, la laisser chauffer quelques secondes, puis les aliments, sortis du réfrigérateur un peu à l'avance et bien secs.",
      "Ne pas les bouger : au début ils accrochent, puis se décollent d'eux-mêmes une fois dorés. C'est le signe qu'il est temps de les retourner.",
    ],
  },
  {
    id: 'nettoyage',
    title: 'Le nettoyage',
    steps: [
      "Laisser tiédir quelques minutes : un choc thermique (eau froide sur pièce brûlante) peut déformer le fond, même épais.",
      "Déglacer encore chaud avec un peu d'eau ou de vin : les sucs se décollent, et font une excellente sauce.",
      "Laver à l'eau chaude savonneuse avec une éponge non abrasive. Le lave-vaisselle est autorisé ; le lavage à la main garde le brillant plus longtemps.",
      'Sécher aussitôt avec un torchon pour éviter les traces de calcaire.',
    ],
  },
  {
    id: 'taches',
    title: 'Taches, reflets, brûlures',
    steps: [
      "Reflets bleutés ou arc-en-ciel : c'est l'effet de la chaleur, sans danger. Un trait de vinaigre blanc sur une éponge, et ils disparaissent.",
      "Traces blanches : du calcaire. Même remède, vinaigre blanc puis rinçage.",
      "Fond brûlé : couvrir d'eau, ajouter deux cuillères de bicarbonate, porter à ébullition 5 minutes, laisser tiédir, frotter.",
      "Pour retrouver l'éclat du neuf : une pâte de bicarbonate et d'eau, ou une poudre nettoyante spéciale inox, frottée dans le sens du polissage.",
    ],
  },
]

const AVOID = [
  'Les éponges métalliques et les poudres agressives sur la face polie',
  "Le sel versé dans l'eau froide : il peut piquer le fond. Salez l'eau une fois qu'elle bout",
  'Le feu maximal à vide pendant longtemps',
  "L'eau froide sur une pièce brûlante",
]

export default function Entretien() {
  return (
    <>
      <Seo
        title="Guide d'entretien de l'inox"
        description="Cuire sans que ça attache, test de la goutte d'eau, nettoyage, taches arc-en-ciel et fonds brûlés : le guide d'entretien complet des ustensiles en inox Silkura."
      />
      <PageHeader
        eyebrow="Guide d'entretien"
        title="Bien traité, l'inox dure toute une vie."
        intro="Pas de revêtement à ménager. Juste une bonne température et quelques bons réflexes."
      >
        <ul className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="btn btn-ghost !min-h-[2.75rem] !px-5 text-sm">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHeader>

      <section className="wrap pb-20 md:pb-28">
        <Media
          src={site.media.entretien}
          alt="Gouttes d'eau qui roulent sur une poêle en inox préchauffée"
          shape="poele"
          tone="stone"
          ratio="16 / 7"
          priority
          sizes="100vw"
          artClassName="w-[46%] max-w-[560px]"
          className="rise rise-4 rounded-[2px] max-md:!aspect-[4/3]"
        />
      </section>

      <section className="border-t border-line">
        <div className="wrap py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h2 className="display-lg">L'essentiel, en quatre temps.</h2>
                <p className="mt-5 max-w-sm leading-relaxed text-ink-2">
                  Une poêle en inox qui attache n'est jamais une poêle défectueuse : c'est presque toujours une question de température.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              {SECTIONS.map((section) => (
                <div key={section.id} id={section.id} data-reveal="" className="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0">
                  <h3 className="display-sm">{section.title}</h3>
                  <ol className="mt-6 space-y-4">
                    {section.steps.map((step, i) => (
                      <li key={step} className="grid grid-cols-[2.25rem_1fr] gap-3">
                        <span className="pt-0.5 text-sm font-medium text-copper-deep">{String(i + 1).padStart(2, '0')}</span>
                        <span className="leading-relaxed text-ink-2">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
              <div data-reveal="" className="mt-4 bg-paper-2 p-8">
                <p className="label">À éviter</p>
                <ul className="mt-4 space-y-2">
                  {AVOID.map((a) => (
                    <li key={a} className="flex gap-3 text-ink">
                      <span aria-hidden="true" className="text-copper">—</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-20 text-center md:py-28">
        <p data-reveal="" className="display-sm mx-auto max-w-xl">
          Une pièce qui vous donne du fil à retordre ? Envoyez-nous une photo, on vous dit quoi faire.
        </p>
        <Link data-reveal="100" to="/contact" className="btn btn-primary mt-8">
          Nous écrire
        </Link>
      </section>
    </>
  )
}
