-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query)
-- Replaces the single image_url column with an ordered array of photo URLs.

alter table products add column if not exists image_urls text[] not null default '{}';

-- Backfill each product's existing photo as the first (cover) entry.
update products
set image_urls = array[image_url]
where image_url is not null and image_urls = '{}';

alter table products drop column if exists image_url;
