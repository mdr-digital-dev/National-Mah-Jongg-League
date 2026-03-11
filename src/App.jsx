import { useState, useEffect, useRef } from 'react';
import {
  ShoppingCart, Menu, X,
  Phone, MapPin, Mail, ArrowUp, Star, Award, Users, Heart,
  Play, ExternalLink, Check, ChevronLeft, ChevronRight, ArrowRight
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
  { id: 1,  category: 'Rule Cards',        name: '2026 Card (Standard Size)',                    price: 14.00,  description: '5\u215b\u201d x 4\u201d \u2014 Official annual rule card',                                                                                   badge: 'Featured'     },
  { id: 2,  category: 'Rule Cards',        name: '2026 Card (Large Size)',                       price: 15.00,  description: '6\u215b\u201d x 4\u00be\u201d \u2014 Large print edition',                                                                                    badge: 'Featured'     },
  { id: 3,  category: 'Rule Cards',        name: '2026 Mega Card',                               price: 35.00,  description: '3 Panels Front & Back (8.5\u201d x 11\u201d) \u2014 Ships late March',                                                                        badge: 'Featured'     },
  { id: 4,  category: 'Rule Cards',        name: '2025 Card (Standard Size)',                    price: 14.00,  description: '5\u215b\u201d x 4\u201d \u2014 Previous year card'                                                                                                                  },
  { id: 5,  category: 'Rule Cards',        name: '2025 Card (Large Size)',                       price: 15.00,  description: '6\u215b\u201d x 4\u00be\u201d \u2014 Previous year large print'                                                                                                     },
  // Game Subscriptions
  { id: 6,  category: 'Game Subscriptions', name: 'Monthly Subscription',                       price: 4.99,   priceLabel: '$4.99/mo',   description: 'Play NMJL Mah Jongg online',            noRefund: true },
  { id: 7,  category: 'Game Subscriptions', name: 'Quarterly Subscription',                     price: 12.99,  priceLabel: '$12.99/3mo', description: 'Save with 3-month access',              noRefund: true },
  { id: 8,  category: 'Game Subscriptions', name: 'Yearly Subscription',                        price: 49.99,  priceLabel: '$49.99/yr',  description: 'Best value \u2014 full year access',    badge: 'Best Value', noRefund: true },
  // Tiles & Sets
  { id: 9,  category: 'Tiles & Sets',     name: 'White Tiles Only',                             price: 85.00,  description: '1 3/16\u201d H, 7/8\u201d W, 9/16\u201d D'                                                                                                                        },
  { id: 10, category: 'Tiles & Sets',     name: 'Pink Tiles Only',                              price: 165.00, description: '1 3/16\u201d H, 7/8\u201d W, 9/16\u201d D'                                                                                                                        },
  { id: 11, category: 'Tiles & Sets',     name: 'Green Tiles Only',                             price: 165.00, description: '1 3/16\u201d H, 7/8\u201d W, 9/16\u201d D'                                                                                                                        },
  { id: 12, category: 'Tiles & Sets',     name: 'Black Tiles Only',                             price: 165.00, description: '1 3/16\u201d H, 7/8\u201d W, 9/16\u201d D'                                                                                                                        },
  { id: 13, category: 'Tiles & Sets',     name: 'Red Tiles Only',                               price: 165.00, description: '1 3/16\u201d H, 7/8\u201d W, 9/16\u201d D'                                                                                                                        },
  { id: 14, category: 'Tiles & Sets',     name: 'Soft Black Bag Complete Set',                  price: 199.00, description: 'Lightweight bag, white tiles, 4 acrylic color racks, instruction book, bettor, current score card', badge: 'Complete Set' },
  { id: 15, category: 'Tiles & Sets',     name: 'Lightweight Microfibre Carrying Case (Black)', price: 88.00,  description: 'Two black plastic trays & two strap wraps. Compatible with white tiles only.'                                                                                        },
  // Accessories
  { id: 16, category: 'Accessories',      name: 'Table Cover w/ Plastic Carrying Case',         price: 60.00,  description: '40\u201d x 40\u201d with snaps to reduce to 37\u201d x 37\u201d'                                                                                                    },
  { id: 17, category: 'Accessories',      name: 'Plastic Card Holder (Standard)',                price: 9.00,   description: 'Holds standard size rule card'                                                                                                                                      },
  { id: 18, category: 'Accessories',      name: 'Plastic Card Holder (Large)',                   price: 10.00,  description: 'Holds large size rule card'                                                                                                                                         },
  { id: 19, category: 'Accessories',      name: 'Bettor',                                        price: 12.00,  description: 'Official NMJL bettor'                                                                                                                                               },
  { id: 20, category: 'Accessories',      name: 'Joker Decals (Pkg of 8)',                       price: 5.95,   description: 'Pack of 8 replacement joker stickers'                                                                                                                              },
  { id: 21, category: 'Accessories',      name: 'Money Chips (100 Chips)',                       price: 9.50,   description: '20 Blue, 20 Green, 20 Red, 20 White, 20 Yellow'                                                                                                                    },
  { id: 22, category: 'Accessories',      name: 'Helping Hands / Pushers (Set of 4)',            price: 48.00,  description: 'Acrylic pushers set of 4'                                                                                                                                          },
  { id: 23, category: 'Accessories',      name: 'Racks Set of 4 (Pushers NOT Included)',         price: 52.00,  description: 'Acrylic Pink, Green, Yellow, Blue colored racks'                                                                                                                    },
  { id: 24, category: 'Accessories',      name: 'Smoky Racks (Set of 4)',                        price: 52.00,  description: 'Plastic smoky-colored racks'                                                                                                                                       },
  { id: 25, category: 'Accessories',      name: 'Mah Jongg Playing Kards',                       price: 30.00,  description: 'Card-based version of the game'                                                                                                                                    },
  { id: 26, category: 'Accessories',      name: 'Mah Jongg Playing Kards w/ Instruction Book',  price: 38.00,  description: 'Cards + official instruction book'                                                                                                                                 },
  // Apparel
  { id: 27, category: 'Apparel',          name: 'Mah Jongg Sweatshirt \u2014 Medium',            price: 35.00,  description: 'Pullover, white only, multi-color imprint'                                                                                                                         },
  { id: 28, category: 'Apparel',          name: 'Mah Jongg Sweatshirt \u2014 Large',             price: 35.00,  description: 'Pullover, white only, multi-color imprint'                                                                                                                         },
  { id: 29, category: 'Apparel',          name: 'Mah Jongg Sweatshirt \u2014 XXL',               price: 35.00,  description: 'Pullover, white only, multi-color imprint'                                                                                                                         },
  { id: 30, category: 'Apparel',          name: 'Mah Jongg T-Shirt \u2014 Medium',               price: 27.00,  description: 'Pullover, white only, multi-color imprint'                                                                                                                         },
  { id: 31, category: 'Apparel',          name: 'Mah Jongg T-Shirt \u2014 Large',                price: 27.00,  description: 'Pullover, white only, multi-color imprint'                                                                                                                         },
  { id: 32, category: 'Apparel',          name: 'Mah Jongg T-Shirt \u2014 XL',                   price: 27.00,  description: 'Pullover, white only, multi-color imprint'                                                                                                                         },
  // Books
  { id: 33, category: 'Books',            name: '\u201cMah Jongg Made Easy\u201d \u2014 Revised 2024', price: 15.95, description: 'The official NMJL instruction book'                                                                                                                          },
];

