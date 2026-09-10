export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  gender: 'Herr' | 'Dam' | 'Unisex';
  color: string;
  images: string[];
  sizes: number[];
  stock: number;
  material: string;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  size: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  createdAt: string;
  status: 'pending' | 'completed';
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
  };
}
