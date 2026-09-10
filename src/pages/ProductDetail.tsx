import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, ChevronRight } from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import ProductCard from '@/components/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Produkten hittades inte</h1>
        <Link to="/shop" className="text-neutral-500 hover:text-neutral-900 underline">
          Tillbaka till shoppen
        </Link>
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product, selectedSize, quantity);
    showToast(`${product.name} tillagd i varukorgen`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-neutral-500 mb-6">
        <Link to="/" className="hover:text-neutral-900">Hem</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/shop" className="hover:text-neutral-900">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-900">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div>
          <div className="bg-neutral-100 rounded-lg overflow-hidden mb-4 aspect-square">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === i ? 'border-neutral-900' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-neutral-500 uppercase tracking-wide mb-2">{product.brand}</p>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-semibold">{product.price} kr</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-neutral-400 line-through">{product.originalPrice} kr</span>
                <span className="bg-red-100 text-red-700 text-sm font-semibold px-2 py-0.5 rounded">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-neutral-600 leading-relaxed mb-6">{product.description}</p>

          <div className="space-y-4 mb-6">
            <div className="flex gap-4 text-sm">
              <span className="text-neutral-500 w-24">Material:</span>
              <span className="font-medium">{product.material}</span>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="text-neutral-500 w-24">Färg:</span>
              <span className="font-medium">{product.color}</span>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="text-neutral-500 w-24">Lagerstatus:</span>
              <span className={`font-medium ${product.stock > 5 ? 'text-green-600' : 'text-orange-600'}`}>
                {product.stock > 5 ? 'I lager' : `Bara ${product.stock} kvar`}
              </span>
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Storlek</h3>
              {sizeError && <span className="text-sm text-red-500">Välj en storlek</span>}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  className={`min-w-[3.5rem] px-4 py-2.5 text-sm border rounded-lg transition-colors ${
                    selectedSize === size
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-300 hover:border-neutral-900'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Antal</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center border border-neutral-300 rounded-lg hover:border-neutral-900 transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center border border-neutral-300 rounded-lg hover:border-neutral-900 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white py-4 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            Lägg i varukorg
          </button>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Relaterade produkter</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
