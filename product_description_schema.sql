-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query)
-- Adds a longer-form description field, shown only on the product detail page
-- (the short "blurb" field keeps its role on cards/grids).

alter table products add column if not exists description text;
