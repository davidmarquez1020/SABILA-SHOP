-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query)
-- Adds stock tracking to the products table.

alter table products add column if not exists stock integer not null default 25;

-- Atomic decrement so concurrent webhook calls can't race each other into an
-- inconsistent count. Floors at 0 instead of going negative.
create or replace function decrement_product_stock(p_id text, p_qty int)
returns void
language sql
as $$
  update products set stock = greatest(stock - p_qty, 0) where id = p_id;
$$;
