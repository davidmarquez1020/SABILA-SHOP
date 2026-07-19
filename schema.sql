-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query)

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique not null,
  customer_name text,
  customer_email text,
  shipping_address jsonb,
  items jsonb not null,
  total numeric not null,
  status text not null default 'paid',
  created_at timestamptz not null default now()
);

-- The webhook writes with the service-role key, which bypasses RLS.
-- Enabling RLS here just makes sure no anonymous client key could ever read/write this table directly.
alter table orders enable row level security;
