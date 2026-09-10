import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Air Max 270',
    slug: 'nike-air-max-270',
    brand: 'Nike',
    description: 'En modern klassiker med synlig luftkudde i hälen för maximal komfort hela dagen. Den överdel i nätmaterial ger andningsfuktighet och en lätt känsla.',
    price: 1499,
    originalPrice: 1899,
    category: 'Sneakers',
    gender: 'Herr',
    color: 'Svart',
    images: [
      'https://images.pexels.com/photos/1456733/pexels-photo-1456733.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    stock: 24,
    material: 'Nätmaterial, syntet',
    isNew: false,
  },
  {
    id: '2',
    name: 'Samba OG',
    slug: 'adidas-samba-og',
    brand: 'Adidas',
    description: 'En tidlös ikon med rötter i fotbollen. Läderöverdel och klassisk sulprofil gör Samba till en favorit för varje tillfälle.',
    price: 999,
    originalPrice: 1199,
    category: 'Sneakers',
    gender: 'Unisex',
    color: 'Vit',
    images: [
      'https://images.pexels.com/photos/7203482/pexels-photo-7203482.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8346227/pexels-photo-8346227.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    stock: 31,
    material: 'Läder, gummi',
    isNew: true,
  },
  {
    id: '3',
    name: '550',
    slug: 'new-balance-550',
    brand: 'New Balance',
    description: 'Inspired av 80-talets basketkultur. Läderöverdel med klassisk färgsättning och överlägsen dämpning för en bekväm upplevelse.',
    price: 1299,
    category: 'Sneakers',
    gender: 'Herr',
    color: 'Vit',
    images: [
      'https://images.pexels.com/photos/847371/pexels-photo-847371.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/12628402/pexels-photo-12628402.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    stock: 18,
    material: 'Läder, textil',
    isNew: false,
  },
  {
    id: '4',
    name: 'Air Force 1',
    slug: 'nike-air-force-1',
    brand: 'Nike',
    description: 'Sko som definierade en generation. Läderöverdel med Air-dämpning och en ikonisk sulprofil som aldrig går ur stil.',
    price: 1199,
    category: 'Sneakers',
    gender: 'Dam',
    color: 'Vit',
    images: [
      'https://images.pexels.com/photos/7588163/pexels-photo-7588163.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/6332435/pexels-photo-6332435.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    sizes: [36, 37, 38, 39, 40, 41],
    stock: 27,
    material: 'Läder, gummi',
    isNew: false,
  },
  {
    id: '5',
    name: 'Ultraboost',
    slug: 'adidas-ultraboost',
    brand: 'Adidas',
    description: 'Revolutionär dämpning med BOOST-teknologi för oöverträffad energiåtergång. Primeknit-överdel anpassar sig efter din fot för en perfekt passform.',
    price: 1799,
    originalPrice: 2199,
    category: 'Löparskor',
    gender: 'Herr',
    color: 'Grå',
    images: [
      'https://images.pexels.com/photos/5526492/pexels-photo-5526492.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/26852035/pexels-photo-26852035.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    stock: 15,
    material: 'Primeknit, syntet',
    isNew: false,
  },
  {
    id: '6',
    name: '9060',
    slug: 'new-balance-9060',
    brand: 'New Balance',
    description: 'En modern tolkning av 90-talets löparästetik. ABZORB-dämpning och en distinkt design som sticker ut i mängden.',
    price: 1599,
    category: 'Sneakers',
    gender: 'Dam',
    color: 'Grå',
    images: [
      'https://images.pexels.com/photos/26852035/pexels-photo-26852035.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/5526492/pexels-photo-5526492.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    sizes: [36, 37, 38, 39, 40, 41],
    stock: 12,
    material: 'Nätmaterial, syntet',
    isNew: true,
  },
  {
    id: '7',
    name: 'Suede Classic',
    slug: 'puma-suede-classic',
    brand: 'Puma',
    description: 'En av de mest ikoniska sneakers genom tiderna. Suede-överdel med Pumas klassiska formstrip för en tidlös look.',
    price: 799,
    originalPrice: 999,
    category: 'Sneakers',
    gender: 'Unisex',
    color: 'Svart',
    images: [
      'https://images.pexels.com/photos/17931282/pexels-photo-17931282.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/684152/pexels-photo-684152.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    stock: 35,
    material: 'Päls, gummi',
    isNew: false,
  },
  {
    id: '8',
    name: 'Chuck 70',
    slug: 'converse-chuck-70',
    brand: 'Converse',
    description: 'En uppgraderad version av den klassiska All Star. Förbättrad hälkudde och premiummaterial för extra komfort och hållbarhet.',
    price: 899,
    category: 'Sneakers',
    gender: 'Unisex',
    color: 'Vit',
    images: [
      'https://images.pexels.com/photos/12628402/pexels-photo-12628402.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/847371/pexels-photo-847371.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    stock: 22,
    material: 'Canvas, gummi',
    isNew: false,
  },
  {
    id: '9',
    name: 'Pegasus 40',
    slug: 'nike-pegasus-40',
    brand: 'Nike',
    description: 'Den pålitliga allround-löparen för varje pass. React-skum och Air-Zoom-enheter ger responsiv dämpning mile efter mile.',
    price: 1399,
    category: 'Löparskor',
    gender: 'Herr',
    color: 'Blå',
    images: [
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/260044/pexels-photo-260044.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    stock: 19,
    material: 'Nätmaterial, syntet',
    isNew: true,
  },
  {
    id: '10',
    name: 'Campus 00s',
    slug: 'adidas-campus-00s',
    brand: 'Adidas',
    description: 'En streetwear-favorit inspirerad av 2000-talet. Suede-överdel med klassisk tre-strecksdesign för en avslappnad stil.',
    price: 949,
    originalPrice: 1149,
    category: 'Sneakers',
    gender: 'Dam',
    color: 'Grön',
    images: [
      'https://images.pexels.com/photos/29096401/pexels-photo-29096401.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/17931282/pexels-photo-17931282.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    sizes: [36, 37, 38, 39, 40, 41],
    stock: 16,
    material: 'Päls, textil',
    isNew: true,
  },
  {
    id: '11',
    name: 'Gel-Kayano 30',
    slug: 'asics-gel-kayano-30',
    brand: 'Asics',
    description: 'Stabilitetssko med FF BLAST PLUS Eco-dämpning för en mjuk och stabil löpupplevelse. Perfekt för långa distanser.',
    price: 1699,
    category: 'Löparskor',
    gender: 'Herr',
    color: 'Svart',
    images: [
      'https://images.pexels.com/photos/684152/pexels-photo-684152.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/4065509/pexels-photo-4065509.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    stock: 14,
    material: 'Nätmaterial, gummi',
    isNew: false,
  },
  {
    id: '12',
    name: 'Old Skool',
    slug: 'vans-old-skool',
    brand: 'Vans',
    description: 'Den klassiska skate-skon med den ikoniska sidostripes. Läder- och canvasöverdel för hållbarhet och stil.',
    price: 849,
    originalPrice: 1049,
    category: 'Sneakers',
    gender: 'Unisex',
    color: 'Svart',
    images: [
      'https://images.pexels.com/photos/6332435/pexels-photo-6332435.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8346221/pexels-photo-8346221.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    stock: 28,
    material: 'Läder, canvas',
    isNew: false,
  },
];

export const categories = ['Sneakers', 'Löparskor', 'Boots', 'Träningsskor'];
export const brands = ['Nike', 'Adidas', 'New Balance', 'Puma', 'Converse', 'Asics', 'Vans'];
export const allSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
export const colors = ['Svart', 'Vit', 'Grå', 'Blå', 'Grön'];
export const genders = ['Herr', 'Dam', 'Unisex'];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, limit);
}

export function getNewProducts(limit = 4): Product[] {
  return products.filter((p) => p.isNew).slice(0, limit);
}

export function getSaleProducts(limit = 4): Product[] {
  return products.filter((p) => p.originalPrice).slice(0, limit);
}

export function getPopularProducts(limit = 8): Product[] {
  return products.slice(0, limit);
}
