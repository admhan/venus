# Starnote

Starnote aide les commerces de proximité à transformer leurs clients satisfaits en avis Google,
via un questionnaire guidé par IA. Chaque entreprise cliente a sa propre page
(`getstarnote.com/nom-entreprise`), créée automatiquement après paiement Stripe.

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript, Tailwind)
- [Supabase](https://supabase.com) — base de données Postgres + authentification
- [Stripe](https://stripe.com) — abonnement par établissement
- Gemini (`gemini-flash-lite-latest` par défaut) — génération des avis

## Démarrer en local

```bash
npm install
npm run dev
```

Sans configuration, l'app tourne en **mode démo** : la page `/finestlashstudio` fonctionne
avec des données factices (aucune base de données requise), ce qui permet de tester le
questionnaire et la génération d'avis immédiatement.

## Configuration complète

1. Copier `.env.example` vers `.env.local` et remplir les valeurs.
2. **Supabase** : créer un projet, puis exécuter [`supabase/schema.sql`](supabase/schema.sql)
   dans l'éditeur SQL du dashboard Supabase. Renseigner `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` et `SUPABASE_SERVICE_ROLE_KEY` (Project Settings > API).
   Activer l'envoi d'e-mails (Auth > Email Templates / SMTP) pour que la connexion par lien
   magique et les invitations après paiement fonctionnent.
3. **Gemini** : créer une clé API sur [aistudio.google.com](https://aistudio.google.com/apikey) et la
   renseigner dans `GEMINI_API_KEY`. Sans clé, les avis générés utilisent un gabarit de démo.
4. **Stripe** :
   - Créer un produit avec un prix récurrent mensuel et un prix récurrent annuel, copier leurs
     ID dans `STRIPE_PRICE_ID_MENSUEL` et `STRIPE_PRICE_ID_ANNUEL`.
   - Copier la clé secrète dans `STRIPE_SECRET_KEY`.
   - En local, utiliser le [Stripe CLI](https://stripe.com/docs/stripe-cli) :
     `stripe listen --forward-to localhost:3000/api/stripe/webhook` et copier le secret affiché
     dans `STRIPE_WEBHOOK_SECRET`. En production, créer un endpoint webhook Stripe pointant vers
     `https://votre-domaine/api/stripe/webhook` écoutant l'événement `checkout.session.completed`.
5. Renseigner `NEXT_PUBLIC_SITE_URL` avec l'URL publique du site (sans slash final).

## Parcours

- `/` — page vitrine qui vend le produit aux entreprises.
- `/inscription` → Stripe Checkout → le webhook crée automatiquement l'entreprise, ses 5
  questions génériques, et invite l'e-mail renseigné par lien magique.
- `/[slug]` — questionnaire public envoyé aux clients finaux (QR code, NFC ou lien).
- `/dashboard` — back-office de l'entreprise (questions, feedback privé, paramètres,
  QR code). Connexion par lien magique via `/connexion`.

## Déploiement (Vercel)

1. Pousser le repo sur GitHub (déjà fait : `admhan/venus`, à renommer si besoin).
2. Importer le projet sur [Vercel](https://vercel.com/new), renseigner les variables
   d'environnement de `.env.example`.
3. Ajouter le domaine de production dans `NEXT_PUBLIC_SITE_URL` et dans les URLs de succès/
   annulation Stripe (déjà dynamiques via cette variable).
4. Mettre à jour l'endpoint webhook Stripe avec l'URL de production.
