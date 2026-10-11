import { Link } from 'react-router'
import { Seo } from '@/lib/head'
import { commerce, site } from '@/data/site'

/* ============================================================
   Pages légales — MODÈLES À COMPLÉTER.
   Les passages entre crochets surlignés (<Todo>) sont à remplir avec les informations
   de la société, puis à faire relire. `npm run check` signale ceux qui restent.
   ============================================================ */

function Todo({ children }) {
  return <mark className="rounded-[2px] bg-clay px-1 text-ink">[À COMPLÉTER : {children}]</mark>
}

function LegalPage({ title, description, updated, children }) {
  return (
    <>
      <Seo title={title} description={description} />
      <article className="wrap pt-14 pb-28 md:pt-24 md:pb-36">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow rise text-copper-deep">Informations légales</p>
          <h1 className="display-lg rise rise-1 mt-5">{title}</h1>
          <p className="rise rise-2 mt-5 text-sm text-muted">Dernière mise à jour : {updated}</p>
          <div className="prose-silkura rise rise-3 mt-12 text-ink-2">{children}</div>
        </div>
      </article>
    </>
  )
}

export function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales" description="Mentions légales du site Silkura : éditeur, hébergeur, propriété intellectuelle." updated="octobre 2026">
      <h2>Éditeur du site</h2>
      <p>
        Le site {site.url.replace('https://', '')} est édité par <Todo>raison sociale</Todo>, <Todo>forme juridique (SAS, SARL, EI…)</Todo> au
        capital de <Todo>montant</Todo> €, immatriculée au RCS de <Todo>ville</Todo> sous le numéro <Todo>SIREN</Todo>, dont le siège social
        est situé <Todo>adresse complète</Todo>.
      </p>
      <p>
        Numéro de TVA intracommunautaire : <Todo>numéro de TVA</Todo>.
        <br />
        Directeur de la publication : <Todo>prénom et nom</Todo>.
        <br />
        Contact : <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par Netlify, Inc., 101 2nd Street, Suite 200, San Francisco, CA 94105, États-Unis (
        <Todo>adresse à vérifier sur netlify.com</Todo>), www.netlify.com.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus de ce site (textes, photographies, illustrations, logos, marque) est la propriété exclusive de Silkura ou de
        ses partenaires. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est
        interdite.
      </p>

      <h2>Crédits</h2>
      <p>
        Photographies : <Todo>nom du ou de la photographe</Todo>. Conception et développement du site : <Todo>crédit</Todo>.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement de vos données est décrit dans notre <Link to="/confidentialite">politique de confidentialité</Link>.
      </p>
    </LegalPage>
  )
}

