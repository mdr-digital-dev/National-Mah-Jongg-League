import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import CartDrawer from './CartDrawer';
import { NAV_LINKS } from '../data';

const GREEN   = '#1C3A2A';
const GOLD    = '#C9A84C';
const CREAM   = '#F7F2E8';

export default function Layout({ children, cart, updateQty, removeFromCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [backTop,  setBackTop]  = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setBackTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const solid = !isHome || scrolled;
  const linkColor = solid ? GREEN : '#fff';
  const logoFilter = solid ? 'none' : 'brightness(0) invert(1)';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: solid ? '#fff' : 'transparent',
        borderBottom: solid ? `2px solid ${GREEN}` : 'none',
        transition: 'background 0.35s, border-color 0.35s',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 32px',
          height: 72,
          display: 'flex', alignItems: 'center', gap: 24,
        }}>
          {/* Logo */}
          <Link to="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <img
              src="https://www.nationalmahjonggleague.org/images/rsz_1rsz_1rsz_mahjong.png"
              alt="NMJL"
              style={{ height: 44, width: 'auto', filter: logoFilter, transition: 'filter 0.35s' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900, fontSize: 13,
              lineHeight: 1.25, color: linkColor,
              transition: 'color 0.35s',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              National<br />Mah Jongg<br />League
            </span>
          </Link>

          {/* Desktop nav — centered */}
          <nav style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 36 }}
               className="desktop-nav">
            {NAV_LINKS.map(link => {
              const active = location.pathname === link.href;
              return (
                <Link key={link.href} to={link.href} style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontWeight: 500, fontSize: 15,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: active ? GOLD : linkColor,
                  borderBottom: active ? `2px solid ${GOLD}` : '2px solid transparent',
                  paddingBottom: 2,
                  transition: 'color 0.2s',
                }}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Cart + CTA + Hamburger */}
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 14 }}>
            <button onClick={() => setCartOpen(true)} aria-label={`Cart (${totalQty} items)`}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: linkColor, position: 'relative', padding: 4, transition: 'color 0.35s' }}>
              <ShoppingCart size={24} />
              {totalQty > 0 && (
                <span style={{
                  position: 'absolute', top: -5, right: -7,
                  background: GOLD, color: '#fff',
                  fontFamily: "'Lora', serif", fontWeight: 700, fontSize: 11,
                  borderRadius: '50%', width: 20, height: 20,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{totalQty}</span>
              )}
            </button>

            <Link to="/store" className="cta-btn" style={{
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 600, fontSize: 13,
              letterSpacing: '0.07em', textTransform: 'uppercase',
              textDecoration: 'none', color: '#fff',
              background: GOLD, border: `2px solid ${GOLD}`,
              borderRadius: 40, padding: '8px 20px',
              display: 'inline-block', whiteSpace: 'nowrap',
              transition: 'background 0.2s, color 0.2s',
            }}>
              Order 2026 Card
            </Link>

            <button onClick={() => setMenuOpen(m => !m)} aria-label="Toggle menu"
              className="hamburger-btn"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: linkColor, padding: 4, display: 'none', transition: 'color 0.35s' }}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid #e5e0d5', paddingBottom: 16 }}>
            {NAV_LINKS.map(link => (
              <Link key={link.href} to={link.href} style={{
                display: 'block', padding: '13px 32px',
                fontFamily: "'Lora', Georgia, serif",
                fontWeight: 500, fontSize: 18,
                color: location.pathname === link.href ? GOLD : GREEN,
                textDecoration: 'none',
                borderLeft: location.pathname === link.href ? `4px solid ${GOLD}` : '4px solid transparent',
              }}>
                {link.label}
              </Link>
            ))}
            <div style={{ padding: '12px 32px' }}>
              <Link to="/store" style={{
                display: 'inline-block',
                fontFamily: "'Lora', Georgia, serif",
                fontWeight: 600, fontSize: 15,
                color: '#fff', background: GOLD,
                border: `2px solid ${GOLD}`,
                borderRadius: 40, padding: '10px 24px',
                textDecoration: 'none', letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                Order 2026 Card
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── MAIN ────────────────────────────────────────────────────── */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer style={{ background: GREEN, color: CREAM }}>
        <div style={{ background: GOLD, height: 4 }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 32px 40px' }}>
          <div style={{ textAlign: 'center', fontSize: 20, letterSpacing: 10, marginBottom: 48, opacity: 0.35 }}>
            🀇 &nbsp; 🀙 &nbsp; 🀠 &nbsp; 🀅
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40 }}>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 20, color: '#fff', margin: '0 0 14px' }}>
                National Mah Jongg League
              </h3>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 16, lineHeight: 1.75, color: 'rgba(247,242,232,0.7)', margin: 0 }}>
                The official governing body of American Mah Jongg. Preserving the game and its community since 1937.
              </p>
            </div>
            <div>
              <h4 style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, margin: '0 0 16px' }}>
                Navigate
              </h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[...NAV_LINKS, { label: 'Charity', href: '/charity' }, { label: 'How to Play', href: '/game' }].map(l => (
                  <li key={l.href}>
                    <Link to={l.href} style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 16, color: 'rgba(247,242,232,0.75)', textDecoration: 'none' }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, margin: '0 0 16px' }}>
                Contact
              </h4>
              <address style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: 'normal', fontSize: 16, lineHeight: 1.85, color: 'rgba(247,242,232,0.75)' }}>
                450 Seventh Avenue, Suite 405<br />
                New York, NY 10123<br /><br />
                Mail Orders: PO Box 50003<br />
                Newark, NJ 07101-8006<br /><br />
                <a href="tel:+12122463052" style={{ color: GOLD, textDecoration: 'none' }}>(212) 246-3052</a>
              </address>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(247,242,232,0.12)', marginTop: 48, paddingTop: 24, textAlign: 'center' }}>
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 14, color: 'rgba(247,242,232,0.4)', margin: 0 }}>
              &copy; {new Date().getFullYear()} National Mah Jongg League, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onUpdateQty={updateQty} onRemove={removeFromCart} />

      {backTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"
          style={{
            position: 'fixed', bottom: 32, right: 32, zIndex: 50,
            background: GREEN, color: CREAM,
            border: `2px solid ${GOLD}`, borderRadius: '50%',
            width: 48, height: 48, cursor: 'pointer',
            fontFamily: "'Lora', serif", fontSize: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          ↑
        </button>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .cta-btn { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
        .cta-btn:hover { background: #b8960c !important; border-color: #b8960c !important; }
      `}</style>
    </div>
  );
}
