/*
# SOLE — E-commerce database schema

## Overview
Creates the full database schema for the SOLE shoe store: products, product variants, profiles, orders, and order items. Products and variants are public (readable by everyone). Profiles, orders, and order items are owner-scoped — each authenticated user can only access their own data.

## New Tables

### products
- `id` (uuid, primary key)
- `name` (text, not null)
- `slug` (text, unique, not null)
- `description` (text)
- `brand` (text, not null)
- `category` (text, not null)
- `price` (integer, not null) — stored in SEK (öre = integer kr)
- `original_price` (integer) — nullable, for sale items
- `gender` (text, not null)
- `color` (text)
- `images` (text[]) — array of image URLs
- `material` (text)
- `is_new` (boolean, default false)
- `created_at` (timestamptz, default now())

### product_variants
- `id` (uuid, primary key)
- `product_id` (uuid, foreign key → products.id ON DELETE CASCADE)
- `size` (integer, not null)
- `stock` (integer, not null, default 0)
- `sku` (text, unique)

### profiles
- `id` (uuid, primary key, references auth.users ON DELETE CASCADE)
- `email` (text)
- `first_name` (text)
- `last_name` (text)
- `phone` (text)
- `address` (text)
- `postal_code` (text)
- `city` (text)
- `country` (text)
- `created_at` (timestamptz, default now())

### orders
- `id` (uuid, primary key)
- `user_id` (uuid, not null, default auth.uid(), references auth.users ON DELETE CASCADE)
- `status` (text, default 'pending')
- `subtotal` (integer, not null)
- `shipping` (integer, not null, default 0)
- `discount` (integer, not null, default 0)
- `total` (integer, not null)
- `created_at` (timestamptz, default now())

### order_items
- `id` (uuid, primary key)
- `order_id` (uuid, foreign key → orders.id ON DELETE CASCADE)
- `product_id` (uuid, nullable)
- `product_name` (text, not null)
- `size` (integer, not null)
- `quantity` (integer, not null)
- `price` (integer, not null)

## Security (RLS)

### products — public read
- SELECT: `TO anon, authenticated USING (true)` — product catalog is public.
- INSERT/UPDATE/DELETE: `TO authenticated` with no ownership check needed yet (admin-only in future). For now, restricted to authenticated users.

### product_variants — public read
- SELECT: `TO anon, authenticated USING (true)` — variant/stock info is public.
- INSERT/UPDATE/DELETE: `TO authenticated` — admin management.

### profiles — owner-scoped
- All CRUD scoped to `auth.uid() = id`.

### orders — owner-scoped
- SELECT/UPDATE/DELETE: `auth.uid() = user_id`
- INSERT: `WITH CHECK (auth.uid() = user_id)`

### order_items — owner-scoped via parent orders
- SELECT: `EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())`
- INSERT: same EXISTS check in WITH CHECK
- UPDATE/DELETE: same EXISTS check in USING

## Important Notes
1. Products and variants use `TO anon, authenticated` for SELECT so the storefront works without login.
2. Orders, order_items, and profiles use `TO authenticated` with `auth.uid()` ownership checks.
3. `orders.user_id` defaults to `auth.uid()` so client inserts that omit it still pass the RLS check.
4. Prices stored as integers (SEK krona).
*/

-- Products
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  brand text NOT NULL,
  category text NOT NULL,
  price integer NOT NULL,
  original_price integer,
  gender text NOT NULL,
  color text,
  images text[] DEFAULT '{}',
  material text,
  is_new boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_products" ON products;
CREATE POLICY "public_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_products" ON products;
CREATE POLICY "auth_insert_products" ON products FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_products" ON products;
CREATE POLICY "auth_update_products" ON products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_products" ON products;
CREATE POLICY "auth_delete_products" ON products FOR DELETE
  TO authenticated USING (true);

-- Product variants
CREATE TABLE IF NOT EXISTS product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size integer NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  sku text UNIQUE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_variants" ON product_variants;
CREATE POLICY "public_select_variants" ON product_variants FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_variants" ON product_variants;
CREATE POLICY "auth_insert_variants" ON product_variants FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_variants" ON product_variants;
CREATE POLICY "auth_update_variants" ON product_variants FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_variants" ON product_variants;
CREATE POLICY "auth_delete_variants" ON product_variants FOR DELETE
  TO authenticated USING (true);

-- Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  first_name text,
  last_name text,
  phone text,
  address text,
  postal_code text,
  city text,
  country text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "delete_own_profile" ON profiles;
CREATE POLICY "delete_own_profile" ON profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  subtotal integer NOT NULL,
  shipping integer NOT NULL DEFAULT 0,
  discount integer NOT NULL DEFAULT 0,
  total integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_orders" ON orders;
CREATE POLICY "select_own_orders" ON orders FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_orders" ON orders;
CREATE POLICY "insert_own_orders" ON orders FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_orders" ON orders;
CREATE POLICY "update_own_orders" ON orders FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_orders" ON orders;
CREATE POLICY "delete_own_orders" ON orders FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid,
  product_name text NOT NULL,
  size integer NOT NULL,
  quantity integer NOT NULL,
  price integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_order_items" ON order_items;
CREATE POLICY "select_own_order_items" ON order_items FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "insert_own_order_items" ON order_items;
CREATE POLICY "insert_own_order_items" ON order_items FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "update_own_order_items" ON order_items;
CREATE POLICY "update_own_order_items" ON order_items FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "delete_own_order_items" ON order_items;
CREATE POLICY "delete_own_order_items" ON order_items FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
