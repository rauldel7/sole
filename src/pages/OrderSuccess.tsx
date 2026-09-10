import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Package } from 'lucide-react';
import type { Order } from '@/types';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order as Order | undefined;

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Ingen beställning hittades</h1>
        <Link to="/shop" className="text-neutral-500 hover:text-neutral-900 underline">
          Gå till shoppen
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-9 w-9 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Tack för din beställning!</h1>
        <p className="text-neutral-500">En bekräftelse har skickats till {order.customer.email}</p>
      </div>

      <div className="border border-neutral-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
          <div>
            <p className="text-sm text-neutral-500">Ordernummer</p>
            <p className="font-semibold text-lg">{order.orderNumber}</p>
          </div>
          <Package className="h-8 w-8 text-neutral-300" />
        </div>

        <div className="space-y-3 mb-6">
          {order.items.map((item) => (
            <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
              <div className="w-14 h-14 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{item.product.name}</p>
                <p className="text-xs text-neutral-500">Str {item.size} · Antal {item.quantity}</p>
              </div>
              <p className="text-sm font-medium whitespace-nowrap">{item.product.price * item.quantity} kr</p>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-200 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-500">Delsumma</span>
            <span>{order.subtotal} kr</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Frakt</span>
            <span>{order.shipping === 0 ? 'Gratis' : `${order.shipping} kr`}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-neutral-200">
            <span>Totalt</span>
            <span>{order.total} kr</span>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/shop"
          className="inline-flex items-center bg-neutral-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-neutral-800 transition-colors"
        >
          Fortsätt handla
        </Link>
      </div>
    </div>
  );
}
