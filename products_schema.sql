-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query)
-- Adds the products catalog as a table, replacing shared/products.json.

create table if not exists products (
  id text primary key,
  name text not null,
  category text not null,
  price numeric not null,
  tag text,
  blurb text,
  note text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Only the service-role key (used server-side in Netlify Functions) reads/writes this
-- table, so RLS is enabled with no policies, same as `orders` in schema.sql.
alter table products enable row level security;

insert into products (id, name, category, price, tag, blurb, note) values
  ('gel-99', 'Pure Aloe Gel 99%', 'Skincare', 18, 'Bestseller', 'Cold-pressed straight from the leaf, no thickeners.', 'Fresh-cut, unrefined'),
  ('mist-toner', 'Aloe Hydra Mist Toner', 'Skincare', 22, 'New', 'A fine mist to reset thirsty skin any time of day.', 'Alcohol-free'),
  ('shea-lotion', 'Aloe & Shea Body Lotion', 'Body', 26, null, 'Whipped shea folded through cooling aloe.', 'For dry, tight skin'),
  ('lip-balm', 'Aloe Cooling Lip Balm', 'Skincare', 9, null, 'A slim tin of relief for chapped, wind-burnt lips.', 'Pocket size'),
  ('clay-mask', 'Aloe Clay Face Mask', 'Skincare', 24, null, 'Kaolin clay tempered with gel so it never over-dries.', '2x weekly use'),
  ('hair-serum', 'Aloe Scalp & Hair Serum', 'Hair', 28, 'New', 'A lightweight rinse-in serum for flaky, tight scalps.', 'Silicone-free'),
  ('sunburn-spray', 'Aloe Sunburn Relief Spray', 'Body', 19, null, 'Chilled-feel spray for the day you stayed out too long.', 'Keep in the fridge'),
  ('bath-salts', 'Aloe Bath Soak Salts', 'Bath', 20, null, 'Epsom salt and dried aloe for a slow, quiet soak.', 'Unscented base')
on conflict (id) do nothing;
