import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, ArrowUp } from 'lucide-react';
import { NAV_LINKS, GREEN, GOLD, DARK } from '../data';
import CartDrawer from './CartDrawer';

export default function Layout({ children, cart, onUpdateQty, onRemove }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 600);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu and scroll to top on route change
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const solidNav = scrolled || !isHome;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf6ee', fontFamily: 'Georgia, "Times New Roman", serif' }}>

      {/* ── NAV ── */}
      <header
        className="fixed top-0 left-0 right-0 z-30 transition-all duration-300"
        style={{
          background: solidNav ? 'white' : 'rgba(8,28,16,0.82)',
          borderBottom: solidNav ? `3px solid ${GREEN}` : 'none',
          boxShadow: solidNav ? '0 2px 16px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between" style={{ minHeight: '72px' }}>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 no-underline">
              <img
                src="https://www.nationalmahjonggleague.org/images/rsz_1rsz_1rsz_mahjong.png"
                alt="NMJL Logo"
                style={{ height: '44px', width: 'auto' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: solidNav ? GREEN : '#d4af37', textTransform: 'uppercase' }}>National</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: solidNav ? DARK : 'white', lineHeight: 1.2 }}>Mah Jongg League</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(l => {
                const active = location.pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="px-4 py-2 rounded-lg font-bold transition-colors no-underline"
                    style={{
                      fontSize: '15px',
                      color: solidNav ? (active ? GREEN : '#2a2a2a') : (active ? '#86efac' : 'white'),
                      background: active && solidNav ? 'rgba(26,92,58,0.09)' : 'transparent',
                      textDecoration: active ? 'underline' : 'none',
                      textDecorationColor: active ? GREEN : 'transparent',
                      textDecorationThickness: '2px',
                      textUnderlineOffset: '4px',
                    }}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              <a href="tel:+12122463052" className="hidden lg:flex items-center gap-1.5 font-bold no-underline hover:underline" style={{ fontSize: '15px', color: solidNav ? GREEN : '#d4af37' }}>
                <Phone size={15} strokeWidth={2.5} />(212) 246-3052
              </a>
              <Link to="/store" className="hidden sm:flex items-center gap-1 font-bold rounded-xl px-5 no-underline hover:opacity-90 transition-opacity" style={{ height: '48px', fontSize: '15px', background: `linear-gradient(135deg, ${GOLD}, #d4af37)`, color: '#1a1a1a' }}>
                Order 2026 Card
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center justify-center rounded-xl hover:bg-white/20 transition-colors"
                style={{ width: '52px', height: '52px', color: solidNav ? '#2a2a2a' : 'white' }}
                aria-label={`Cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`}
              >
                <ShoppingCart size={24} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 rounded-full text-white font-bold flex items-center justify-center" style={{ width: '24px', height: '24px', fontSize: '13px', background: '#8b1a2e' }}>
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMenuOpen(o => !o)}
                className="lg:hidden flex items-center justify-center rounded-xl hover:bg-white/20 transition-colors"
                style={{ width: '52px', height: '52px', color: solidNav ? '#2a2a2a' : 'white' }}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t-2 border-stone-200" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map(l => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="flex items-center w-full px-4 rounded-xl font-bold text-stone-900 hover:bg-stone-100 no-underline transition-colors"
                  style={{ height: '60px', fontSize: '20px', color: location.pathname === l.href ? GREEN : '#1a1a1a' }}
                >
                  {l.label}
                </Link>
              ))}
              <a href="tel:+12122463052" className="flex items-center gap-3 w-full px-4 rounded-xl font-bold text-stone-900 hover:bg-stone-100 no-underline" style={{ height: '60px', fontSize: '20px' }}>
                <Phone size={22} style={{ color: GREEN }} />(212) 246-3052
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <main>{children}</main>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0a1a0f', padding: '56px 24px 32px' }}>
        <div className="max-w-7xl mx-auto text-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src="https://www.nationalmahjonggleague.org/images/rsz_1rsz_1rsz_mahjong.png" alt="NMJL" style={{ height: '40px' }} onError={e => { e.target.style.display = 'none'; }} />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>National</div>
                  <div style={{ fontSize: '16px', fontWeight: 700 }}>Mah Jongg League</div>
                </div>
              </div>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7' }}>The official home of American Mah Jongg since 1937.</p>
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>Navigate</div>
              <div className="space-y-3">
                {NAV_LINKS.map(l => (
                  <Link key={l.href} to={l.href} className="block font-medium no-underline hover:text-white transition-colors" style={{ fontSize: '17px', color: 'rgba(255,255,255,0.65)' }}>{l.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>Contact</div>
              <div className="space-y-3">
                <a href="tel:+12122463052" className="block font-bold no-underline hover:text-white transition-colors" style={{ fontSize: '20px', color: '#d4af37' }}>(212) 246-3052</a>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.7' }}>450 7th Avenue, Suite 405<br />New York, NY 10123</p>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.7' }}>PO Box 50003<br />Newark NJ 07101-8006</p>
              </div>
            </div>
          </div>
          <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.35)' }}>© 2026 The National Mah Jongg League, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <CartDrawer cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} onUpdateQty={onUpdateQty} onRemove={onRemove} />

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 flex items-center gap-2 text-white shadow-2xl hover:opacity-90 z-20 rounded-2xl font-bold"
          style={{ background: GREEN, height: '56px', padding: '0 22px', fontSize: '17px' }}
          aria-label="Back to top"
        >
          <ArrowUp size={20} strokeWidth={2.5} /> Top
        </button>
      )}
    </div>
  );
}
