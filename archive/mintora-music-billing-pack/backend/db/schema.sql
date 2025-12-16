-- Mintora Music Billing + Credits schema (Supabase/Postgres)

create table if not exists public.user_music_state (
  user_id uuid primary key,
  has_music_pro boolean not null default false,
  balance integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.user_music_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  delta integer not null,
  reason text not null,
  stripe_ref text,
  created_at timestamptz not null default now()
);

create index if not exists idx_user_music_events_user on public.user_music_events(user_id);
