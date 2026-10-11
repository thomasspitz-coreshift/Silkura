import { Link } from 'react-router'
import { Seo } from '@/lib/head'
import PageHeader from '@/components/PageHeader'
import { Plus } from '@/components/Icons'
import { commerce } from '@/data/site'
import { formatPrice } from '@/data/products'

/* ⚠ Réponses provisoires sur la livraison, les retours et la garantie : à aligner avec les CGV. */
const GROUPS = [
  {
    title: 'Les pièces',
    items: [
      [
        "Vos ustensiles sont-ils compatibles avec l'induction ?",
        "Oui. La couche extérieure de nos pièces est en inox magnétique : elles fonctionnent sur tous les feux, induction, gaz, vitrocéramique, électrique, et au four jusqu'à 260 °C.",
      ],
      [
        'Y a-t-il un revêtement antiadhésif ?',
        "Non, et c'est volontaire. Nos pièces sont 100 % inox, sans PTFE ni PFAS : rien ne s'use, rien ne s'écaille. Bien préchauffé, l'inox n'attache pas.",
      ],
      [
        "Que veut dire « 3 plis » ?",
        "Trois couches de métal soudées sur toute la hauteur : de l'inox alimentaire 18/10 à l'intérieur, un cœur d'aluminium qui conduit la chaleur, et de l'inox magnétique à l'extérieur. Résultat : une chaleur rapide, homogène, jusqu'aux bords.",
      ],
      [
        'Ça attache, que faire ?',
        "Presque toujours une question de température : préchauffez la pièce à vide à feu moyen, faites le test de la goutte d'eau, puis ajoutez la matière grasse. Notre guide d'entretien détaille tout.",
      ],
      [
        'Passent-ils au lave-vaisselle ?',
        "Oui, toutes nos pièces passent au lave-vaisselle. Un lavage à la main garde simplement le brillant plus longtemps.",
      ],
      [
        "Ma poêle a des reflets bleutés, est-ce normal ?",
        "Oui, c'est l'effet de la chaleur sur l'inox, sans aucun danger. Un trait de vinaigre blanc les fait disparaître.",
      ],
    ],
  },
  {
    title: 'Commande et livraison',
    items: [
      [
        'Quels sont les délais de livraison ?',
        `Les commandes partent sous ${commerce.shippingDelay} et arrivent en ${commerce.deliveryTime} en France métropolitaine.`,
      ],
      ['Combien coûte la livraison ?', `Elle est offerte dès ${formatPrice(commerce.freeShippingFrom)} d'achat.`],
      ['Livrez-vous à l\'étranger ?', 'Nous livrons en France métropolitaine et en Belgique. Pour un autre pays, écrivez-nous.'],
      ['Puis-je offrir une pièce ?', "Oui : précisez-le dans votre message de commande, nous retirons la facture du colis et soignons l'emballage."],
    ],
  },
  {
    title: 'Retours et garantie',
    items: [
      [
        'Puis-je retourner une pièce ?',
        `Vous disposez de ${commerce.returnDays} jours après réception pour nous retourner une pièce non utilisée, dans son emballage d'origine. Nous vous remboursons sous 14 jours après réception du retour.`,
      ],
      [
        'Que couvre la garantie à vie ?',
        "Chaque pièce est garantie à vie contre les défauts de fabrication (déformation du fond, rivet qui cède, délaminage des couches). Les chocs, chutes et rayures d'usage ne sont pas couverts : écrivez-nous, nous trouverons une solution.",
      ],
      [
        'Vous vendez aux professionnels ?',
        'Oui, nous équipons des restaurants et des écoles de cuisine. Contactez-nous en choisissant « Professionnels » dans le formulaire.',
      ],
    ],
  },
]

export default function Faq() {
  return (
    <>
      <Seo
        title="Questions fréquentes"
        description="Induction, inox 3 plis, lave-vaisselle, livraison, retours, garantie : les réponses aux questions fréquentes sur les ustensiles en inox Silkura."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: GROUPS.flatMap((g) =>
            g.items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
          ),
        }}
      />
      <PageHeader eyebrow="Questions fréquentes" title="Tout ce que vous voulez savoir." />

      <div className="wrap pb-24 md:pb-32">
        {GROUPS.map((group) => (
          <section key={group.title} className="grid gap-6 border-t border-line py-12 lg:grid-cols-12 lg:py-16">
            <h2 data-reveal="" className="display-sm lg:col-span-4">
              {group.title}
            </h2>
            <div className="lg:col-span-8">
              {group.items.map(([q, a]) => (
                <details key={q} className="accordion border-b border-line first:border-t lg:first:border-t-0">
                  <summary className="flex items-center justify-between gap-6 py-5 text-[1.0625rem] text-ink">
                    {q}
                    <Plus className="chev h-4 w-4 shrink-0" />
                  </summary>
                  <p className="max-w-2xl pb-6 leading-relaxed text-ink-2">{a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-8 flex flex-col items-start justify-between gap-6 bg-paper-2 p-8 md:flex-row md:items-center md:p-12">
          <p className="display-sm max-w-lg">Vous ne trouvez pas votre réponse ?</p>
          <Link to="/contact" className="btn btn-primary">
            Nous écrire
          </Link>
        </div>
      </div>
    </>
  )
}
