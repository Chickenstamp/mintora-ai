-- Upgrade pack schema
create extension if not exists pgcrypto;

create table if not exists gen_jobs (
  id uuid primary key default gen_random_uuid(),
  email text,
  kind text not null,
  payload jsonb,
  status text not null default 'queued',
  progress integer default 0,
  message text,
  created_at timestamptz default now(),
  updated_at timestamptz
);

create table if not exists brand_profiles (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  brand_name text not null,
  primary_color text,
  secondary_color text,
  font text,
  voice text,
  created_at timestamptz default now()
);

create table if not exists user_assets (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  asset_type text not null,
  url text not null,
  meta jsonb,
  created_at timestamptz default now()
);

create table if not exists magic_orders (
  id uuid primary key default gen_random_uuid(),
  email text,
  brief text not null,
  currency text default 'USD',
  plan jsonb,
  created_at timestamptz default now()
);
