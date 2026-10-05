-- Schéma Venus — collecte d'avis clients assistée par IA
-- À exécuter dans l'éditeur SQL Supabase (ou via `supabase db push`)

create extension if not exists "pgcrypto";

-- Une entreprise cliente de Venus (ex: Finest Lash Studio)
create table entreprises (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  slug text unique not null,
  nom text not null,
  logo_url text,
  couleur_primaire text not null default '#111111',
  google_review_url text,
  email_contact text not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  statut text not null default 'actif' check (statut in ('en_attente_paiement', 'actif', 'suspendu')),
  -- note interne (1-5) à partir de laquelle on oriente vers Google plutôt que vers le feedback privé
  seuil_note_positive integer not null default 4,
  created_at timestamptz not null default now()
);

-- Questions configurées par chaque entreprise (5 génériques pré-remplies à la création)
create table questions (
  id uuid primary key default gen_random_uuid(),
  entreprise_id uuid not null references entreprises (id) on delete cascade,
  ordre integer not null,
  texte text not null,
  type text not null check (type in ('choix_unique', 'choix_multiple', 'texte_libre', 'note')),
  options jsonb,
  created_at timestamptz not null default now(),
  unique (entreprise_id, ordre)
);

-- Une session de questionnaire remplie par un client final
create table avis_sessions (
  id uuid primary key default gen_random_uuid(),
  entreprise_id uuid not null references entreprises (id) on delete cascade,
  langue text not null default 'fr',
  reponses jsonb not null default '{}'::jsonb,
  note_interne integer check (note_interne between 1 and 5),
  avis_genere text,
  avis_final text,
  statut text not null default 'en_cours'
    check (statut in ('en_cours', 'avis_genere', 'copie_google', 'feedback_prive', 'abandonne')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Feedback privé des clients insatisfaits (note interne < seuil_note_positive)
-- Jamais publié publiquement, envoyé uniquement à l'entreprise.
create table feedback_prive (
  id uuid primary key default gen_random_uuid(),
  avis_session_id uuid not null references avis_sessions (id) on delete cascade,
  entreprise_id uuid not null references entreprises (id) on delete cascade,
  message text not null,
  lu boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_questions_entreprise on questions (entreprise_id, ordre);
create index idx_avis_sessions_entreprise on avis_sessions (entreprise_id, created_at desc);
create index idx_feedback_entreprise on feedback_prive (entreprise_id, lu);

-- Row Level Security : toutes les écritures publiques (questionnaire client) passent
-- par la clé service_role côté serveur (API routes), jamais par le client.
-- Les entreprises authentifiées ne voient que leurs propres données.
alter table entreprises enable row level security;
alter table questions enable row level security;
alter table avis_sessions enable row level security;
alter table feedback_prive enable row level security;

create policy "entreprise_lit_ses_donnees" on entreprises
  for select using (auth.uid() = user_id);

create policy "entreprise_modifie_ses_donnees" on entreprises
  for update using (auth.uid() = user_id);

create policy "entreprise_lit_ses_questions" on questions
  for select using (
    entreprise_id in (select id from entreprises where user_id = auth.uid())
  );

create policy "entreprise_modifie_ses_questions" on questions
  for all using (
    entreprise_id in (select id from entreprises where user_id = auth.uid())
  );

create policy "entreprise_lit_ses_avis" on avis_sessions
  for select using (
    entreprise_id in (select id from entreprises where user_id = auth.uid())
  );

create policy "entreprise_lit_son_feedback" on feedback_prive
  for select using (
    entreprise_id in (select id from entreprises where user_id = auth.uid())
  );
