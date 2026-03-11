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

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const solid = scrolled || !isHome;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f2ea', fontFamily: 'Georgia, "Times New Roman", serif' }}>

      {/* ══ HEADER ══ */}
      <header
        className="fixed top-0 left-0 right-0 z-30 transition-all duration-300"
        style={{
          background: solid ? 'white' : 'rgba(5,20,12,0.80)',
          borderBottom: solid ? `3px solid ${GREEN}` : 'none',
          boxShadow: solid ? '0 2px 12px rgba(0,0,0,0.10)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '68px' }}>

            {/* Logo */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', flexShrink: 0 }}>
              <img
                src="https://www.nationalmahjonggleague.org/images/rsz_1rsz_1rsz_mahjong.png"
                alt="NMJL Logo"
                style={{ height: '42px', width: 'auto' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: solid ? GREEN : '#d4af37' }}>National</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: solid ? DARK : 'white', lineHeight: 1.2, fontFamily: 'Georgia, serif' }}>Mah Jongg League</div>
              </div>
            </Link>

            {/* Desktop Nav — 5 clean links */}
            <nav style={{ display: 'none' }} className="lg-nav">
              <style>{`
                @media (min-width: 1024px) { .lg-nav { display: flex !important; align-items: center; gap: 4px; } }
              `}</style>
              {NAV_LINKS.map(l => {
                const active = location.pathname === l.href || (l.href !== '/' && location.pathname.startsWith(l.href));
                return (
                  <Link
                    key={l.href}
                    to={l.href}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '16px',
                      textDecoration: 'none',
                      color: solid ? (active ? GREEN : '#1a1a1a') : (active ? '#86efac' : 'white'),
                      background: active && solid ? 'rgba(26,92,58,0.08)' : 'transparent',
                      borderBottom: active ? `2px solid ${active && solid ? GREEN : '#d4af37'}` : '2px solid transparent',
                      transition: 'all 0.15s',
                    }}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: CTA + Cart + Hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link
                to="/store"
                style={{
                  display: 'none',
                  alignItems: 'center',
                  height: '44px',
                  padding: '0 18px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '15px',
                  textDecoration: 'none',
                  background: `linear-gradient(135deg, ${GOLD}, #d4af37)`,
                  color: '#1a1a1a',
                  whiteSpace: 'nowrap',
                }}
                className="store-cta"
              >
                <style>{`@media (min-width: 640px) { .store-cta { display: flex !important; } }`}</style>
                Order 2026 Card
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '10px', border: 'none', background: 'transparent', cursor: 'pointer', color: solid ? '#1a1a1a' : 'white' }}
                aria-label={`Cart${cartCount > 0 ? ` — ${cartCount} items` : ''}`}
              >
                <ShoppingCart size={22} strokeWidth={2} />
                {cartCount > 0 && (
                  <span style={{ position: 'absolute', top: '2px', right: '2px', width: '20px', height: '20px', borderRadius: '50%', background: '#8b1a2e', color: 'white', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMenuOpen(o => !o)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '10px', border: 'none', background: 'transparent', cursor: 'pointer', color: solid ? '#1a1a1a' : 'white' }}
                className="hamburger"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                <style>{`@media (min-width: 1024px) { .hamburger { display: none !important; } }`}</style>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: 'white', borderTop: '2px solid #e5e2db', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '12px 16px 16px', maxWidth: '1140px', margin: '0 auto' }}>
              {NAV_LINKS.map(l => (
                <Link
                  key={l.href}
                  to={l.href}
                  style={{ display: 'flex', alignItems: 'center', padding: '16px', borderRadius: '12px', fontWeight: 700, fontSize: '20px', color: location.pathname === l.href ? GREEN : '#1a1a1a', textDecoration: 'none', background: location.pathname === l.href ? 'rgba(26,92,58,0.07)' : 'transparent', marginBottom: '2px' }}
                >
                  {l.label}
                </Link>
              ))}
              <a href="tel:+12122463052" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px', borderRadius: '12px', fontWeight: 700, fontSize: '20px', color: '#1a1a1a', textDecoration: 'none', marginBottom: '2px' }}>
                <Phone size={20} color={GREEN} /> (212) 246-3052
              </a>
              <Link to="/store" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', borderRadius: '12px', fontWeight: 700, fontSize: '20px', color: '#1a1a1a', textDecoration: 'none', background: `linear-gradient(135deg, ${GOLD}, #d4af37)`, marginTop: '4px' }}>
                Order 2026 Card
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <main>{children}</main>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: '#0a1a0f', padding: '52px 24px 28px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', color: 'white' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '36px', marginBottom: '40px' }}>

            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <img src="https://www.nationalmahjonggleague.org/images/rsz_1rsz_1rsz_mahjong.png" alt="NMJL" style={{ height: '36px' }} onError={e => { e.target.style.display = 'none'; }} />
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>National</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'Georgia, serif' }}>Mah Jongg League</div>
                </div>
              </div>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.7', margin: 0 }}>The official home of American Mah Jongg since 1937.</p>
            </div>

            {/* Navigation */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>Navigation</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {NAV_LINKS.map(l => (
                  <Link key={l.href} to={l.href} style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontWeight: 500 }}>{l.label}</Link>
                ))}
                <Link to="/charity" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontWeight: 500 }}>Charitable Work</Link>
                <Link to="/game" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontWeight: 500 }}>The Game</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>Contact</div>
              <a href="tel:+12122463052" style={{ display: 'block', fontSize: '20px', fontWeight: 700, color: '#d4af37', textDecoration: 'none', marginBottom: '10px' }}>(212) 246-3052</a>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.75', margin: 0 }}>
                450 7th Avenue, Suite 405<br />New York, NY 10123<br /><br />
                PO Box 50003<br />Newark NJ 07101-8006
              </p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>© 2026 The National Mah Jongg League, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <CartDrawer cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} onUpdateQty={onUpdateQty} onRemove={onRemove} />

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ position: 'fixed', bottom: '24px', right: '24px', display: 'flex', alignItems: 'center', gap: '6px', height: '52px', padding: '0 20px', borderRadius: '12px', background: GREEN, color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '16px', zIndex: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
          aria-label="Back to top"
        >
          <ArrowUp size={18} strokeWidth={2.5} /> Top
        </button>
      )}
    </div>
  );
}
