import { useState, useEffect, useRef } from 'react';
import {
  ShoppingCart, Menu, X, ChevronDown, ChevronUp, Plus, Minus,
  Phone, MapPin, Mail, ArrowUp, Star, Award, Users, Heart,
  Play, ExternalLink, Check
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About the League', href: '#about' },
  { label: 'The Game', href: '#game' },
  { label: 'Store', href: '#store' },
  { label: 'Charitable Work', href: '#charity' },
  { label: 'Play Online', href: '#play-online' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const PRODUCTS = [
  // Rule Cards
  { id: 1, category: 'Rule Cards', name: '2026 Card (Standard Size)', price: 14.00, description: '5\u215b" x 4" \u2014 Official annual rule card', badge: 'Featured' },
  { id: 2, category: 'Rule Cards', name: '2026 Card (Large Size)', price: 15.00, description: '6\u215b" x 4\u00be" \u2014 Large print edition', badge: 'Featured' },
  { id: 3, category: 'Rule Cards', name: '2026 Mega Card', price: 35.00, description: '3 Panels Front & Back (8.5" x 11") \u2014 Ships late March', badge: 'Featured' },
  { id: 4, category: 'Rule Cards', name: '2025 Card (Standard Size)', price: 14.00, description: '5\u215b" x 4" \u2014 Previous year card' },
  { id: 5, category: 'Rule Cards', name: '2025 Card (Large Size)', price: 15.00, description: '6\u215b" x 4\u00be" \u2014 Previous year large print' },
  // Game Subscriptions
  { id: 6, category: 'Game Subscriptions', name: 'Monthly Subscription', price: 4.99, priceLabel: '$4.99/mo', description: 'Play NMJL Mah Jongg online', noRefund: true },
  { id: 7, category: 'Game Subscriptions', name: 'Quarterly Subscription', price: 12.99, priceLabel: '$12.99/3mo', description: 'Save with 3-month access', noRefund: true },
  { id: 8, category: 'Game Subscriptions', name: 'Yearly Subscription', price: 49.99, priceLabel: '$49.99/yr', description: 'Best value \u2014 full year access', badge: 'Best Value', noRefund: true },
  // Tiles & Sets
  { id: 9, category: 'Tiles & Sets', name: 'White Tiles Only', price: 85.00, description: '1 3/16" H, 7/8" W, 9/16" D' },
  { id: 10, category: 'Tiles & Sets', name: 'Pink Tiles Only', price: 165.00, description: '1 3/16" H, 7/8" W, 9/16" D' },
  { id: 11, category: 'Tiles & Sets', name: 'Green Tiles Only', price: 165.00, description: '1 3/16" H, 7/8" W, 9/16" D' },
  { id: 12, category: 'Tiles & Sets', name: 'Black Tiles Only', price: 165.00, description: '1 3/16" H, 7/8" W, 9/16" D' },
  { id: 13, category: 'Tiles & Sets', name: 'Red Tiles Only', price: 165.00, description: '1 3/16" H, 7/8" W, 9/16" D' },
  { id: 14, category: 'Tiles & Sets', name: 'Soft Black Bag Complete Set', price: 199.00, description: 'Lightweight bag, white tiles, 4 acrylic color racks, instruction book, bettor, current score card', badge: 'Complete Set' },
  { id: 15, category: 'Tiles & Sets', name: 'Lightweight Microfibre Carrying Case (Black)', price: 88.00, description: 'Two black plastic trays & two strap wraps. Compatible with white tiles only.' },
  // Accessories
  { id: 16, category: 'Accessories', name: 'Table Cover w/ Plastic Carrying Case', price: 60.00, description: '40" x 40" with snaps to reduce to 37" x 37"' },
  { id: 17, category: 'Accessories', name: 'Plastic Card Holder (Standard)', price: 9.00, description: 'Holds standard size rule card' },
  { id: 18, category: 'Accessories', name: 'Plastic Card Holder (Large)', price: 10.00, description: 'Holds large size rule card' },
  { id: 19, category: 'Accessories', name: 'Bettor', price: 12.00, description: 'Official NMJL bettor' },
  { id: 20, category: 'Accessories', name: 'Joker Decals (Pkg of 8)', price: 5.95, description: 'Pack of 8 replacement joker stickers' },
  { id: 21, category: 'Accessories', name: 'Money Chips (100 Chips)', price: 9.50, description: '20 Blue, 20 Green, 20 Red, 20 White, 20 Yellow' },
  { id: 22, category: 'Accessories', name: 'Helping Hands / Pushers (Set of 4)', price: 48.00, description: 'Acrylic pushers set of 4' },
  { id: 23, category: 'Accessories', name: 'Racks Set of 4 (Pushers NOT Included)', price: 52.00, description: 'Acrylic Pink, Green, Yellow, Blue colored racks' },
  { id: 24, category: 'Accessories', name: 'Smoky Racks (Set of 4)', price: 52.00, description: 'Plastic smoky-colored racks' },
  { id: 25, category: 'Accessories', name: 'Mah Jongg Playing Kards', price: 30.00, description: 'Card-based version of the game' },
  { id: 26, category: 'Accessories', name: 'Mah Jongg Playing Kards w/ Instruction Book', price: 38.00, description: 'Cards + official instruction book' },
  // Apparel
  { id: 27, category: 'Apparel', name: 'Mah Jongg Sweatshirt \u2014 Medium', price: 35.00, description: 'Pullover, white only, multi-color imprint' },
  { id: 28, category: 'Apparel', name: 'Mah Jongg Sweatshirt \u2014 Large', price: 35.00, description: 'Pullover, white only, multi-color imprint' },
  { id: 29, category: 'Apparel', name: 'Mah Jongg Sweatshirt \u2014 XXL', price: 35.00, description: 'Pullover, white only, multi-color imprint' },
  { id: 30, category: 'Apparel', name: 'Mah Jongg T-Shirt \u2014 Medium', price: 27.00, description: 'Pullover, white only, multi-color imprint' },
  { id: 31, category: 'Apparel', name: 'Mah Jongg T-Shirt \u2014 Large', price: 27.00, description: 'Pullover, white only, multi-color imprint' },
  { id: 32, category: 'Apparel', name: 'Mah Jongg T-Shirt \u2014 XL', price: 27.00, description: 'Pullover, white only, multi-color imprint' },
  // Books
  { id: 33, category: 'Books', name: '"Mah Jongg Made Easy" \u2014 Revised 2024', price: 15.95, description: 'The official NMJL instruction book' },
];

const STORE_CATEGORIES = ['All', 'Rule Cards', 'Game Subscriptions', 'Tiles & Sets', 'Accessories', 'Apparel', 'Books'];

const FAQS = [
  { q: 'What sizes do the rule cards come in?', a: 'Standard (5\u215b" x 4") for $14, and Large Print (6\u215b" x 4\u00be") for $15.' },
  { q: 'When are the new cards available?', a: 'Cards are available for pre-order each January. They ship in two batches \u2014 January/February orders ship first (late March/early April), later orders ship around late April/early May.' },
  { q: 'Can I order by mail?', a: 'Yes. Send your check to: NMJL, PO Box 50003, Newark NJ 07101-8006. Include your name, address, and exact number of cards ordered.' },
  { q: 'Can a misnamed Joker be called for Mah Jongg?', a: 'Yes. A misnamed Joker may be called for Mah Jongg. This is the only time a Joker may be called. The player who discarded the tile pays 4 times the value of the hand. Other players do not pay.' },
  { q: 'How do I contact the League with a rules question?', a: 'Call us at (212) 246-3052 or write to us at 450 7th Avenue, Suite 405, New York, NY 10123. Please include a self-addressed stamped envelope.' },
  { q: 'Are there refunds on game subscriptions?', a: 'No. There are no refunds on game subscription purchases or any other digital content.' },
  { q: 'When two players want the same discard?', a: 'When one player wants a discard for an Exposure and another for Mah Jongg, the Mah Jongg declarer always has preference, even if the caller for an Exposure has begun to expose tiles.' },
  { q: 'Where can I buy official NMJL cards?', a: 'Official cards are available exclusively through our online store at nationalmahjonggleague.org or through registered card collectors. Beware of counterfeit cards sold on Amazon and other marketplaces.' },
];

const CHARITIES = [
  "Alzheimer's Association", 'American Cancer Society', 'American Diabetes Association',
  'American Heart Association', 'American Red Cross', 'Brandeis University',
  'City of Hope', 'C.A.R.E.', 'Cystic Fibrosis Foundation', 'Food Bank NYC',
  'Habitat For Humanity', 'Hadassah', 'Make A Wish Foundation', 'Meals on Wheels',
  'Ronald McDonald House', 'Salvation Army', 'Shriners Hospital',
  "St. Jude's Children's Hospital", 'Susan G. Komen Foundation',
];

const HERO_IMAGES = [
  'https://www.nationalmahjonggleague.org/images/NMJLimage1.png',
  'https://www.nationalmahjonggleague.org/images/NMJLimage2.png',
  'https://www.nationalmahjonggleague.org/images/NMJLimage3.png',
  'https://www.nationalmahjonggleague.org/images/NMJLimage4.png',
];

// ─── BADGE ────────────────────────────────────────────────────────────────────
function Badge({ label }) {
  const styles = {
    'Featured': 'bg-amber-500 text-white',
    'Best Value': 'bg-emerald-700 text-white',
    'Complete Set': 'bg-red-800 text-white',
  };
  return (
    <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-0.5 rounded-full z-10 ${styles[label] || 'bg-gray-500 text-white'}`}>
      {label}
    </span>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ product, onAddToCart }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const displayPrice = product.priceLabel || `$${product.price.toFixed(2)}`;

  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-stone-100 flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200">
      {product.badge && <Badge label={product.badge} />}
      <div className="h-40 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a5c3a 0%, #2d7a52 100%)' }}>
        <span className="text-5xl select-none" role="img" aria-hidden="true">🀄</span>
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-semibold text-sm leading-snug text-stone-800">{product.name}</h3>
        <p className="text-xs text-stone-500 leading-relaxed flex-1">{product.description}</p>
        {product.noRefund && (
          <p className="text-xs text-red-600 italic">No refunds on digital content</p>
        )}
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold" style={{ color: '#1a5c3a' }}>{displayPrice}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="w-6 text-center text-sm font-medium">{qty}</span>
            <button
              onClick={() => setQty(q => q + 1)}
              className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="mt-1 w-full py-2.5 rounded-xl font-medium text-sm transition-all duration-200 text-white hover:opacity-90"
          style={{ background: added ? '#059669' : 'linear-gradient(135deg, #1a5c3a, #2d7a52)' }}
        >
          {added
            ? <span className="flex items-center justify-center gap-1"><Check size={14} /> Added!</span>
            : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

// ─── CART DRAWER ──────────────────────────────────────────────────────────────
function CartDrawer({ cart, open, onClose, onUpdateQty, onRemove }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}
      <div
        className="fixed top-0 right-0 h-full bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 w-full sm:w-96"
        style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <h2 className="text-xl font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>Your Cart</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-100 transition-colors" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <p className="text-stone-500 text-center mt-12">Your cart is empty.</p>
          ) : cart.map(item => (
            <div key={item.id} className="flex gap-3 items-start">
              <div className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #1a5c3a, #2d7a52)' }}>
                🀄
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-snug text-stone-800">{item.name}</p>
                <p className="text-sm font-semibold" style={{ color: '#1a5c3a' }}>${(item.price * item.qty).toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button onClick={() => onUpdateQty(item.id, item.qty - 1)} className="w-6 h-6 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-100" aria-label="Decrease"><Minus size={10} /></button>
                  <span className="text-sm w-4 text-center">{item.qty}</span>
                  <button onClick={() => onUpdateQty(item.id, item.qty + 1)} className="w-6 h-6 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-100" aria-label="Increase"><Plus size={10} /></button>
                  <button onClick={() => onRemove(item.id)} className="ml-auto text-xs text-stone-400 hover:text-red-500 transition-colors">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="p-5 border-t border-stone-100 space-y-3">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span style={{ color: '#1a5c3a' }}>${total.toFixed(2)}</span>
            </div>
            <button className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, #1a5c3a, #2d7a52)' }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ toasts }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 space-y-2 pointer-events-none" style={{ transform: 'translateX(-50%)' }}>
      {toasts.map(t => (
        <div key={t.id} className="bg-stone-900 text-white text-sm px-5 py-3 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap">
          <Check size={14} className="text-emerald-400" /> {t.msg}
        </div>
      ))}
    </div>
  );
}

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left flex items-center justify-between p-5 hover:bg-stone-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-medium text-stone-800 pr-4 text-sm sm:text-base">{faq.q}</span>
        {open
          ? <ChevronUp size={18} className="flex-shrink-0" style={{ color: '#1a5c3a' }} />
          : <ChevronDown size={18} className="text-stone-400 flex-shrink-0" />
        }
      </button>
      {open && (
        <div className="px-5 pb-5 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-4">
          {faq.a}
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [storeCategory, setStoreCategory] = useState('All');
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [heroImg, setHeroImg] = useState(0);
  const toastId = useRef(0);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroImg(i => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  function addToCart(product, qty) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
    const id = ++toastId.current;
    setToasts(t => [...t, { id, msg: `${product.name} added to cart` }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2500);
  }

  function updateQty(id, qty) {
    if (qty <= 0) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const filteredProducts = storeCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === storeCategory);

  function scrollTo(href) {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  }

  const navTextColor = scrolled ? 'text-stone-600' : 'text-white/90';
  const navHoverColor = scrolled ? 'hover:text-[#1a5c3a]' : 'hover:text-white';
  const iconColor = scrolled ? 'text-stone-700' : 'text-white';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf8f3' }}>

      {/* ── NAVIGATION ── */}
      <header className="fixed top-0 left-0 right-0 z-30 transition-all duration-300"
        style={{ background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent', boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <button onClick={() => scrollTo('#home')} className="flex items-center gap-3 flex-shrink-0">
              <img
                src="https://www.nationalmahjonggleague.org/images/rsz_1rsz_1rsz_mahjong.png"
                alt="National Mah Jongg League Logo"
                className="h-10 lg:h-12 w-auto"
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div className="hidden sm:block">
                <div className={`text-xs font-semibold tracking-widest uppercase ${scrolled ? 'text-[#1a5c3a]' : 'text-white'}`}>National</div>
                <div className={`text-sm font-bold leading-tight ${scrolled ? 'text-stone-800' : 'text-white'}`} style={{ fontFamily: 'Playfair Display, serif' }}>Mah Jongg League</div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-5">
              {NAV_LINKS.map(l => (
                <button key={l.href} onClick={() => scrollTo(l.href)} className={`text-sm font-medium transition-colors ${navTextColor} ${navHoverColor}`}>
                  {l.label}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollTo('#store')}
                className="hidden sm:block text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #b8960c, #d4af37)', color: '#1a1a1a' }}
              >
                Order 2026 Card
              </button>
              <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Open cart">
                <ShoppingCart size={22} className={iconColor} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ background: '#8b1a2e' }}>
                    {cartCount}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileMenuOpen(o => !o)} className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Toggle menu">
                {mobileMenuOpen
                  ? <X size={22} className={iconColor} />
                  : <Menu size={22} className={iconColor} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-stone-100 shadow-lg">
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(l => (
                <button key={l.href} onClick={() => scrollTo(l.href)} className="block w-full text-left px-4 py-3 rounded-xl text-stone-700 hover:bg-stone-50 font-medium text-sm transition-colors">
                  {l.label}
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => { scrollTo('#store'); }}
                  className="w-full font-semibold px-4 py-3 rounded-xl text-stone-900 text-sm"
                  style={{ background: 'linear-gradient(135deg, #b8960c, #d4af37)' }}
                >
                  Order 2026 Card
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {HERO_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === heroImg ? 1 : 0 }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,40,25,0.82) 0%, rgba(26,92,58,0.65) 50%, rgba(10,20,35,0.78) 100%)' }} />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase mb-6 px-4 py-2 rounded-full" style={{ border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.08)' }}>
            <span style={{ color: '#d4af37' }}>★</span> Est. 1937 &mdash; New York City
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            Celebrating 89 Years of American Mah Jongg
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.85)' }}>
            The official home of American Mah Jongg since 1937. Join 350,000+ members and keep the tradition alive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo('#store')}
              className="px-8 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all hover:opacity-90 hover:scale-105 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #b8960c, #d4af37)', color: '#1a1a1a' }}
            >
              Order Your 2026 Card
            </button>
            <button
              onClick={() => scrollTo('#game')}
              className="px-8 py-4 rounded-xl font-semibold text-base sm:text-lg text-white transition-all hover:bg-white/20"
              style={{ border: '2px solid rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.08)' }}
            >
              Learn the Game
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 text-white/50 animate-bounce" style={{ transform: 'translateX(-50%)' }}>
          <ChevronDown size={28} />
        </div>
      </section>

      {/* ── ANNOUNCEMENT BANNER ── */}
      <div style={{ background: 'linear-gradient(135deg, #1a5c3a, #2d7a52)' }} className="py-4 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-white text-sm sm:text-base text-center">
          <span className="text-xl">🀄</span>
          <p className="font-medium">
            <strong>2026 Rule Cards</strong> are now available for pre-order! Cards ship beginning of April.
          </p>
          <button onClick={() => scrollTo('#store')} className="flex-shrink-0 underline font-semibold hover:no-underline" style={{ color: '#d4af37' }}>
            Order yours today &rarr;
          </button>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 lg:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ color: '#1a5c3a', background: 'rgba(26,92,58,0.08)' }}>
                Our Heritage
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif', color: '#1a1a1a' }}>
                About the National<br />Mah Jongg League
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6 text-base sm:text-lg">
                For over 89 years, the National Mah Jongg League has been the arbitrator for everything that relates to American Mah Jongg &mdash; standardizing rules, championing players, and building community.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Founded in 1937 in New York City to standardize the game',
                  'Started with 32 members \u2014 now 350,000+ strong',
                  'Publishes the official American rules card annually',
                  'Sells merchandise for playing the game',
                  'Answers questions and arbitrates game disputes',
                  'Makes numerous donations to charitable organizations',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ background: 'rgba(26,92,58,0.1)' }}>
                      <Check size={11} style={{ color: '#1a5c3a' }} />
                    </div>
                    <span className="text-stone-700 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
              <blockquote className="border-l-4 pl-5 italic text-stone-600" style={{ borderColor: '#d4af37' }}>
                "For over 86 years, the National Mah Jongg League has been the arbitrator for everything that relates to American Maajh."
              </blockquote>
            </div>
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://www.nationalmahjonggleague.org/images/league_01.jpg"
                  alt="The National Mah Jongg League"
                  className="w-full h-64 sm:h-72 object-cover"
                  loading="lazy"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800&q=80'; }}
                />
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Our Journey</h3>
                <div className="space-y-4">
                  {[
                    { year: '1937', label: 'Founded in New York City with 32 charter members' },
                    { year: '1965', label: "Ruth Unger becomes president, shaping the League's modern era" },
                    { year: '2015', label: 'David & Larry Unger take leadership of the League' },
                    { year: 'Today', label: '350,000+ members across North America' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-12 text-xs font-bold text-center pt-0.5" style={{ color: '#d4af37' }}>{item.year}</div>
                      <div className="flex gap-3 items-start flex-1">
                        <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#1a5c3a' }} />
                        <p className="text-sm text-stone-600">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
            {[
              { icon: <Users size={24} />, value: '350,000+', label: 'Active Members' },
              { icon: <Award size={24} />, value: '89 Years', label: 'Of Excellence' },
              { icon: <Star size={24} />, value: 'Est. 1937', label: 'New York City' },
              { icon: <Heart size={24} />, value: '$3M+', label: 'Donated to Charity' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-stone-100">
                <div className="flex justify-center mb-3" style={{ color: '#1a5c3a' }}>{s.icon}</div>
                <div className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'Playfair Display, serif' }}>{s.value}</div>
                <div className="text-sm text-stone-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE GAME ── */}
      <section id="game" className="py-20 lg:py-28 px-6" style={{ background: 'linear-gradient(180deg, #f0ede4 0%, #faf8f3 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ color: '#1a5c3a', background: 'rgba(26,92,58,0.08)' }}>
              Learn to Play
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a1a1a' }}>
              The Game of Mah Jongg
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto text-base sm:text-lg">
              A fascinating, rummy-like game played with tiles &mdash; centuries of tradition reimagined for the American table.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://www.nationalmahjonggleague.org/images/game_01.jpg"
                alt="The Game of Mah Jongg"
                className="w-full h-72 sm:h-80 object-cover"
                loading="lazy"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800&q=80'; }}
              />
            </div>
            <div className="space-y-5">
              <p className="text-stone-700 leading-relaxed text-base sm:text-lg">
                Mah Jongg (or <em>Maahj</em>, as it is often called) is a fascinating, rummy-like game played with tiles rather than cards. Originating in China and popularized in the United States by Joseph Babcock in the early 20th century, American Mah Jongg has evolved into its own rich tradition.
              </p>
              <p className="text-stone-700 leading-relaxed">
                American Mah Jongg differs significantly from International styles &mdash; it uses a card of Standard Hands that changes annually, employs Joker tiles, begins with the "Charleston" (a structured passing of tiles), and allows quints and sextets.
              </p>
              <p className="text-stone-700 leading-relaxed">
                "Mah Jongg is enjoying a resurgence in popularity, with millions of dedicated players around the world." The NMJL has been at the center of that tradition since 1937.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '🀄', title: 'Annual Standard Hands Card', desc: 'A new official card each year keeps the game fresh and competitive.' },
              { icon: '🃏', title: 'Joker Tiles', desc: 'Unique to American Mah Jongg \u2014 wild tiles that add strategic depth.' },
              { icon: '🔄', title: 'The Charleston', desc: 'A structured pre-game tile exchange that defines American Maahj.' },
              { icon: '🏆', title: 'Quints & Sextets', desc: 'Powerful multi-tile combinations exclusive to the American game.' },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-stone-100 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl sm:text-4xl mb-3">{card.icon}</div>
                <h3 className="font-semibold text-stone-800 mb-2 text-xs sm:text-sm leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>{card.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORE ── */}
      <section id="store" className="py-20 lg:py-28 px-6" style={{ background: '#faf8f3' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ color: '#1a5c3a', background: 'rgba(26,92,58,0.08)' }}>
              Official Shop
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#1a1a1a' }}>
              The Official NMJL Store
            </h2>
            <p className="text-stone-500 text-base sm:text-lg">Everything you need for your Mah Jongg game</p>
          </div>

          {/* Category Tabs */}
          <div className="overflow-x-auto pb-2 mb-8 -mx-6 px-6">
            <div className="flex gap-2 min-w-max">
              {STORE_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setStoreCategory(cat)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border"
                  style={
                    storeCategory === cat
                      ? { background: 'linear-gradient(135deg, #1a5c3a, #2d7a52)', color: 'white', borderColor: 'transparent' }
                      : { background: 'white', color: '#57534e', borderColor: '#e7e5e4' }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {(storeCategory === 'All' || storeCategory === 'Game Subscriptions') && (
            <div className="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50 text-sm text-amber-800 max-w-2xl mx-auto text-center">
              <strong>Please note:</strong> No refunds on game subscriptions or any digital content.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
            ))}
          </div>
          <p className="text-center text-stone-400 text-sm mt-10">
            {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''}{storeCategory !== 'All' ? ` in ${storeCategory}` : ' in catalog'}
          </p>
        </div>
      </section>

      {/* ── CHARITABLE WORK ── */}
      <section id="charity" className="py-20 lg:py-28 px-6" style={{ background: 'linear-gradient(180deg, #1a3326 0%, #0f2018 100%)' }}>
        <div className="max-w-7xl mx-auto text-white">
          <div className="text-center mb-14">
            <div className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4 border" style={{ color: '#d4af37', borderColor: 'rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.08)' }}>
              Our Mission
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
              Giving Back &mdash; Our Charitable Mission
            </h2>
            <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Each year, proceeds from sales of the League's Official Rule Cards go directly to charitable organizations across the country.
            </p>
          </div>
          <div className="max-w-2xl mx-auto mb-14 rounded-2xl p-8 text-center border" style={{ background: 'rgba(212,175,55,0.08)', borderColor: 'rgba(212,175,55,0.25)' }}>
            <div className="text-5xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#d4af37' }}>$3,000,000</div>
            <p className="text-base sm:text-lg" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Gift to Valley Hospital in Paramus, NJ for a post-partum floor &mdash; one of our most significant charitable contributions.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-14">
            {CHARITIES.map(name => (
              <div key={name} className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Heart size={13} style={{ color: '#d4af37', flexShrink: 0 }} />
                <span className="text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>{name}</span>
              </div>
            ))}
          </div>
          <blockquote className="max-w-2xl mx-auto text-center">
            <p className="text-lg sm:text-xl italic leading-relaxed mb-4" style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(255,255,255,0.85)' }}>
              "The National Mah Jongg League has always believed that the joy of this game should extend beyond the table &mdash; to the communities and causes that need it most."
            </p>
            <footer className="text-sm font-semibold" style={{ color: '#d4af37' }}>&mdash; David Unger, National Mah Jongg League</footer>
          </blockquote>
        </div>
      </section>

      {/* ── PLAY ONLINE ── */}
      <section id="play-online" className="py-20 lg:py-28 px-6" style={{ background: '#faf8f3' }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ color: '#1a5c3a', background: 'rgba(26,92,58,0.08)' }}>
            Digital Play
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a1a1a' }}>
            Play Mah Jongg Online
          </h2>
          <p className="text-stone-600 text-base sm:text-lg mb-10 max-w-xl mx-auto">
            Play the official NMJL version of Mah Jongg from anywhere, anytime &mdash; on your computer or mobile device.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {[
              { name: 'Monthly', price: '$4.99', period: '/month', desc: 'Perfect for trying it out', featured: false },
              { name: 'Yearly', price: '$49.99', period: '/year', desc: 'Best value \u2014 save over 16%', featured: true },
              { name: 'Quarterly', price: '$12.99', period: '/3 months', desc: 'Flexible seasonal play', featured: false },
            ].map(p => (
              <div
                key={p.name}
                className="rounded-2xl p-7 text-left transition-all"
                style={p.featured
                  ? { background: 'linear-gradient(135deg, #1a5c3a, #2d7a52)', boxShadow: '0 8px 32px rgba(26,92,58,0.3)', color: 'white' }
                  : { background: 'white', border: '1px solid #e7e5e4' }
                }
              >
                {p.featured && <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#d4af37' }}>Most Popular</div>}
                <div className="text-sm font-medium mb-1" style={{ color: p.featured ? 'rgba(255,255,255,0.75)' : '#78716c' }}>{p.name}</div>
                <div className="text-4xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: p.featured ? 'white' : '#1c1917' }}>
                  {p.price}<span className="text-base font-normal" style={{ color: p.featured ? 'rgba(255,255,255,0.6)' : '#a8a29e' }}>{p.period}</span>
                </div>
                <p className="text-sm mb-5" style={{ color: p.featured ? 'rgba(255,255,255,0.75)' : '#78716c' }}>{p.desc}</p>
                <button
                  onClick={() => scrollTo('#store')}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={p.featured
                    ? { background: 'white', color: '#1a5c3a' }
                    : { background: 'linear-gradient(135deg, #1a5c3a, #2d7a52)', color: 'white' }
                  }
                >
                  Subscribe Now
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://play.nmjlonline.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 transition-all hover:bg-stone-50"
              style={{ borderColor: '#1a5c3a', color: '#1a5c3a' }}
            >
              <Play size={16} /> Already have an account? Click here to play <ExternalLink size={14} />
            </a>
          </div>
          <p className="text-xs text-stone-400 mt-4">No refunds on game subscriptions or digital content.</p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 lg:py-28 px-6" style={{ background: '#f0ede4' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ color: '#1a5c3a', background: 'rgba(26,92,58,0.08)' }}>
              Help
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1a1a1a' }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 lg:py-28 px-6" style={{ background: '#faf8f3' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ color: '#1a5c3a', background: 'rgba(26,92,58,0.08)' }}>
              Get in Touch
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#1a1a1a' }}>
              Contact Us
            </h2>
            <p className="text-stone-500 text-base sm:text-lg max-w-xl mx-auto">
              Our Mahj experts are happy to answer your questions about rules, hands, and game disputes.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-5">
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-stone-100 space-y-5">
                {[
                  { icon: <MapPin size={18} />, title: 'Address', content: <>The National Mah Jongg League, Inc.<br />450 7th Avenue, Suite 405<br />New York, NY 10123</> },
                  { icon: <Phone size={18} />, title: 'Phone', content: <a href="tel:+12122463052" className="hover:text-[#1a5c3a] transition-colors">(212) 246-3052</a> },
                  { icon: <Mail size={18} />, title: 'Mail Orders', content: <>NMJL, PO Box 50003<br />Newark NJ 07101-8006</> },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(26,92,58,0.08)', color: '#1a5c3a' }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-stone-800 mb-1 text-sm">{item.title}</div>
                      <div className="text-stone-500 text-sm leading-relaxed">{item.content}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl overflow-hidden shadow-sm border border-stone-100 h-52 flex items-center justify-center" style={{ background: '#e8e0d0' }}>
                <div className="text-center text-stone-500">
                  <MapPin size={32} className="mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-medium">450 7th Ave, New York, NY</p>
                  <p className="text-xs text-stone-400 mt-1">Midtown Manhattan</p>
                </div>
              </div>
            </div>
            <form
              className="bg-white rounded-2xl p-7 shadow-sm border border-stone-100 space-y-4"
              onSubmit={e => { e.preventDefault(); alert('Thank you! Your message has been sent. We\'ll be in touch soon.'); }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Name</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm outline-none focus:border-[#1a5c3a] transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm outline-none focus:border-[#1a5c3a] transition-colors" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Subject</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm outline-none focus:border-[#1a5c3a] transition-colors" placeholder="Rules question, order inquiry, etc." />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Message</label>
                <textarea required rows={5} className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm outline-none focus:border-[#1a5c3a] transition-colors resize-none" placeholder="How can we help?" />
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm" style={{ background: 'linear-gradient(135deg, #1a5c3a, #2d7a52)' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pt-14 pb-8 px-6" style={{ background: '#0f1f15' }}>
        <div className="max-w-7xl mx-auto text-white">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src="https://www.nationalmahjonggleague.org/images/rsz_1rsz_1rsz_mahjong.png" alt="NMJL" className="h-10 w-auto" onError={e => { e.target.style.display = 'none'; }} />
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>National</div>
                  <div className="text-sm font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Mah Jongg League</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                The official home of American Mah Jongg since 1937.
              </p>
              <div className="flex gap-3 mt-4">
                {['f', 'in', 'tw', 'ig'].map(s => (
                  <div key={s} className="w-8 h-8 rounded-full flex items-center justify-center text-xs cursor-pointer transition-colors" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>Navigation</div>
              <div className="space-y-2">
                {NAV_LINKS.map(l => (
                  <button key={l.href} onClick={() => scrollTo(l.href)} className="block text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>Store</div>
              <div className="space-y-2">
                {['Rule Cards', 'Game Subscriptions', 'Tiles & Sets', 'Accessories', 'Apparel', 'Books'].map(cat => (
                  <button key={cat} onClick={() => { setStoreCategory(cat); scrollTo('#store'); }} className="block text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>Contact</div>
              <div className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                <p>450 7th Avenue, Suite 405<br />New York, NY 10123</p>
                <p>(212) 246-3052</p>
                <p>PO Box 50003<br />Newark NJ 07101-8006</p>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>&copy; 2026 The National Mah Jongg League, Inc. All rights reserved.</p>
            <div className="flex gap-4">
              {['Subscription Policy', 'Member Info', 'Terms of Use & Privacy'].map(l => (
                <button key={l} className="text-xs transition-colors hover:text-white/70" style={{ color: 'rgba(255,255,255,0.35)' }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── CART DRAWER ── */}
      <CartDrawer cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} onUpdateQty={updateQty} onRemove={removeFromCart} />

      {/* ── TOASTS ── */}
      <Toast toasts={toasts} />

      {/* ── BACK TO TOP ── */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full text-white shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity z-20"
          style={{ background: 'linear-gradient(135deg, #1a5c3a, #2d7a52)' }}
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
