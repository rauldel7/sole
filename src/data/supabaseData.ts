import { supabase } from '@/context/AuthContext';
import { products as localProducts } from '@/data/products';
import type { Product } from '@/types';

interface DbProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  original_price: number | null;
  gender: string;
  color: string;
  images: string[];
  material: string;
  is_new: boolean;
}

interface DbVariant {
  product_id: string;
  size: number;
  stock: number;
}

function mapProduct(db: DbProduct, variants: DbVariant[]): Product {
  return {
    id: db.id,
    name: db.name,
    slug: db.slug,
    brand: db.brand,
    description: db.description ?? '',
    price: db.price,
    originalPrice: db.original_price ?? undefined,
    category: db.category,
    gender: db.gender as Product['gender'],
    color: db.color ?? '',
    images: db.images ?? [],
    sizes: variants.map((v) => v.size).sort((a, b) => a - b),
    stock: variants.reduce((sum, v) => sum + v.stock, 0),
    material: db.material ?? '',
    isNew: db.is_new,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  if (!supabase) return localProducts;
  try {
    const [{ data: dbProducts, error: pErr }, { data: dbVariants, error: vErr }] = await Promise.all([
      supabase.from('products').select('*'),
      supabase.from('product_variants').select('product_id, size, stock'),
    ]);
    if (pErr || vErr || !dbProducts || !dbVariants) return localProducts;
    return dbProducts.map((p: DbProduct) =>
      mapProduct(p, dbVariants.filter((v: DbVariant) => v.product_id === p.id))
    );
  } catch {
    return localProducts;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  if (!supabase) return localProducts.find((p) => p.slug === slug);
  try {
    const { data: dbProduct, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    if (error || !dbProduct) return localProducts.find((p) => p.slug === slug);
    const { data: dbVariants } = await supabase
      .from('product_variants')
      .select('size, stock')
      .eq('product_id', dbProduct.id);
    return mapProduct(dbProduct as DbProduct, (dbVariants ?? []) as DbVariant[]);
  } catch {
    return localProducts.find((p) => p.slug === slug);
  }
}

export async function fetchUserOrders() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function createOrderInSupabase(order: {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  items: { product_id: string; product_name: string; size: number; quantity: number; price: number }[];
}) {
  if (!supabase) return null;
  try {
    const { data: orderData, error: orderErr } = await supabase
      .from('orders')
      .insert({
        subtotal: order.subtotal,
        shipping: order.shipping,
        discount: order.discount,
        total: order.total,
        status: 'completed',
      })
      .select()
      .maybeSingle();
    if (orderErr || !orderData) return null;
    const orderItems = order.items.map((item) => ({
      order_id: orderData.id,
      ...item,
    }));
    await supabase.from('order_items').insert(orderItems);
    return orderData;
  } catch {
    return null;
  }
}
