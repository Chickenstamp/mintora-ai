-- Upgrade pack schema for Mintora (queue, branding, portal, magic)
-- Run this SECOND.
create extension if not exists pgcrypto;

create table if not exists gen_jobs (
  id uuid primary key default gen_random_uuid(),
  email text,
  kind text not null,          -- 'image' | 'video' | 'copy' etc.
  payload jsonb,               -- inputs (prompt, duration, resolution, currency)
  status text not null default 'queued',  -- queued | running | finishing | succeeded | failed
  progress integer default 0,  -- 0-100
  message text,
  created_at timestamptz default now(),
  updated_at timestamptz
);

create table if not exists brand_profiles (
  id uuid primary key default gen_random_uuid(),
  email text not null,         -- owner
  brand_name text not null,
  primary_color text,          -- e.g. #111111
  secondary_color text,        -- e.g. #ff00ff
  font text,                   -- e.g. Inter
  voice text,                  -- brand writing tone/notes
  created_at timestamptz default now()
);

create table if not exists user_assets (
  id uuid primary key default gen_random_uuid(),
  email text not null,         -- owner
  asset_type text not null,    -- image | video | export | doc | etc.
  url text not null,           -- public storage URL
  meta jsonb,                  -- { prompt, resolution, preset, ... }
  created_at timestamptz default now()
);

create table if not exists magic_orders (
  id uuid primary key default gen_random_uuid(),
  email text,                  -- requester (nullable for guests)
  brief text not null,         -- the high-level request
  currency text default 'USD',
  plan jsonb,                  -- generated plan bundle
  created_at timestamptz default now()
);
