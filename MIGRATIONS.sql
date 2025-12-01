-- Base schema for Mintora
-- Run this FIRST.
-- Note: Supabase usually has pgcrypto enabled; this ensures gen_random_uuid() exists.
create extension if not exists pgcrypto;

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  title text,
  short_description text,
  long_description text,
  image_url text,
  video_url text,
  price_cents integer,
  currency text,
  asset_type text,
  tags text[],
  quality text,
  resolution text,
  duration_sec integer,
  variant_key text,
  created_at timestamptz default now()
);

create table if not exists marketplace (
  id uuid primary key default gen_random_uuid(),
  title text,
  price_cents integer,
  currency text,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists product_bundles (
  id uuid primary key default gen_random_uuid(),
  title text,
  items jsonb,
  created_at timestamptz default now()
);

create table if not exists studio_prompts (
  id uuid primary key default gen_random_uuid(),
  email text,
  title text,
  prompt text,
  created_at timestamptz default now()
);

create table if not exists studio_assets (
  id uuid primary key default gen_random_uuid(),
  email text,
  url text,
  meta jsonb,
  created_at timestamptz default now()
);
