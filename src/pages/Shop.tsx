import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import {
  products,
  categories,
  brands,
  allSizes,
  colors,
  genders,
} from '@/data/products';

const sortOptions = [
  { value: 'recommended', label: 'Rekommenderat' },
  { value: 'price-low', label: 'Pris – lägst' },
  { value: 'price-high', label: 'Pris – högst' },
  { value: 'newest', label: 'Nyast' },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(2000);
  const [sort, setSort] = useState('recommended');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const urlCategory = searchParams.get('category');
  const urlGender = searchParams.get('gender');
  const urlFilter = searchParams.get('filter');

  const effectiveCategories = urlCategory ? [urlCategory] : selectedCategories;
  const effectiveGenders = urlGender ? [urlGender] : selectedGenders;
  const filterNew = urlFilter === 'nyheter';
  const filterSale = urlFilter === 'sale';

  const toggle = <T,>(value: T, list: T[], setter: (v: T[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.brand.toLowerCase().includes(q) &&
          !p.category.toLowerCase().includes(q)
        )
          return false;
      }
      if (effectiveCategories.length && !effectiveCategories.includes(p.category)) return false;
      if (effectiveGenders.length && !effectiveGenders.includes(p.gender)) return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (selectedSizes.length && !p.sizes.some((s) => selectedSizes.includes(s))) return false;
      if (selectedColors.length && !selectedColors.includes(p.color)) return false;
      if (p.price > priceMax) return false;
      if (filterNew && !p.isNew) return false;
      if (filterSale && !p.originalPrice) return false;
      return true;
    });

    switch (sort) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }
    return result;
  }, [
    search, effectiveCategories, effectiveGenders, selectedBrands, selectedSizes,
    selectedColors, priceMax, sort, filterNew, filterSale,
  ]);

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Kategori</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={effectiveCategories.includes(cat)}
                onChange={() => toggle(cat, selectedCategories, setSelectedCategories)}
                disabled={!!urlCategory}
                className="accent-neutral-900"
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Varumärke</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggle(brand, selectedBrands, setSelectedBrands)}
                className="accent-neutral-900"
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Storlek</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggle(size, selectedSizes, setSelectedSizes)}
              className={`px-3 py-1.5 text-sm border rounded transition-colors ${
                selectedSizes.includes(size)
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-300 hover:border-neutral-900'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Kön</h3>
        <div className="space-y-2">
          {genders.map((g) => (
            <label key={g} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={effectiveGenders.includes(g)}
                onChange={() => toggle(g, selectedGenders, setSelectedGenders)}
                disabled={!!urlGender}
                className="accent-neutral-900"
              />
              <span className="text-sm">{g}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Färg</h3>
        <div className="space-y-2">
          {colors.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedColors.includes(c)}
                onChange={() => toggle(c, selectedColors, setSelectedColors)}
                className="accent-neutral-900"
              />
              <span className="text-sm">{c}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Max pris: {priceMax} kr</h3>
        <input
          type="range"
          min={200}
          max={2000}
          step={100}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-neutral-900"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {filterNew ? 'Nyheter' : filterSale ? 'Sale' : 'Shop'}
        </h1>
        <p className="text-neutral-500">{filtered.length} produkter</p>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <FilterContent />
        </aside>

        <div className="flex-1">
          {/* Search + sort */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Sök produkter..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:border-neutral-900 focus:outline-none transition-colors"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:border-neutral-900 focus:outline-none transition-colors bg-white"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-500 text-lg">Inga produkter hittades.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto animate-[slideIn_0.3s_ease]">
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold">Filter</h2>
              <button onClick={() => setDrawerOpen(false)} aria-label="Stäng">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <FilterContent />
            </div>
            <div className="p-4 sticky bottom-0 bg-white border-t border-neutral-200">
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full bg-neutral-900 text-white py-3 rounded-lg font-semibold"
              >
                Visa {filtered.length} produkter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
