import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { LogOut, Package } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { fetchUserOrders } from '@/data/supabaseData';
import type { Order } from '@/types';

export default function Account() {
  const { user, loading, signOut } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('sole-orders');
    if (stored) setOrders(JSON.parse(stored));
    fetchUserOrders().then((dbOrders) => {
      if (dbOrders && dbOrders.length > 0) {
        const mapped: Order[] = dbOrders.map((o: { id: string; created_at: string; status: string; subtotal: number; shipping: number; discount: number; total: number; order_items: { product_name: string; size: number; quantity: number; price: number }[] }) => ({
          id: o.id,
          orderNumber: `SOLE-${o.id.slice(0, 8).toUpperCase()}`,
          items: (o.order_items ?? []).map((oi) => ({
            product: { id: '', name: oi.product_name, slug: '', brand: '', description: '', price: oi.price, category: '', gender: 'Unisex', color: '', images: [], sizes: [], stock: 0, material: '' },
            size: oi.size,
            quantity: oi.quantity,
          })),
          subtotal: o.subtotal,
          shipping: o.shipping,
          discount: o.discount,
          total: o.total,
          createdAt: o.created_at,
          status: o.status as Order['status'],
          customer: { firstName: '', lastName: '', email: user?.email ?? '', phone: '', address: '', postalCode: '', city: '', country: '' },
        }));
        setOrders(mapped);
      }
    });
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-neutral-500">Laddar...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mitt konto</h1>
          <p className="text-neutral-500 mt-1">Välkommen, {fullName}</p>
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logga ut
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="border border-neutral-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-neutral-500 mb-2">Namn</h2>
          <p className="font-medium">{fullName}</p>
        </div>
        <div className="border border-neutral-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-neutral-500 mb-2">E-post</h2>
          <p className="font-medium">{user.email}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Mina ordrar</h2>
        {orders.length === 0 ? (
          <div className="border border-neutral-200 rounded-lg p-12 text-center">
            <div className="flex justify-center mb-3">
              <Package className="h-12 w-12 text-neutral-300" />
            </div>
            <p className="text-neutral-500 mb-4">Du har inga ordrar än</p>
            <Link to="/shop" className="text-sm font-medium text-neutral-900 hover:underline">
              Börja handla
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-neutral-200 rounded-lg p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold">{order.orderNumber}</p>
                    <p className="text-sm text-neutral-500">
                      {new Date(order.createdAt).toLocaleDateString('sv-SE')}
                    </p>
                  </div>
                  <span className="text-sm font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {order.status === 'completed' ? 'Genomförd' : 'Väntar'}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-neutral-600">
                  {order.items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex justify-between">
                      <span>{item.product.name} · Str {item.size} · Antal {item.quantity}</span>
                      <span>{item.product.price * item.quantity} kr</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-neutral-200 mt-3 pt-3 flex justify-between font-semibold">
                  <span>Totalt</span>
                  <span>{order.total} kr</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