export function Cgv() {
  return (
    <LegalPage title="Conditions générales de vente" description="Conditions générales de vente des ustensiles Silkura : commande, prix, livraison, rétractation, garanties." updated="octobre 2026">
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions régissent les ventes conclues entre <Todo>raison sociale</Todo> (« Silkura ») et toute personne physique
        agissant en qualité de consommateur (« le client ») sur le site {site.url.replace('https://', '')}. Toute commande implique leur
        acceptation sans réserve.
      </p>

      <h2>2. Produits</h2>
      <p>
        Les caractéristiques essentielles des produits sont présentées sur chaque fiche. Les photographies sont aussi fidèles que possible ;
        de légères variations de teinte, propres aux matériaux et aux finitions, peuvent exister.
      </p>

      <h2>3. Prix</h2>
      <p>
        Les prix sont indiqués en euros, toutes taxes comprises, hors frais de livraison. Les frais de livraison sont précisés avant la
        validation de la commande ; la livraison est offerte dès {commerce.freeShippingFrom} € d'achat en France métropolitaine. Silkura se
        réserve le droit de modifier ses prix à tout moment ; le prix facturé est celui affiché au moment de la commande.
      </p>

      <h2>4. Commande et paiement</h2>
      <p>
        La commande est ferme après confirmation du paiement. Le paiement s'effectue par <Todo>moyens de paiement acceptés et prestataire
        (Stripe, Shopify Payments…)</Todo>. Les données bancaires sont traitées exclusivement par ce prestataire et ne sont jamais conservées par
        Silkura. Une confirmation de commande est adressée par e-mail.
      </p>

      <h2>5. Livraison</h2>
      <p>
        Les commandes sont expédiées sous {commerce.shippingDelay} et livrées en {commerce.deliveryTime} en France métropolitaine, à l'adresse
        indiquée lors de la commande. <Todo>transporteurs et zones de livraison</Todo>. En cas de colis endommagé, le client émet des réserves
        auprès du transporteur et en informe Silkura sous 48 heures.
      </p>

      <h2>6. Droit de rétractation</h2>
      <p>
        Conformément à l'article L221-18 du Code de la consommation, le client dispose d'un délai de 14 jours à compter de la réception des
        produits pour exercer son droit de rétractation, sans avoir à se justifier. Silkura étend ce délai à {commerce.returnDays} jours.
      </p>
      <p>
        Le client notifie sa décision par e-mail à <a href={`mailto:${site.email}`}>{site.email}</a>, puis retourne les produits non utilisés,
        dans leur emballage d'origine, sous 14 jours. Les frais de retour sont à la charge du client <Todo>ou offerts : à préciser</Todo>.
        Silkura rembourse la totalité des sommes versées, y compris les frais de livraison initiaux, dans un délai de 14 jours à compter de la
        réception des produits retournés, par le même moyen de paiement.
      </p>

      <h2>7. Garanties légales</h2>
      <p>
        Les produits bénéficient de la garantie légale de conformité (articles L217-3 et suivants du Code de la consommation) pendant deux ans
        à compter de la livraison, et de la garantie des vices cachés (articles 1641 et suivants du Code civil).
      </p>
      <h3>Garantie commerciale à vie</h3>
      <p>
        En complément, Silkura garantit à vie ses pièces contre les défauts de fabrication (déformation du fond, rupture d'un rivet,
        délaminage des couches). Sont exclus l'usure normale, les rayures, les chocs, les chutes et l'utilisation non conforme aux conseils
        d'entretien.{' '}
        <Todo>modalités de mise en œuvre</Todo>
      </p>

      <h2>8. Médiation</h2>
      <p>
        En cas de litige, le client peut recourir gratuitement au médiateur de la consommation : <Todo>nom et coordonnées du médiateur
        (adhésion obligatoire)</Todo>. Il peut également utiliser la plateforme européenne de règlement en ligne des litiges.
      </p>

      <h2>9. Droit applicable</h2>
      <p>Les présentes conditions sont soumises au droit français.</p>
    </LegalPage>
  )
}

export function Confidentialite() {
  return (
    <LegalPage title="Politique de confidentialité" description="Comment Silkura collecte, utilise et protège vos données personnelles." updated="octobre 2026">
      <h2>Qui est responsable de vos données ?</h2>
      <p>
        <Todo>raison sociale, adresse</Todo>, joignable à <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Quelles données, pour quoi faire ?</h2>
      <ul>
        <li>
          <strong>Formulaire de contact</strong> : nom, adresse e-mail, message. Pour vous répondre (intérêt légitime). Conservées 3 ans après
          notre dernier échange.
        </li>
        <li>
          <strong>Lettre d'information</strong> : adresse e-mail. Pour vous envoyer nos nouvelles (consentement). Conservée jusqu'à votre
          désinscription, possible à tout moment par un lien dans chaque envoi ou par e-mail.
        </li>
        <li>
          <strong>Commandes</strong> : identité, adresses, e-mail, téléphone, détail de la commande. Pour exécuter le contrat et respecter nos
          obligations comptables (10 ans pour les pièces comptables).
        </li>
      </ul>

      <h2>Qui y a accès ?</h2>
      <p>
        Uniquement Silkura et ses prestataires techniques, dans la limite de leur mission : Netlify (hébergement du site et réception des
        formulaires), <Todo>prestataire de paiement, transporteur, outil d'e-mailing</Todo>. Certains sont situés hors de l'Union européenne ;
        les transferts sont encadrés par les clauses contractuelles types de la Commission européenne ou le cadre de protection des données
        UE–États-Unis. Vos données ne sont jamais vendues.
      </p>

      <h2>Cookies</h2>
      <p>
        Ce site ne dépose aucun cookie publicitaire ni de mesure d'audience. Aucun bandeau de consentement n'est donc nécessaire. Si cela
        change, cette page et le site seront mis à jour, et votre accord vous sera demandé.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez accéder à vos données, les rectifier, les effacer, en limiter le traitement, vous y opposer ou en demander la portabilité
        en écrivant à <a href={`mailto:${site.email}`}>{site.email}</a>. Si vous estimez que vos droits ne sont pas respectés, vous pouvez
        adresser une réclamation à la CNIL (www.cnil.fr).
      </p>
    </LegalPage>
  )
}
