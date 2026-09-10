import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { Order } from '@/types';
import { useCart } from '@/context/CartContext';
import { createOrderInSupabase } from '@/data/supabaseData';

const SHIPPING_COST = 49;
const EXPRESS_SHIPPING = 99;
const FREE_SHIPPING_THRESHOLD = 1000;

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    country: 'Sverige',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : shippingMethod === 'express'
        ? EXPRESS_SHIPPING
        : SHIPPING_COST;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Din varukorg är tom</h1>
        <Link to="/shop" className="text-neutral-500 hover:text-neutral-900 underline">
          Gå till shoppen
        </Link>
      </div>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName) e.firstName = 'Obligatoriskt';
    if (!form.lastName) e.lastName = 'Obligatoriskt';
    if (!form.email) e.email = 'Obligatoriskt';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Ogiltig e-post';
    if (!form.phone) e.phone = 'Obligatoriskt';
    if (!form.address) e.address = 'Obligatoriskt';
    if (!form.postalCode) e.postalCode = 'Obligatoriskt';
    if (!form.city) e.city = 'Obligatoriskt';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const order: Order = {
      id: crypto.randomUUID(),
      orderNumber: `SOLE-${Date.now().toString().slice(-8)}`,
      items,
      subtotal,
      shipping,
      discount: 0,
      total,
      createdAt: new Date().toISOString(),
      status: 'completed',
      customer: form,
    };

    const orders: Order[] = JSON.parse(localStorage.getItem('sole-orders') || '[]');
    orders.push(order);
    localStorage.setItem('sole-orders', JSON.stringify(orders));

    await createOrderInSupabase({
      subtotal,
      shipping,
      discount: 0,
      total,
      items: items.map((item) => ({
        product_id: item.product.id,
        product_name: item.product.name,
        size: item.size,
        quantity: item.quantity,
        price: item.product.price,
      })),
    });

    clearCart();
    navigate('/order-success', { state: { order } });
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-colors ${
      errors[field] ? 'border-red-400' : 'border-neutral-300 focus:border-neutral-900'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Kontaktuppgifter</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Förnamn</label>
                <input
                  className={inputClass('firstName')}
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Efternamn</label>
                <input
                  className={inputClass('lastName')}
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">E-post</label>
                <input
                  type="email"
                  className={inputClass('email')}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Telefonnummer</label>
                <input
                  className={inputClass('phone')}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Leveransadress</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1.5">Adress</label>
                <input
                  className={inputClass('address')}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Postnummer</label>
                <input
                  className={inputClass('postalCode')}
                  value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                />
                {errors.postalCode && <p className="text-xs text-red-500 mt-1">{errors.postalCode}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Stad</label>
                <input
                  className={inputClass('city')}
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1.5">Land</label>
                <select
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:border-neutral-900 focus:outline-none"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                >
                  <option>Sverige</option>
                  <option>Danmark</option>
                  <option>Norge</option>
                  <option>Finland</option>
                </select>
              </div>
            </div>
          </div>

          {/* Shipping method */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Leverans</h2>
            <div className="space-y-3">
              <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                shippingMethod === 'standard' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-300'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="accent-neutral-900"
                  />
                  <div>
                    <p className="font-medium text-sm">Standardleverans</p>
                    <p className="text-xs text-neutral-500">3–5 arbetsdagar</p>
                  </div>
                </div>
                <span className="text-sm font-medium">
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? 'Gratis' : `${SHIPPING_COST} kr`}
                </span>
              </label>
              <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                shippingMethod === 'express' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-300'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="accent-neutral-900"
                  />
                  <div>
                    <p className="font-medium text-sm">Expressleverans</p>
                    <p className="text-xs text-neutral-500">1–2 arbetsdagar</p>
                  </div>
                </div>
                <span className="text-sm font-medium">{EXPRESS_SHIPPING} kr</span>
              </label>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="border border-neutral-200 rounded-lg p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Orderöversikt</h2>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                  <div className="w-14 h-14 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-neutral-500">Str {item.size} · Antal {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium whitespace-nowrap">{item.product.price * item.quantity} kr</p>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Delsumma</span>
                <span className="font-medium">{subtotal} kr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Frakt</span>
                <span className="font-medium">{shipping === 0 ? 'Gratis' : `${shipping} kr`}</span>
              </div>
              <div className="border-t border-neutral-200 pt-2 flex justify-between">
                <span className="font-semibold">Totalt</span>
                <span className="font-bold text-lg">{total} kr</span>
              </div>
            </div>
            <button
              type="submit"
              className="block w-full bg-neutral-900 text-white text-center py-3.5 rounded-lg font-semibold hover:bg-neutral-800 transition-colors mt-4"
            >
              Slutför beställning
            </button>
            <p className="text-xs text-neutral-400 text-center mt-3">
              Betalning hanteras säkert via Stripe
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
