import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, product.sizes[Math.floor(product.sizes.length / 2)], 1);
    showToast(`${product.name} tillagd i varukorgen`);
  };

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative overflow-hidden bg-neutral-100 rounded-lg aspect-[4/3] mb-3">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-neutral-900 text-white text-xs font-semibold px-2.5 py-1 rounded">
            -{discount}%
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-3 right-3 bg-white text-neutral-900 text-xs font-semibold px-2.5 py-1 rounded border border-neutral-200">
            Nyhet
          </span>
        )}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-900 hover:text-white"
          aria-label="Lägg till i varukorg"
        >
          <ShoppingBag className="h-5 w-5" />
        </button>
      </div>
      <div>
        <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">{product.brand}</p>
        <h3 className="text-sm font-medium text-neutral-900 mb-1 group-hover:text-neutral-500 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{product.price} kr</span>
          {product.originalPrice && (
            <span className="text-sm text-neutral-400 line-through">{product.originalPrice} kr</span>
          )}
        </div>
      </div>
    </Link>
  );
}
