-- Minimal schema to run app
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  created_at timestamp with time zone default now()
);

create table if not exists assets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  kind text, -- image|video|audio|srt
  url text,
  meta jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);

create table if not exists credits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  balance int default 0,
  updated_at timestamp with time zone default now()
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  type text, -- add|consume
  amount int,
  meta jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);

-- Optional feature tables
create table if not exists voices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  provider text,
  provider_ref text,
  name text,
  meta jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);

create table if not exists characters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  name text,
  anchors jsonb default '[]'::jsonb,
  meta jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);
