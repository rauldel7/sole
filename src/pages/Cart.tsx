import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const SHIPPING_COST = 49;
const FREE_SHIPPING_THRESHOLD = 1000;

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <ShoppingBag className="h-16 w-16 text-neutral-300" />
        </div>
        <h1 className="text-2xl font-bold mb-3">Din varukorg är tom</h1>
        <p className="text-neutral-500 mb-8">Utforska vårt sortiment och hitta dina nya favoritskor.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-neutral-800 transition-colors"
        >
          Fortsätt handla
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Varukorg</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.size}`}
              className="flex gap-4 border border-neutral-200 rounded-lg p-4"
            >
              <Link to={`/product/${item.product.slug}`} className="flex-shrink-0">
                <div className="w-24 h-24 bg-neutral-100 rounded-lg overflow-hidden">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div>
                    <p className="text-xs text-neutral-500 uppercase">{item.product.brand}</p>
                    <Link to={`/product/${item.product.slug}`} className="font-medium hover:text-neutral-500 transition-colors">
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-neutral-500 mt-1">Storlek: {item.size}</p>
                  </div>
                  <p className="font-semibold whitespace-nowrap">{item.product.price * item.quantity} kr</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center border border-neutral-300 rounded hover:border-neutral-900 transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center border border-neutral-300 rounded hover:border-neutral-900 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.size)}
                    className="flex items-center gap-1 text-sm text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Ta bort
                  </button>
                </div>
              </div>
            </div>
          ))}
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
            ← Fortsätt handla
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="border border-neutral-200 rounded-lg p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Orderöversikt</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Delsumma</span>
                <span className="font-medium">{subtotal} kr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Frakt</span>
                <span className="font-medium">{shipping === 0 ? 'Gratis' : `${shipping} kr`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-neutral-400">
                  Fri frakt över {FREE_SHIPPING_THRESHOLD} kr. Lägg till {FREE_SHIPPING_THRESHOLD - subtotal} kr till.
                </p>
              )}
              <div className="border-t border-neutral-200 pt-3 flex justify-between">
                <span className="font-semibold">Totalt</span>
                <span className="font-bold text-lg">{total} kr</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-neutral-900 text-white text-center py-3.5 rounded-lg font-semibold hover:bg-neutral-800 transition-colors mt-4"
            >
              Till checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
