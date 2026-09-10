import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getPopularProducts, getNewProducts, getSaleProducts, categories } from '@/data/products';

const heroImage = 'https://images.pexels.com/photos/7203482/pexels-photo-7203482.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';

const categoryImages: Record<string, string> = {
  Sneakers: 'https://images.pexels.com/photos/847371/pexels-photo-847371.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
  Löparskor: 'https://images.pexels.com/photos/260044/pexels-photo-260044.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
  Boots: 'https://images.pexels.com/photos/37827331/pexels-photo-37827331.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
  Träningsskor: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
};

export default function Home() {
  const popular = getPopularProducts(8);
  const newArrivals = getNewProducts(4);
  const saleItems = getSaleProducts(4);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={heroImage} alt="Sneakers" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Hitta dina nya favoritskor
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-md">
              Upptäck vårt urval av premium sneakers, löparskor och boots från världens bästa varumärken.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-neutral-900 px-8 py-3.5 rounded-full font-semibold hover:bg-neutral-100 transition-colors"
            >
              Shoppa nu
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-8">Kategorier</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/shop?category=${encodeURIComponent(cat)}`}
              className="group relative overflow-hidden rounded-lg aspect-[4/5]"
            >
              <img
                src={categoryImages[cat]}
                alt={cat}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white text-lg font-semibold">{cat}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Populära produkter</h2>
          <Link to="/shop" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
            Visa alla
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
          {popular.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Nyheter</h2>
          <Link to="/shop?filter=nyheter" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
            Visa alla
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Sale */}
      {saleItems.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-neutral-900 text-white rounded-2xl p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Sale</h2>
                <p className="text-neutral-400">Spara upp till 30% på utvalda modeller.</p>
              </div>
              <Link
                to="/shop?filter=sale"
                className="inline-flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-full font-semibold hover:bg-neutral-100 transition-colors"
              >
                Shoppa rean
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
              {saleItems.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
