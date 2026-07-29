-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query)
-- Adds an image URL field to the products table.

alter table products add column if not exists image_url text;
