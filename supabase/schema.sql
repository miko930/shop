-- ============================================
-- TAMADDISS E-Commerce — Supabase Schema
-- Run this in Supabase → SQL Editor → Run
-- ============================================

-- Products table
create table if not exists products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  category    text not null,
  price       integer not null,
  old_price   integer default 0,
  description text,
  image_url   text,
  emoji       text default '📦',
  specs       jsonb default '{}',
  is_active   boolean default true,
  created_at  timestamptz default now()
);

-- Categories table
create table if not exists categories (
  id    uuid primary key default gen_random_uuid(),
  name  text not null,
  icon  text,
  slug  text unique
);

-- Inquiries table (Buy Now taps)
create table if not exists inquiries (
  id             uuid primary key default gen_random_uuid(),
  product_id     uuid references products(id),
  customer_phone text,
  message        text,
  is_handled     boolean default false,
  created_at     timestamptz default now()
);

-- Banners table (Ad banners for storefront carousel)
create table if not exists banners (
  id          uuid primary key default gen_random_uuid(),
  title       text,
  subtitle    text,
  description text,
  cta_text    text,
  bg_color    text default '#0f6e56',
  emoji       text default '📢',
  image_url   text,
  is_active   boolean default true,
  sort_order  integer default 0,
  created_at  timestamptz default now()
);

-- ============================================
-- Row Level Security
-- ============================================

alter table products enable row level security;
create policy "Public can view active products" on products for select using (is_active = true);
create policy "Auth users can insert products" on products for insert to authenticated with check (true);
create policy "Auth users can update products" on products for update to authenticated using (true) with check (true);
create policy "Auth users can delete products" on products for delete to authenticated using (true);

alter table categories enable row level security;
create policy "Public can view categories" on categories for select using (true);
create policy "Auth users can insert categories" on categories for insert to authenticated with check (true);
create policy "Auth users can update categories" on categories for update to authenticated using (true) with check (true);
create policy "Auth users can delete categories" on categories for delete to authenticated using (true);

alter table inquiries enable row level security;
create policy "Anyone can create inquiry" on inquiries for insert with check (true);
create policy "Auth users can view inquiries" on inquiries for select to authenticated using (true);
create policy "Auth users can update inquiries" on inquiries for update to authenticated using (true) with check (true);

alter table banners enable row level security;
create policy "Public can view active banners" on banners for select using (is_active = true);
create policy "Auth users can insert banners" on banners for insert to authenticated with check (true);
create policy "Auth users can update banners" on banners for update to authenticated using (true) with check (true);
create policy "Auth users can delete banners" on banners for delete to authenticated using (true);

-- ============================================
-- Storage Bucket Policies
-- ============================================
-- Create bucket "product-images" (public) in Supabase Storage first, then run:

-- create policy "Public can view images" on storage.objects for select using (bucket_id = 'product-images');
-- create policy "Auth can upload images" on storage.objects for insert with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

-- ============================================
-- Seed Categories
-- ============================================

insert into categories (name, icon, slug) values
  ('Electronics', 'device-tv', 'electronics'),
  ('Kitchen', 'tool-kitchen-2', 'kitchen'),
  ('Cleaning', 'droplet', 'cleaning'),
  ('Food', 'salad', 'food'),
  ('Furniture', 'sofa', 'furniture'),
  ('Baby', 'baby-carriage', 'baby')
on conflict (slug) do nothing;
