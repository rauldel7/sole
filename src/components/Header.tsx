import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Herr', to: '/shop?gender=Herr' },
  { label: 'Dam', to: '/shop?gender=Dam' },
  { label: 'Sneakers', to: '/shop?category=Sneakers' },
  { label: 'Nyheter', to: '/shop?filter=nyheter' },
  { label: 'Sale', to: '/shop?filter=sale' },
];

export default function Header() {
  const { totalItems } = useCart();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <button
                className="lg:hidden p-1"
                onClick={() => setMobileOpen(true)}
                aria-label="Meny"
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link to="/" className="text-2xl font-bold tracking-[0.2em]">
                SOLE
              </Link>
              <nav className="hidden lg:flex items-center gap-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors hover:text-neutral-400 ${
                        isActive ? 'text-neutral-900' : 'text-neutral-600'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4 sm:gap-5">
              <Link to="/shop" className="p-1 hover:text-neutral-400 transition-colors" aria-label="Sök">
                <Search className="h-5 w-5" />
              </Link>
              <Link to="/account" className="p-1 hover:text-neutral-400 transition-colors" aria-label="Konto">
                <User className="h-5 w-5" />
              </Link>
              <Link to="/cart" className="relative p-1 hover:text-neutral-400 transition-colors" aria-label="Varukorg">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-white text-[10px] font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl animate-[slideIn_0.3s_ease]">
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
              <span className="text-xl font-bold tracking-[0.2em]">SOLE</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Stäng">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="border-t border-neutral-200 mt-2 pt-2">
                <Link
                  to="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <User className="h-5 w-5" />
                  {user ? 'Mitt konto' : 'Logga in'}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