const STORE_CATEGORIES = ['All', 'Rule Cards', 'Game Subscriptions', 'Tiles & Sets', 'Accessories', 'Apparel', 'Books'];

const FAQS = [
  { q: 'What sizes do the rule cards come in?',      a: 'Standard (5\u215b\u201d x 4\u201d) for $14, and Large Print (6\u215b\u201d x 4\u00be\u201d) for $15.' },
  { q: 'When are the new cards available?',          a: 'Cards are available for pre-order each January. They ship in two batches \u2014 January/February orders ship first (late March/early April), later orders ship around late April/early May.' },
  { q: 'Can I order by mail?',                       a: 'Yes. Send your check to: NMJL, PO Box 50003, Newark NJ 07101-8006. Include your name, address, and exact number of cards ordered.' },
  { q: 'Can a misnamed Joker be called for Mah Jongg?', a: 'Yes. A misnamed Joker may be called for Mah Jongg. This is the only time a Joker may be called. The player who discarded the tile pays 4 times the value of the hand. Other players do not pay.' },
  { q: 'How do I contact the League with a rules question?', a: 'Call us at (212) 246-3052 or write to us at 450 7th Avenue, Suite 405, New York, NY 10123. Please include a self-addressed stamped envelope.' },
  { q: 'Are there refunds on game subscriptions?',   a: 'No. There are no refunds on game subscription purchases or any other digital content.' },
  { q: 'When two players want the same discard?',    a: 'When one player wants a discard for an Exposure and another for Mah Jongg, the Mah Jongg declarer always has preference, even if the caller for an Exposure has begun to expose tiles.' },
  { q: 'Where can I buy official NMJL cards?',       a: 'Official cards are available exclusively through our online store at nationalmahjonggleague.org or through registered card collectors. Beware of counterfeit cards sold on Amazon and other marketplaces.' },
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
    'Featured':     'bg-amber-500 text-white',
    'Best Value':   'bg-emerald-700 text-white',
    'Complete Set': 'bg-red-800 text-white',
  };
  return (
    <span className={`absolute top-3 left-3 text-sm font-semibold px-3 py-1 rounded-full z-10 ${styles[label] || 'bg-gray-500 text-white'}`}>
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
    setTimeout(() => setAdded(false), 1600);
  }

  const displayPrice = product.priceLabel || `$${product.price.toFixed(2)}`;

  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-stone-100 flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200">
      {product.badge && <Badge label={product.badge} />}

      {/* Product image area */}
      <div className="h-44 flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1a5c3a 0%, #2d7a52 100%)' }}>
        <span className="text-6xl select-none" role="img" aria-hidden="true">🀄</span>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Product name — 18px minimum */}
        <h3 className="font-semibold leading-snug text-stone-800" style={{ fontSize: '18px' }}>{product.name}</h3>

        {/* Description — 16px, good contrast */}
        <p className="text-stone-600 flex-1" style={{ fontSize: '16px', lineHeight: '1.6' }}>{product.description}</p>

        {/* No-refund notice — visible, not tiny */}
        {product.noRefund && (
          <p className="font-medium text-red-700 border border-red-200 bg-red-50 rounded-lg px-3 py-2" style={{ fontSize: '15px' }}>
            ⚠ No refunds on digital content
          </p>
        )}

        {/* Price + quantity row */}
        <div className="flex items-center justify-between pt-1">
          {/* Price — 22px, bold, high contrast */}
          <span className="font-bold" style={{ fontSize: '22px', color: '#1a5c3a' }}>{displayPrice}</span>

          {/* Quantity controls — 48×48px minimum tap targets */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="rounded-xl border-2 border-stone-300 flex items-center justify-center text-stone-700 hover:bg-stone-100 hover:border-stone-400 transition-colors font-bold"
              style={{ width: '48px', height: '48px', fontSize: '20px' }}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="text-center font-semibold text-stone-800" style={{ width: '36px', fontSize: '18px' }}>{qty}</span>
            <button
              onClick={() => setQty(q => q + 1)}
              className="rounded-xl border-2 border-stone-300 flex items-center justify-center text-stone-700 hover:bg-stone-100 hover:border-stone-400 transition-colors font-bold"
              style={{ width: '48px', height: '48px', fontSize: '20px' }}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart — full width, 52px tall, large text */}
        <button
          onClick={handleAdd}
          className="w-full rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
          style={{
            height: '52px',
            fontSize: '17px',
            background: added ? '#059669' : 'linear-gradient(135deg, #1a5c3a, #2d7a52)',
          }}
        >
          {added ? <><Check size={18} /> Added to Cart!</> : 'Add to Cart'}
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
      {open && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}
      <div
        className="fixed top-0 right-0 h-full bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 w-full sm:w-[420px]"
        style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Cart header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <h2 className="font-bold text-stone-900" style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px' }}>Your Cart</h2>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 rounded-xl border-2 border-stone-200 hover:bg-stone-50 transition-colors font-semibold text-stone-700"
            style={{ height: '48px', fontSize: '16px' }}
            aria-label="Close cart"
          >
            <X size={18} /> Close
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {cart.length === 0 ? (
            <p className="text-stone-500 text-center mt-16" style={{ fontSize: '18px' }}>Your cart is empty.</p>
          ) : cart.map(item => (
            <div key={item.id} className="flex gap-4 items-start pb-5 border-b border-stone-100 last:border-0">
              <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl" style={{ background: 'linear-gradient(135deg, #1a5c3a, #2d7a52)' }}>
                🀄
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold leading-snug text-stone-800" style={{ fontSize: '16px' }}>{item.name}</p>
                <p className="font-bold mt-1" style={{ fontSize: '18px', color: '#1a5c3a' }}>${(item.price * item.qty).toFixed(2)}</p>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => onUpdateQty(item.id, item.qty - 1)}
                    className="rounded-lg border-2 border-stone-300 flex items-center justify-center font-bold text-stone-700 hover:bg-stone-100"
                    style={{ width: '40px', height: '40px', fontSize: '18px' }}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="font-semibold text-stone-800 text-center" style={{ width: '28px', fontSize: '18px' }}>{item.qty}</span>
                  <button
                    onClick={() => onUpdateQty(item.id, item.qty + 1)}
                    className="rounded-lg border-2 border-stone-300 flex items-center justify-center font-bold text-stone-700 hover:bg-stone-100"
                    style={{ width: '40px', height: '40px', fontSize: '18px' }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="ml-auto text-red-500 hover:text-red-700 transition-colors font-medium underline"
                    style={{ fontSize: '15px' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout footer */}
        {cart.length > 0 && (
          <div className="px-6 py-6 border-t border-stone-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-stone-700" style={{ fontSize: '18px' }}>Total</span>
              <span className="font-bold" style={{ fontSize: '26px', color: '#1a5c3a' }}>${total.toFixed(2)}</span>
            </div>
            <button
              className="w-full rounded-xl text-white font-bold transition-opacity hover:opacity-90"
              style={{ height: '56px', fontSize: '18px', background: 'linear-gradient(135deg, #1a5c3a, #2d7a52)' }}
            >
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
    <div className="fixed bottom-8 left-1/2 z-50 space-y-3 pointer-events-none" style={{ transform: 'translateX(-50%)' }}>
      {toasts.map(t => (
        <div
          key={t.id}
          className="bg-stone-900 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 whitespace-nowrap"
          style={{ fontSize: '17px' }}
          role="status"
        >
          <Check size={20} className="text-emerald-400 flex-shrink-0" />
          <span>Added to cart!</span>
        </div>
      ))}
    </div>
  );
}

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-2 border-stone-200 rounded-2xl overflow-hidden bg-white">
      {/* Full-row clickable button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left flex items-center justify-between px-6 py-5 hover:bg-stone-50 transition-colors"
        aria-expanded={open}
        style={{ minHeight: '72px' }}
      >
        <span className="font-semibold text-stone-800 pr-4" style={{ fontSize: '18px', lineHeight: '1.5' }}>{faq.q}</span>
        {/* + / − indicator — much clearer than chevrons */}
        <span
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl transition-colors"
          style={{
            background: open ? '#1a5c3a' : 'rgba(26,92,58,0.08)',
            color: open ? 'white' : '#1a5c3a',
          }}
          aria-hidden="true"
        >
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6 border-t-2 border-stone-100 pt-5">
          <p className="text-stone-700" style={{ fontSize: '17px', lineHeight: '1.75' }}>{faq.a}</p>
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
      setShowBackToTop(window.scrollY > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function addToCart(product, qty) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
    const id = ++toastId.current;
    setToasts(t => [...t, { id, msg: product.name }]);
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

  function prevHero() { setHeroImg(i => (i - 1 + HERO_IMAGES.length) % HERO_IMAGES.length); }
  function nextHero() { setHeroImg(i => (i + 1) % HERO_IMAGES.length); }

  const navTextClass = scrolled ? 'text-stone-700' : 'text-white';
  const iconColorClass = scrolled ? 'text-stone-700' : 'text-white';

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#faf8f3' }}>

      {/* ══════════════════════════════════════════════
          NAVIGATION
      ══════════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-30 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.09)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20" style={{ minHeight: '72px' }}>

            {/* Logo */}
            <button onClick={() => scrollTo('#home')} className="flex items-center gap-3 flex-shrink-0 py-2">
              <img
                src="https://www.nationalmahjonggleague.org/images/rsz_1rsz_1rsz_mahjong.png"
                alt="National Mah Jongg League Logo"
                className="h-10 lg:h-12 w-auto"
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div className="hidden sm:block">
                <div className={`font-semibold tracking-widest uppercase ${scrolled ? 'text-[#1a5c3a]' : 'text-white'}`} style={{ fontSize: '11px' }}>National</div>
                <div className={`font-bold leading-tight ${scrolled ? 'text-stone-800' : 'text-white'}`} style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px' }}>Mah Jongg League</div>
              </div>
            </button>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(l => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors hover:bg-white/10 ${navTextClass}`}
                  style={{ fontSize: '15px' }}
                >
                  {l.label}
                </button>
              ))}
            </nav>

            {/* Right: phone + CTA + cart + menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Phone — visible on desktop */}
              <a
                href="tel:+12122463052"
                className={`hidden lg:flex items-center gap-1.5 font-medium transition-colors hover:underline ${navTextClass}`}
                style={{ fontSize: '15px' }}
                aria-label="Call us at (212) 246-3052"
              >
                <Phone size={15} />
                (212) 246-3052
              </a>

              {/* Order CTA */}
              <button
                onClick={() => scrollTo('#store')}
                className="hidden sm:flex items-center gap-1 font-bold px-4 rounded-xl transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #b8960c, #d4af37)', color: '#1a1a1a', height: '44px', fontSize: '15px' }}
              >
                Order 2026 Card
              </button>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className={`relative flex items-center justify-center rounded-xl hover:bg-white/15 transition-colors ${iconColorClass}`}
                style={{ width: '48px', height: '48px' }}
                aria-label={`Open cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 rounded-full text-white font-bold flex items-center justify-center"
                    style={{ width: '22px', height: '22px', fontSize: '12px', background: '#8b1a2e' }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Hamburger — with "Menu" label */}
              <button
                onClick={() => setMobileMenuOpen(o => !o)}
                className={`lg:hidden flex items-center gap-1.5 px-3 rounded-xl font-semibold hover:bg-white/15 transition-colors ${iconColorClass}`}
                style={{ height: '48px', fontSize: '15px' }}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu size={22} />
                <span className="hidden xs:inline">Menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t-2 border-stone-100 shadow-xl">
            {/* Large close button at top */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-stone-100">
              <span className="font-semibold text-stone-700" style={{ fontSize: '18px' }}>Navigation</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 rounded-xl border-2 border-stone-200 font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
                style={{ height: '48px', fontSize: '16px' }}
              >
                <X size={18} /> Close Menu
              </button>
            </div>
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map(l => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="flex items-center w-full text-left px-4 rounded-xl text-stone-800 hover:bg-stone-50 font-medium transition-colors"
                  style={{ height: '56px', fontSize: '18px' }}
                >
                  {l.label}
                </button>
              ))}
              {/* Phone in mobile menu */}
              <a
                href="tel:+12122463052"
                className="flex items-center gap-3 w-full px-4 rounded-xl text-stone-800 hover:bg-stone-50 font-medium transition-colors"
                style={{ height: '56px', fontSize: '18px' }}
              >
                <Phone size={18} style={{ color: '#1a5c3a' }} />
                (212) 246-3052
              </a>
              <div className="pt-2 pb-1">
                <button
                  onClick={() => scrollTo('#store')}
                  className="flex items-center justify-center gap-2 w-full rounded-xl font-bold text-stone-900"
                  style={{ height: '56px', fontSize: '18px', background: 'linear-gradient(135deg, #b8960c, #d4af37)' }}
                >
                  Order 2026 Card <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════════
          HERO  (static image + manual prev/next)
      ══════════════════════════════════════════════ */}
      <section id="home" className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '100vh' }}>
        {/* Background images */}
        {HERO_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: i === heroImg ? 1 : 0 }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,40,25,0.82) 0%, rgba(26,92,58,0.60) 50%, rgba(10,20,35,0.80) 100%)' }} />

        {/* Hero content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 font-medium tracking-widest uppercase mb-6 px-5 py-2 rounded-full"
            style={{ border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)', fontSize: '13px' }}
          >
            <span style={{ color: '#d4af37' }}>★</span> Est. 1937 &mdash; New York City
          </div>
          <h1
            className="font-bold leading-tight mb-6"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}
          >
            Celebrating 89 Years of American Mah Jongg
          </h1>
          <p
            className="leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', color: 'rgba(255,255,255,0.88)', lineHeight: '1.75' }}
          >
            The official home of American Mah Jongg since 1937. Join 350,000+ members and keep the tradition alive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo('#store')}
              className="rounded-xl font-bold transition-all hover:opacity-90 hover:scale-105 shadow-lg"
              style={{ height: '60px', padding: '0 2rem', fontSize: '19px', background: 'linear-gradient(135deg, #b8960c, #d4af37)', color: '#1a1a1a' }}
            >
              Order Your 2026 Card
            </button>
            <button
              onClick={() => scrollTo('#game')}
              className="rounded-xl font-bold text-white transition-all hover:bg-white/20"
              style={{ height: '60px', padding: '0 2rem', fontSize: '19px', border: '2px solid rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.1)' }}
            >
              Learn the Game
            </button>
          </div>
        </div>

        {/* Manual prev/next arrows */}
        <button
          onClick={prevHero}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors"
          style={{ width: '52px', height: '52px' }}
          aria-label="Previous image"
        >
          <ChevronLeft size={26} />
        </button>
        <button
          onClick={nextHero}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors"
          style={{ width: '52px', height: '52px' }}
          aria-label="Next image"
        >
          <ChevronRight size={26} />
        </button>

        {/* Image dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroImg(i)}
              className="rounded-full transition-all"
              style={{ width: i === heroImg ? '24px' : '10px', height: '10px', background: i === heroImg ? '#d4af37' : 'rgba(255,255,255,0.5)' }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ANNOUNCEMENT BANNER
      ══════════════════════════════════════════════ */}
      <div style={{ background: 'linear-gradient(135deg, #1a5c3a, #2d7a52)' }} className="py-5 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-white text-center">
          <span className="text-2xl">🀄</span>
          <p className="font-medium" style={{ fontSize: '18px', lineHeight: '1.5' }}>
            <strong>2026 Rule Cards</strong> are now available for pre-order! Cards ship beginning of April.
          </p>
          <button
            onClick={() => scrollTo('#store')}
            className="flex-shrink-0 font-bold underline hover:no-underline transition-all"
            style={{ color: '#d4af37', fontSize: '17px' }}
          >
            Order yours today &rarr;
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════ */}
      <section id="about" className="py-20 lg:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-block font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5" style={{ color: '#1a5c3a', background: 'rgba(26,92,58,0.08)', fontSize: '12px' }}>
                Our Heritage
              </div>
              <h2 className="font-bold leading-tight mb-6" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1a1a1a' }}>
                About the National<br />Mah Jongg League
              </h2>
              <p className="text-stone-700 mb-6" style={{ fontSize: '18px', lineHeight: '1.8' }}>
                For over 89 years, the National Mah Jongg League has been the arbitrator for everything that relates to American Mah Jongg &mdash; standardizing rules, championing players, and building community.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Founded in 1937 in New York City to standardize the game',
                  'Started with 32 members \u2014 now 350,000+ strong',
                  'Publishes the official American rules card annually',
                  'Sells merchandise for playing the game',
                  'Answers questions and arbitrates game disputes',
                  'Makes numerous donations to charitable organizations',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ background: 'rgba(26,92,58,0.12)' }}>
                      <Check size={13} style={{ color: '#1a5c3a' }} />
                    </div>
                    <span className="text-stone-700" style={{ fontSize: '17px', lineHeight: '1.6' }}>{item}</span>
                  </div>
                ))}
              </div>
              <blockquote className="border-l-4 pl-5 italic text-stone-600" style={{ borderColor: '#d4af37', fontSize: '18px', lineHeight: '1.7' }}>
                "For over 86 years, the National Mah Jongg League has been the arbitrator for everything that relates to American Maajh."
              </blockquote>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://www.nationalmahjonggleague.org/images/league_01.jpg"
                  alt="The National Mah Jongg League"
                  className="w-full object-cover"
                  style={{ height: '280px' }}
                  loading="lazy"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800&q=80'; }}
                />
              </div>
              {/* Timeline */}
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-stone-100">
                <h3 className="font-semibold mb-5" style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }}>Our Journey</h3>
                <div className="space-y-5">
                  {[
                    { year: '1937', label: 'Founded in New York City with 32 charter members' },
                    { year: '1965', label: "Ruth Unger becomes president, shaping the League's modern era" },
                    { year: '2015', label: 'David & Larry Unger take leadership of the League' },
                    { year: 'Today', label: '350,000+ members across North America' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-14 font-bold text-center pt-0.5" style={{ color: '#d4af37', fontSize: '14px' }}>{item.year}</div>
                      <div className="flex gap-3 items-start flex-1">
                        <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#1a5c3a' }} />
                        <p className="text-stone-700" style={{ fontSize: '16px', lineHeight: '1.6' }}>{item.label}</p>
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
              { icon: <Users size={28} />, value: '350,000+', label: 'Active Members' },
              { icon: <Award size={28} />, value: '89 Years',  label: 'Of Excellence'  },
              { icon: <Star size={28} />,  value: 'Est. 1937', label: 'New York City'   },
              { icon: <Heart size={28} />, value: '$3M+',      label: 'Given to Charity' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-stone-100">
                <div className="flex justify-center mb-3" style={{ color: '#1a5c3a' }}>{s.icon}</div>
                <div className="font-bold text-stone-800" style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px' }}>{s.value}</div>
                <div className="text-stone-600 mt-1 font-medium" style={{ fontSize: '16px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          THE GAME
      ══════════════════════════════════════════════ */}
      <section id="game" className="py-20 lg:py-28 px-6" style={{ background: 'linear-gradient(180deg, #f0ede4 0%, #faf8f3 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ color: '#1a5c3a', background: 'rgba(26,92,58,0.08)', fontSize: '12px' }}>
              Learn to Play
            </div>
            <h2 className="font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1a1a1a' }}>
              The Game of Mah Jongg
            </h2>
            <p className="text-stone-700 max-w-2xl mx-auto" style={{ fontSize: '18px', lineHeight: '1.75' }}>
              A fascinating, rummy-like game played with tiles &mdash; centuries of tradition reimagined for the American table.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://www.nationalmahjonggleague.org/images/game_01.jpg"
                alt="People playing Mah Jongg"
                className="w-full object-cover"
                style={{ height: '320px' }}
                loading="lazy"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800&q=80'; }}
              />
            </div>
            <div className="space-y-5">
              <p className="text-stone-700" style={{ fontSize: '18px', lineHeight: '1.8' }}>
                Mah Jongg (or <em>Maahj</em>, as it is often called) is a fascinating, rummy-like game played with tiles rather than cards. Originating in China and popularized in the United States by Joseph Babcock in the early 20th century, American Mah Jongg has evolved into its own rich tradition.
              </p>
              <p className="text-stone-700" style={{ fontSize: '18px', lineHeight: '1.8' }}>
                American Mah Jongg differs significantly from International styles &mdash; it uses a card of Standard Hands that changes annually, employs Joker tiles, begins with the "Charleston" (a structured passing of tiles), and allows quints and sextets.
              </p>
              <p className="text-stone-700" style={{ fontSize: '18px', lineHeight: '1.8' }}>
                "Mah Jongg is enjoying a resurgence in popularity, with millions of dedicated players around the world." The NMJL has been at the center of that tradition since 1937.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🀄', title: 'Annual Standard Hands Card', desc: 'A new official card each year keeps the game fresh and competitive.' },
              { icon: '🃏', title: 'Joker Tiles',               desc: 'Unique to American Mah Jongg \u2014 wild tiles that add strategic depth.' },
              { icon: '🔄', title: 'The Charleston',            desc: 'A structured pre-game tile exchange that defines American Maahj.' },
              { icon: '🏆', title: 'Quints & Sextets',          desc: 'Powerful multi-tile combinations exclusive to the American game.' },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 shadow-sm border border-stone-100 text-center hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">{card.icon}</div>
                <h3 className="font-semibold text-stone-800 mb-3 leading-snug" style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px' }}>{card.title}</h3>
                <p className="text-stone-600" style={{ fontSize: '16px', lineHeight: '1.65' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STORE
      ══════════════════════════════════════════════ */}
      <section id="store" className="py-20 lg:py-28 px-6" style={{ background: '#faf8f3' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ color: '#1a5c3a', background: 'rgba(26,92,58,0.08)', fontSize: '12px' }}>
              Official Shop
            </div>
            <h2 className="font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1a1a1a' }}>
              The Official NMJL Store
            </h2>
            <p className="text-stone-600" style={{ fontSize: '19px' }}>Everything you need for your Mah Jongg game</p>
          </div>

          {/* Category tabs — 48px tall, scrollable on mobile */}
          <div className="overflow-x-auto pb-3 mb-8 -mx-6 px-6">
            <div className="flex gap-3 min-w-max">
              {STORE_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setStoreCategory(cat)}
                  className="rounded-full font-semibold transition-all whitespace-nowrap border-2"
                  style={{
                    height: '48px',
                    padding: '0 20px',
                    fontSize: '16px',
                    ...(storeCategory === cat
                      ? { background: 'linear-gradient(135deg, #1a5c3a, #2d7a52)', color: 'white', borderColor: 'transparent' }
                      : { background: 'white', color: '#44403c', borderColor: '#d6d3d1' }),
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Subscription disclaimer */}
          {(storeCategory === 'All' || storeCategory === 'Game Subscriptions') && (
            <div className="mb-8 p-5 rounded-2xl border-2 border-amber-300 bg-amber-50 max-w-2xl mx-auto text-center">
              <p className="font-semibold text-amber-900" style={{ fontSize: '17px' }}>
                ⚠&nbsp; <strong>Important:</strong> No refunds on game subscriptions or any digital content.
              </p>
            </div>
          )}

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
            ))}
          </div>

          <p className="text-center text-stone-500 mt-10 font-medium" style={{ fontSize: '16px' }}>
            Showing {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''}{storeCategory !== 'All' ? ` in ${storeCategory}` : ' \u2014 full catalog'}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CHARITABLE WORK
      ══════════════════════════════════════════════ */}
      <section id="charity" className="py-20 lg:py-28 px-6" style={{ background: 'linear-gradient(180deg, #1a3326 0%, #0f2018 100%)' }}>
        <div className="max-w-7xl mx-auto text-white">
          <div className="text-center mb-14">
            <div className="inline-block font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4 border" style={{ color: '#d4af37', borderColor: 'rgba(212,175,55,0.35)', background: 'rgba(212,175,55,0.08)', fontSize: '12px' }}>
              Our Mission
            </div>
            <h2 className="font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Giving Back &mdash; Our Charitable Mission
            </h2>
            <p className="max-w-2xl mx-auto" style={{ fontSize: '18px', lineHeight: '1.8', color: 'rgba(255,255,255,0.82)' }}>
              Each year, proceeds from sales of the League's Official Rule Cards go directly to charitable organizations across the country.
            </p>
          </div>

          {/* $3M highlight */}
          <div className="max-w-xl mx-auto mb-14 rounded-2xl p-10 text-center border-2" style={{ background: 'rgba(212,175,55,0.08)', borderColor: 'rgba(212,175,55,0.3)' }}>
            <div className="font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', fontSize: '52px', color: '#d4af37' }}>$3,000,000</div>
            <p style={{ fontSize: '18px', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)' }}>
              Gift to Valley Hospital in Paramus, NJ for a post-partum floor &mdash; one of our most significant charitable contributions.
            </p>
          </div>

          {/* Charities grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-14">
            {CHARITIES.map(name => (
              <div key={name} className="flex items-center gap-3 px-5 py-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Heart size={16} style={{ color: '#d4af37', flexShrink: 0 }} />
                <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.4' }}>{name}</span>
              </div>
            ))}
          </div>

          <blockquote className="max-w-2xl mx-auto text-center">
            <p className="italic mb-5" style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', lineHeight: '1.75', color: 'rgba(255,255,255,0.88)' }}>
              "The National Mah Jongg League has always believed that the joy of this game should extend beyond the table &mdash; to the communities and causes that need it most."
            </p>
            <footer className="font-semibold" style={{ fontSize: '16px', color: '#d4af37' }}>&mdash; David Unger, National Mah Jongg League</footer>
          </blockquote>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PLAY ONLINE
      ══════════════════════════════════════════════ */}
      <section id="play-online" className="py-20 lg:py-28 px-6" style={{ background: '#faf8f3' }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ color: '#1a5c3a', background: 'rgba(26,92,58,0.08)', fontSize: '12px' }}>
            Digital Play
          </div>
          <h2 className="font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1a1a1a' }}>
            Play Mah Jongg Online
          </h2>
          <p className="text-stone-700 mb-12 max-w-xl mx-auto" style={{ fontSize: '18px', lineHeight: '1.75' }}>
            Play the official NMJL version of Mah Jongg from anywhere, anytime &mdash; on your computer or mobile device.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { name: 'Monthly',   price: '$4.99',  period: '/month',    desc: 'Perfect for trying it out',      featured: false },
              { name: 'Yearly',    price: '$49.99', period: '/year',     desc: 'Best value \u2014 save over 16%', featured: true  },
              { name: 'Quarterly', price: '$12.99', period: '/3 months', desc: 'Flexible seasonal play',          featured: false },
            ].map(p => (
              <div
                key={p.name}
                className="rounded-2xl p-8 text-left"
                style={p.featured
                  ? { background: 'linear-gradient(135deg, #1a5c3a, #2d7a52)', boxShadow: '0 8px 32px rgba(26,92,58,0.3)', color: 'white' }
                  : { background: 'white', border: '2px solid #e7e5e4' }
                }
              >
                {p.featured && (
                  <div className="font-bold tracking-widest uppercase mb-3" style={{ color: '#d4af37', fontSize: '13px' }}>Most Popular</div>
                )}
                <div className="font-semibold mb-1" style={{ fontSize: '18px', color: p.featured ? 'rgba(255,255,255,0.8)' : '#78716c' }}>{p.name}</div>
                <div className="font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', fontSize: '40px', color: p.featured ? 'white' : '#1c1917' }}>
                  {p.price}<span className="font-normal" style={{ fontSize: '17px', color: p.featured ? 'rgba(255,255,255,0.65)' : '#a8a29e' }}>{p.period}</span>
                </div>
                <p className="mb-6" style={{ fontSize: '17px', color: p.featured ? 'rgba(255,255,255,0.78)' : '#78716c', lineHeight: '1.5' }}>{p.desc}</p>
                <button
                  onClick={() => scrollTo('#store')}
                  className="w-full rounded-xl font-bold transition-all hover:opacity-90"
                  style={{
                    height: '52px',
                    fontSize: '17px',
                    ...(p.featured ? { background: 'white', color: '#1a5c3a' } : { background: 'linear-gradient(135deg, #1a5c3a, #2d7a52)', color: 'white' }),
                  }}
                >
                  Subscribe Now
                </button>
              </div>
            ))}
          </div>

          <a
            href="https://play.nmjlonline.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 rounded-2xl font-semibold border-2 transition-all hover:bg-stone-50"
            style={{ height: '56px', fontSize: '17px', borderColor: '#1a5c3a', color: '#1a5c3a' }}
          >
            <Play size={18} /> Already have an account? Click here to play <ExternalLink size={16} />
          </a>

          <p className="mt-5 text-stone-500 font-medium" style={{ fontSize: '15px' }}>No refunds on game subscriptions or digital content.</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════ */}
      <section id="faq" className="py-20 lg:py-28 px-6" style={{ background: '#f0ede4' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ color: '#1a5c3a', background: 'rgba(26,92,58,0.08)', fontSize: '12px' }}>
              Help & Support
            </div>
            <h2 className="font-bold" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1a1a1a' }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════ */}
      <section id="contact" className="py-20 lg:py-28 px-6" style={{ background: '#faf8f3' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ color: '#1a5c3a', background: 'rgba(26,92,58,0.08)', fontSize: '12px' }}>
              Get in Touch
            </div>
            <h2 className="font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1a1a1a' }}>
              Contact Us
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto" style={{ fontSize: '18px', lineHeight: '1.7' }}>
              Our Mahj experts are happy to answer your questions about rules, hands, and game disputes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 space-y-7">
                {[
                  {
                    icon: <MapPin size={20} />,
                    title: 'Address',
                    content: <>The National Mah Jongg League, Inc.<br />450 7th Avenue, Suite 405<br />New York, NY 10123</>,
                  },
                  {
                    icon: <Phone size={20} />,
                    title: 'Phone',
                    content: (
                      <a href="tel:+12122463052" className="font-semibold hover:underline" style={{ color: '#1a5c3a', fontSize: '20px' }}>
                        (212) 246-3052
                      </a>
                    ),
                  },
                  {
                    icon: <Mail size={20} />,
                    title: 'Mail Orders',
                    content: <>NMJL, PO Box 50003<br />Newark NJ 07101-8006</>,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(26,92,58,0.08)', color: '#1a5c3a' }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-bold text-stone-800 mb-1" style={{ fontSize: '17px' }}>{item.title}</div>
                      <div className="text-stone-600" style={{ fontSize: '17px', lineHeight: '1.65' }}>{item.content}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden shadow-sm border-2 border-stone-200 flex items-center justify-center" style={{ height: '200px', background: '#e8e0d0' }}>
                <div className="text-center text-stone-600 px-4">
                  <MapPin size={36} className="mx-auto mb-2 opacity-40" />
                  <p className="font-semibold" style={{ fontSize: '17px' }}>450 7th Ave, New York, NY</p>
                  <p className="text-stone-500 mt-1" style={{ fontSize: '15px' }}>Midtown Manhattan</p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <form
              className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 space-y-5"
              onSubmit={e => { e.preventDefault(); alert("Thank you! Your message has been sent. We'll be in touch soon."); }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-semibold text-stone-700 mb-2" style={{ fontSize: '17px' }}>Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 rounded-xl border-2 border-stone-200 outline-none focus:border-[#1a5c3a] transition-colors"
                    style={{ height: '52px', fontSize: '17px' }}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-2" style={{ fontSize: '17px' }}>Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 rounded-xl border-2 border-stone-200 outline-none focus:border-[#1a5c3a] transition-colors"
                    style={{ height: '52px', fontSize: '17px' }}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-2" style={{ fontSize: '17px' }}>Subject</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 rounded-xl border-2 border-stone-200 outline-none focus:border-[#1a5c3a] transition-colors"
                  style={{ height: '52px', fontSize: '17px' }}
                  placeholder="Rules question, order inquiry, etc."
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-2" style={{ fontSize: '17px' }}>Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-4 rounded-xl border-2 border-stone-200 outline-none focus:border-[#1a5c3a] transition-colors resize-none"
                  style={{ fontSize: '17px', lineHeight: '1.6' }}
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl text-white font-bold hover:opacity-90 transition-opacity shadow-sm"
                style={{ height: '56px', fontSize: '18px', background: 'linear-gradient(135deg, #1a5c3a, #2d7a52)' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer className="pt-14 pb-8 px-6" style={{ background: '#0f1f15' }}>
        <div className="max-w-7xl mx-auto text-white">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <img src="https://www.nationalmahjonggleague.org/images/rsz_1rsz_1rsz_mahjong.png" alt="NMJL" className="h-10 w-auto" onError={e => { e.target.style.display = 'none'; }} />
                <div>
                  <div className="font-semibold tracking-widest uppercase" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>National</div>
                  <div className="font-bold" style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px' }}>Mah Jongg League</div>
                </div>
              </div>
              <p className="leading-relaxed" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.7' }}>
                The official home of American Mah Jongg since 1937.
              </p>
              <div className="flex gap-3 mt-5">
                {['f', 'in', 'tw', 'ig'].map(s => (
                  <div key={s} className="w-10 h-10 rounded-full flex items-center justify-center text-sm cursor-pointer font-semibold transition-colors hover:bg-white/20" style={{ background: 'rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.55)' }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <div className="font-bold tracking-widest uppercase mb-5" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>Navigation</div>
              <div className="space-y-3">
                {NAV_LINKS.map(l => (
                  <button key={l.href} onClick={() => scrollTo(l.href)} className="block transition-colors hover:text-white" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)' }}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Store */}
            <div>
              <div className="font-bold tracking-widest uppercase mb-5" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>Store</div>
              <div className="space-y-3">
                {['Rule Cards', 'Game Subscriptions', 'Tiles & Sets', 'Accessories', 'Apparel', 'Books'].map(cat => (
                  <button key={cat} onClick={() => { setStoreCategory(cat); scrollTo('#store'); }} className="block transition-colors hover:text-white" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)' }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="font-bold tracking-widest uppercase mb-5" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>Contact</div>
              <div className="space-y-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <p style={{ fontSize: '16px', lineHeight: '1.65' }}>450 7th Avenue, Suite 405<br />New York, NY 10123</p>
                <a href="tel:+12122463052" className="block font-semibold hover:text-white transition-colors" style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)' }}>(212) 246-3052</a>
                <p style={{ fontSize: '16px', lineHeight: '1.65' }}>PO Box 50003<br />Newark NJ 07101-8006</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)' }}>&copy; 2026 The National Mah Jongg League, Inc. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {['Subscription Policy', 'Member Info', 'Terms of Use & Privacy'].map(l => (
                <button key={l} className="transition-colors hover:text-white/70" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── CART DRAWER ── */}
      <CartDrawer cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} onUpdateQty={updateQty} onRemove={removeFromCart} />

      {/* ── TOASTS ── */}
      <Toast toasts={toasts} />

      {/* ── BACK TO TOP — text label + icon ── */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 flex items-center gap-2 text-white shadow-xl hover:opacity-90 transition-all z-20 rounded-2xl font-semibold"
          style={{ background: 'linear-gradient(135deg, #1a5c3a, #2d7a52)', height: '52px', padding: '0 20px', fontSize: '16px' }}
          aria-label="Back to top of page"
        >
          <ArrowUp size={18} /> Back to Top
        </button>
      )}
    </div>
  );
}
