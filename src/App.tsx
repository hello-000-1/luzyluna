import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ToyBrick, Shirt, Search, ShoppingCart, Heart, Menu, X, Star, MessageSquare, User, Facebook, Instagram, Loader2, MapPin, Clock, Phone } from 'lucide-react';
import { PRODUCTS } from './constants';
import { Product, Review } from './types';

// Custom TikTok Icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function App() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [filter, setFilter] = useState<'Todos' | 'Juguetes' | 'Ropa'>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [addingProductId, setAddingProductId] = useState<number | null>(null);

  const WHATSAPP_NUMBER = "51928567606";

  const handleWhatsAppPurchase = (items: { product: Product; quantity: number }[]) => {
    if (items.length === 0) return;
    
    let message = "¡Hola Luz y Luna Store! 👋 Me gustaría realizar un pedido:\n\n";
    items.forEach(item => {
      message += `• ${item.product.name} (x${item.quantity}) - $${(item.product.price * item.quantity).toFixed(2)}\n`;
    });
    
    const total = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    message += `\n*Total: $${total.toFixed(2)}*`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const handleSingleProductWhatsApp = (product: Product) => {
    const message = `¡Hola Luz y Luna Store! 👋 Me interesa comprar este producto: *${product.name}* ($${product.price.toFixed(2)})`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  // Review Form State
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewName, setNewReviewName] = useState('');

  React.useEffect(() => {
    // Simulate initial data fetching
    const loadTimer = setTimeout(() => setIsInitialLoading(false), 1200);

    const hasVisited = localStorage.getItem('luz_y_luna_visited');
    if (!hasVisited) {
      const welcomeTimer = setTimeout(() => setShowWelcome(true), 1500);
      return () => {
        clearTimeout(loadTimer);
        clearTimeout(welcomeTimer);
      };
    }
    return () => clearTimeout(loadTimer);
  }, []);

  const dismissWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('luz_y_luna_visited', 'true');
  };

  const addToCart = async (product: Product) => {
    setAddingProductId(product.id);
    
    // Simulate network delay for adding to cart
    await new Promise(resolve => setTimeout(resolve, 600));

    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    
    setAddingProductId(null);
    setShowCartPreview(true);
    // Auto-hide preview after 3 seconds
    setTimeout(() => setShowCartPreview(false), 3000);
  };

  const calculateAverageRating = (reviews?: Review[]) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const handleAddReview = (productId: number) => {
    if (!newReviewName || !newReviewComment) return;

    const newReview: Review = {
      id: Date.now().toString(),
      userName: newReviewName,
      rating: newReviewRating,
      comment: newReviewComment,
      date: new Date().toISOString().split('T')[0]
    };

    setProducts(prevProducts => prevProducts.map(p => {
      if (p.id === productId) {
        const updatedReviews = [...(p.reviews || []), newReview];
        const updatedProduct = { ...p, reviews: updatedReviews };
        if (selectedProduct?.id === productId) {
          setSelectedProduct(updatedProduct);
        }
        return updatedProduct;
      }
      return p;
    }));

    setNewReviewName('');
    setNewReviewComment('');
    setNewReviewRating(5);
  };

  const filteredProducts = products.filter(product => {
    const matchesFilter = filter === 'Todos' || product.category === filter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#4A4A4A] font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E5E5E5] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FFD93D] rounded-full flex items-center justify-center">
              <ShoppingBag className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-serif font-bold tracking-tight text-[#2D3436]">
              Luz y <span className="text-[#FF8B8B]">Luna Store</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium">
            <button 
              onClick={() => setFilter('Todos')}
              className={`transition-colors hover:text-[#FF8B8B] ${filter === 'Todos' ? 'text-[#FF8B8B] border-b-2 border-[#FF8B8B]' : ''}`}
            >
              Todos
            </button>
            <button 
              onClick={() => setFilter('Juguetes')}
              className={`transition-colors hover:text-[#FF8B8B] ${filter === 'Juguetes' ? 'text-[#FF8B8B] border-b-2 border-[#FF8B8B]' : ''}`}
            >
              Juguetes
            </button>
            <button 
              onClick={() => setFilter('Ropa')}
              className={`transition-colors hover:text-[#FF8B8B] ${filter === 'Ropa' ? 'text-[#FF8B8B] border-b-2 border-[#FF8B8B]' : ''}`}
            >
              Ropa
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar tesoros..."
                className="pl-10 pr-4 py-2 bg-[#F5F5F5] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD93D] w-48 md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowCartPreview(!showCartPreview)}
                className="relative p-2 hover:bg-[#F5F5F5] rounded-full transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF8B8B] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>

              {/* Cart Preview Dropdown */}
              <AnimatePresence>
                {showCartPreview && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-[#E5E5E5] overflow-hidden z-[60]"
                  >
                    <div className="p-4 border-b border-[#F5F5F5] flex items-center justify-between">
                      <h4 className="font-bold text-[#2D3436]">Tu Carrito</h4>
                      <button onClick={() => setShowCartPreview(false)}>
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                      {cartItems.length > 0 ? (
                        <div className="p-4 space-y-4">
                          {cartItems.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F9F9F9] shrink-0">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-[#2D3436] truncate">{item.product.name}</p>
                                <p className="text-xs text-gray-500">{item.quantity} x ${item.product.price.toFixed(2)}</p>
                              </div>
                              <p className="text-sm font-bold text-[#FF8B8B]">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-gray-400 italic text-sm">
                          Tu carrito está vacío
                        </div>
                      )}
                    </div>
                    {cartItems.length > 0 && (
                      <div className="p-4 bg-[#FDFCF8] border-t border-[#F5F5F5]">
                        <div className="flex justify-between mb-4">
                          <span className="text-sm font-bold text-gray-500">Total</span>
                          <span className="text-lg font-bold text-[#2D3436]">
                            ${cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0).toFixed(2)}
                          </span>
                        </div>
                        <button 
                          onClick={() => handleWhatsAppPurchase(cartItems)}
                          className="w-full py-3 bg-[#2D3436] text-white rounded-xl font-bold text-sm hover:bg-[#6BCB77] transition-colors flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Comprar por WhatsApp
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 py-12">
        <div className="max-w-7xl mx-auto bg-white rounded-[60px] border border-[#E5E5E5] shadow-xl shadow-[#2D3436]/5 overflow-hidden p-8 md:p-20 relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD93D]/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF8B8B]/10 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="relative grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 bg-[#E8F9FD] text-[#0AA1DD] rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                Nueva Colección 2024
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-[#2D3436] leading-tight mb-8">
                Donde la <span className="text-[#FFD93D]">magia</span> y el <span className="text-[#6BCB77]">estilo</span> se encuentran.
              </h2>
              <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
                Descubre nuestra selección exclusiva de juguetes artesanales y ropa de algodón orgánico para los más pequeños de la casa.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-10 py-5 bg-[#FF8B8B] text-white rounded-2xl font-bold shadow-lg shadow-[#FF8B8B]/30 hover:scale-105 transition-transform">
                  Ver Juguetes
                </button>
                <button className="px-10 py-5 bg-white border-2 border-[#E5E5E5] text-[#2D3436] rounded-2xl font-bold hover:bg-[#F5F5F5] transition-colors">
                  Ver Ropa
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl rotate-2">
                <img 
                  src="https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&q=80&w=1000" 
                  alt="Paisaje inspirador" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-[32px] shadow-2xl -rotate-3 hidden lg:block border border-[#F5F5F5]">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[#6BCB77] rounded-2xl flex items-center justify-center shadow-lg shadow-[#6BCB77]/20">
                    <ToyBrick className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-[#2D3436]">Calidad Premium</p>
                    <p className="text-sm text-gray-500">Materiales seguros</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h3 className="text-3xl font-serif font-bold text-[#2D3436]">Nuestros Tesoros</h3>
            <p className="text-gray-500">Explora nuestra colección seleccionada con amor</p>
          </div>
          <div className="flex gap-2 bg-white p-1 rounded-2xl border border-[#E5E5E5]">
            {(['Todos', 'Juguetes', 'Ropa'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  filter === cat 
                    ? 'bg-[#FFD93D] text-[#2D3436] shadow-md' 
                    : 'text-gray-500 hover:bg-[#F5F5F5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {isInitialLoading ? (
              // Skeleton Grid
              [...Array(8)].map((_, i) => (
                <div key={`skeleton-${i}`} className="bg-white rounded-3xl border border-[#E5E5E5] overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-100" />
                  <div className="p-6 space-y-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => <div key={j} className="w-3 h-3 bg-gray-100 rounded-full" />)}
                    </div>
                    <div className="h-6 bg-gray-100 rounded-lg w-3/4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-100 rounded-lg w-full" />
                      <div className="h-4 bg-gray-100 rounded-lg w-5/6" />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <div className="h-6 bg-gray-100 rounded-lg w-1/4" />
                      <div className="w-12 h-12 bg-gray-100 rounded-2xl" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              (showAllProducts ? filteredProducts : filteredProducts.slice(0, 8)).map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedProduct(product)}
                  className="group bg-white rounded-3xl border border-[#E5E5E5] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#F9F9F9]">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-[#FF8B8B] hover:bg-[#FF8B8B] hover:text-white transition-colors shadow-sm">
                      <Heart className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        product.category === 'Juguetes' ? 'bg-[#FFD93D] text-[#2D3436]' : 'bg-[#6BCB77] text-white'
                      }`}>
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.round(calculateAverageRating(product.reviews)) ? 'text-[#FFD93D] fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-[10px] text-gray-400 ml-1">
                        ({product.reviews?.length || 0})
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-[#2D3436] mb-2 group-hover:text-[#FF8B8B] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-[#2D3436]">
                        ${product.price.toFixed(2)}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        disabled={addingProductId === product.id}
                        className="p-3 bg-[#2D3436] text-white rounded-2xl hover:bg-[#FF8B8B] transition-colors shadow-lg shadow-black/10 disabled:opacity-70"
                      >
                        {addingProductId === product.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <ShoppingCart className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {!showAllProducts && filteredProducts.length > 8 && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => setShowAllProducts(true)}
              className="px-12 py-5 bg-[#2D3436] text-white rounded-2xl font-bold text-lg hover:bg-[#FF8B8B] transition-all shadow-xl shadow-black/10 hover:scale-105 active:scale-95"
            >
              Todos nuestros productos, ver más
            </button>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h4 className="text-xl font-bold text-[#2D3436]">No encontramos tesoros</h4>
            <p className="text-gray-500">Intenta buscar algo diferente.</p>
          </div>
        )}

        {/* Location Section */}
        <section className="mt-24 bg-white rounded-[40px] border border-[#E5E5E5] overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD93D]/10 text-[#2D3436] rounded-full text-xs font-bold uppercase tracking-wider mb-6 w-fit">
                <MapPin className="w-3 h-3" />
                Encuéntranos
              </div>
              <h3 className="text-4xl font-serif font-bold text-[#2D3436] mb-6">Visítanos en nuestra tienda</h3>
              <p className="text-gray-500 mb-10 text-lg leading-relaxed">
                Ven a descubrir nuestra colección en persona. Estamos ubicados en el corazón de la ciudad, listos para ayudarte a encontrar el regalo perfecto.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F5F5F5] rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#FF8B8B]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2D3436]">Dirección</p>
                    <p className="text-gray-500">Av. Principal 123, Centro Comercial Las Lunas, Local 45</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F5F5F5] rounded-2xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-[#FF8B8B]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2D3436]">Horario de Atención</p>
                    <p className="text-gray-500">Lunes a Sábado: 10:00 AM - 8:00 PM</p>
                    <p className="text-gray-500">Domingos: 11:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F5F5F5] rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-[#FF8B8B]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2D3436]">Contacto Directo</p>
                    <p className="text-gray-500">+51 928 567 606</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-auto bg-gray-100">
              <img 
                src="https://picsum.photos/seed/map-location/1200/1000" 
                alt="Ubicación Luz y Luna Store"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#FFD93D]/10 mix-blend-multiply" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FF8B8B] rounded-full animate-ping opacity-20" />
                  <div className="relative w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-[#FF8B8B] fill-current" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5E5E5] pt-16 pb-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#FFD93D] rounded-full flex items-center justify-center">
                  <ShoppingBag className="text-white w-5 h-5" />
                </div>
                <h1 className="text-xl font-serif font-bold tracking-tight text-[#2D3436]">
                  Luz y <span className="text-[#FF8B8B]">Luna Store</span>
                </h1>
              </div>
              <p className="text-gray-500 max-w-sm mb-6">
                Creando momentos inolvidables para tus hijos con productos de la más alta calidad y diseño.
              </p>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#F5F5F5] rounded-full hover:bg-[#FFD93D] transition-colors cursor-pointer flex items-center justify-center text-[#2D3436]">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#F5F5F5] rounded-full hover:bg-[#FFD93D] transition-colors cursor-pointer flex items-center justify-center text-[#2D3436]">
                  <TikTokIcon className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#F5F5F5] rounded-full hover:bg-[#FFD93D] transition-colors cursor-pointer flex items-center justify-center text-[#2D3436]">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold text-[#2D3436] mb-6">Tienda</h5>
              <ul className="space-y-4 text-sm text-gray-500">
                <li onClick={() => setFilter('Juguetes')} className="hover:text-[#FF8B8B] cursor-pointer transition-colors">Juguetes</li>
                <li onClick={() => setFilter('Ropa')} className="hover:text-[#FF8B8B] cursor-pointer transition-colors">Ropa</li>
                <li onClick={() => setFilter('Todos')} className="hover:text-[#FF8B8B] cursor-pointer transition-colors">Todos los Productos</li>
                <li className="hover:text-[#FF8B8B] cursor-pointer transition-colors">Ofertas</li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-[#2D3436] mb-6">Ayuda</h5>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="hover:text-[#FF8B8B] cursor-pointer">Envíos</li>
                <li className="hover:text-[#FF8B8B] cursor-pointer">Devoluciones</li>
                <li className="hover:text-[#FF8B8B] cursor-pointer">Contacto</li>
                <li className="hover:text-[#FF8B8B] cursor-pointer">FAQ</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#F5F5F5] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400">
              © 2024 Luz y Luna Store. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-xs text-gray-400">
              <span className="hover:text-[#FF8B8B] cursor-pointer">Privacidad</span>
              <span className="hover:text-[#FF8B8B] cursor-pointer">Términos</span>
              <span className="hover:text-[#FF8B8B] cursor-pointer">Cookies</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-[#2D3436]/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[600px] max-h-[90vh] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full text-[#2D3436] hover:bg-[#FF8B8B] hover:text-white transition-colors shadow-sm"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="overflow-y-auto custom-scrollbar">
                <div className="w-full aspect-square sm:aspect-video bg-[#F9F9F9]">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-8 sm:p-10">
                  <div className="mb-8">
                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block ${
                      selectedProduct.category === 'Juguetes' ? 'bg-[#FFD93D] text-[#2D3436]' : 'bg-[#6BCB77] text-white'
                    }`}>
                      {selectedProduct.category}
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-[#2D3436] mb-3">
                      {selectedProduct.name}
                    </h2>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.round(calculateAverageRating(selectedProduct.reviews)) ? 'text-[#FFD93D] fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-[#2D3436]">
                        {calculateAverageRating(selectedProduct.reviews).toFixed(1)} ({selectedProduct.reviews?.length || 0} reseñas)
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-[#FF8B8B] mb-4">
                      ${selectedProduct.price.toFixed(2)}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-4 p-4 bg-[#FDFCF8] rounded-2xl border border-[#E5E5E5]">
                      <div className="w-10 h-10 bg-[#E8F9FD] rounded-full flex items-center justify-center">
                        <ToyBrick className="text-[#0AA1DD] w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Envío Gratis</p>
                        <p className="text-xs text-gray-500">En pedidos superiores a $50</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        addToCart(selectedProduct);
                        if (addingProductId === null) setSelectedProduct(null);
                      }}
                      disabled={addingProductId === selectedProduct.id}
                      className="w-full py-5 bg-[#2D3436] text-white rounded-2xl font-bold text-lg hover:bg-[#FF8B8B] transition-colors shadow-xl shadow-black/10 flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                      {addingProductId === selectedProduct.id ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <ShoppingCart className="w-6 h-6" />
                      )}
                      {addingProductId === selectedProduct.id ? 'Añadiendo...' : 'Añadir al Carrito'}
                    </button>

                    <button 
                      onClick={() => handleSingleProductWhatsApp(selectedProduct)}
                      className="w-full py-4 bg-[#FDFCF8] text-[#2D3436] border-2 border-[#E5E5E5] rounded-2xl font-bold text-base hover:bg-[#E8F9FD] hover:border-[#0AA1DD] transition-all flex items-center justify-center gap-3"
                    >
                      <MessageSquare className="w-5 h-5 text-[#0AA1DD]" />
                      Comprar por WhatsApp
                    </button>
                  </div>

                  {/* Reviews Section */}
                  <div className="border-t border-[#F5F5F5] pt-8">
                    <h3 className="text-xl font-bold text-[#2D3436] mb-6">Reseñas de Clientes</h3>
                    
                    {/* Review Form */}
                    <div className="bg-[#FDFCF8] p-6 rounded-3xl border border-[#E5E5E5] mb-8">
                      <h4 className="text-sm font-bold text-[#2D3436] mb-4">Deja tu opinión</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setNewReviewRating(star)}
                              className="focus:outline-none"
                            >
                              <Star 
                                className={`w-6 h-6 transition-colors ${star <= newReviewRating ? 'text-[#FFD93D] fill-current' : 'text-gray-300'}`} 
                              />
                            </button>
                          ))}
                        </div>
                        <input 
                          type="text" 
                          placeholder="Tu nombre"
                          className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD93D]"
                          value={newReviewName}
                          onChange={(e) => setNewReviewName(e.target.value)}
                        />
                        <textarea 
                          placeholder="¿Qué te pareció el producto?"
                          className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD93D] min-h-[100px]"
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                        />
                        <button 
                          onClick={() => handleAddReview(selectedProduct.id)}
                          disabled={!newReviewName || !newReviewComment}
                          className="w-full py-3 bg-[#6BCB77] text-white rounded-xl font-bold text-sm hover:bg-[#5bb866] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Publicar Reseña
                        </button>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                      {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
                        selectedProduct.reviews.map((review) => (
                          <div key={review.id} className="border-b border-[#F5F5F5] pb-6 last:border-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#E8F9FD] rounded-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-[#0AA1DD]" />
                                </div>
                                <span className="font-bold text-sm text-[#2D3436]">{review.userName}</span>
                              </div>
                              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{review.date}</span>
                            </div>
                            <div className="flex mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${i < review.rating ? 'text-[#FFD93D] fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {review.comment}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-400 italic text-sm">
                          Sé el primero en dejar una reseña para este producto.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Welcome Message */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[110] max-w-sm bg-white rounded-[24px] shadow-2xl border border-[#FFD93D]/30 p-6"
          >
            <button 
              onClick={dismissWelcome}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-[#FF8B8B] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFD93D] rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-[#FFD93D]/20">
                <Heart className="text-white w-6 h-6 fill-current" />
              </div>
              <div>
                <h4 className="font-bold text-[#2D3436] mb-1">¡Hola! Bienvenido</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Estamos felices de tenerte en <strong>Luz y Luna Store</strong>. Explora nuestra colección mágica creada con amor.
                </p>
                <button 
                  onClick={dismissWelcome}
                  className="mt-4 text-xs font-bold text-[#FF8B8B] hover:underline"
                >
                  Entendido, ¡gracias!
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
