import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HERO_IMAGES, PRODUCTS } from '../data';

const ROSE     = '#8B3A52';
const DUSTY    = '#C4758A';
const GOLD     = '#C9A84C';
const CREAM    = '#FDF6F0';
const DEEP     = '#3D1A26';
const BURGUNDY = '#5C1A2A';

const cards2026 = PRODUCTS.filter(p => p.badge === 'New 2026');

const NAV_TILES = [
  { label: 'Shop the Store',     sub: 'Rule cards, tiles, apparel & more', href: '/store',   icon: '🀄' },
  { label: 'About the League',   sub: 'Founded 1937 in New York City',      href: '/about',   icon: '🏛' },
  { label: 'How to Play',        sub: 'Rules, hand guides & strategy',      href: '/game',    icon: '🀙' },
  { label: 'Charitable Giving',  sub: '$3M+ donated to 28 organizations',   href: '/charity', icon: '♥' },
  { label: 'FAQ',                sub: 'Answers to common questions',         href: '/faq',     icon: '❓' },
  { label: 'Contact Us',         sub: '450 7th Ave, New York, NY',          href: '/contact', icon: '✉' },
];

export default function Home({ addToCart }) {
  const [slide, setSlide] = useState(0);
  const [qty,   setQty]   = useState({ 1: 1, 2: 1, 25: 1 });

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: CREAM }}>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        height: '100vh', minHeight: 600,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Rotating background images */}
        {HERO_IMAGES.map((src, i) => (
          <div key={src} style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: i === slide ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
          }} />
        ))}
        {/* Dark overlay — warm rose-dark */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(42,10,22,0.62)' }} />

        {/* Hero content */}
        <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px', maxWidth: 760 }}>
          {/* Year badge */}
          <div style={{
            display: 'inline-block',
            fontFamily: "'Lora', Georgia, serif",
            fontWeight: 600, fontSize: 13,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: GOLD, border: `1px solid ${GOLD}`,
            padding: '6px 20px', marginBottom: 28,
          }}>
            Est. 1937 &nbsp;·&nbsp; New York City
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 900, fontSize: 'clamp(40px, 7vw, 80px)',
            lineHeight: 1.1, color: '#fff',
            margin: '0 0 24px',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
          }}>
            National Mah Jongg<br />
            <em style={{ fontStyle: 'italic', color: '#F0DFA0' }}>League</em>
          </h1>

          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontWeight: 400, fontSize: 'clamp(18px, 2.5vw, 22px)',
            color: 'rgba(255,255,255,0.88)', margin: 0,
            lineHeight: 1.6,
          }}>
            The official home of American Mah Jongg since 1937.<br />
            350,000+ members. One community.
          </p>
        </div>

        {/* Slide dots */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10 }}>
          {HERO_IMAGES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i+1}`}
              style={{
                width: i === slide ? 28 : 10, height: 10,
                borderRadius: 5, border: 'none', cursor: 'pointer',
                background: i === slide ? GOLD : 'rgba(255,255,255,0.45)',
                transition: 'width 0.3s, background 0.3s', padding: 0,
              }} />
          ))}
        </div>
      </section>

      {/* ── ANNOUNCEMENT BAR ──────────────────────────────────────── */}
      <div style={{
        background: ROSE, color: '#fff',
        textAlign: 'center', padding: '18px 24px',
        borderBottom: `3px solid ${GOLD}`,
      }}>
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontWeight: 600, fontSize: 18,
          margin: 0, letterSpacing: '0.03em',
        }}>
          <span style={{ color: GOLD, marginRight: 12 }}>🀄</span>
          2026 Rule Cards Now Available — Ships April
          <span style={{ color: GOLD, marginLeft: 12 }}>🀄</span>
        </p>
      </div>

      {/* ── 2026 CARD SECTION ─────────────────────────────────────── */}
      <section style={{ padding: '80px 32px', maxWidth: 1280, margin: '0 auto' }}>
        {/* Editorial header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 48 }}>
          <div style={{ flex: 1, height: 1, background: `${ROSE}25` }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 600, fontSize: 12,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: GOLD, marginBottom: 6,
              background: `${ROSE}10`,
              padding: '4px 16px',
            }}>
              New This Year
            </div>
            <div style={{ color: `${ROSE}50`, fontSize: 12, letterSpacing: 6, margin: '6px 0' }}>— ✦ —</div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900, fontSize: 'clamp(28px, 4vw, 44px)',
              color: ROSE, margin: 0,
            }}>
              2026 Official <em style={{ fontStyle: 'italic' }}>Rule Cards</em>
            </h2>
          </div>
          <div style={{ flex: 1, height: 1, background: `${ROSE}25` }} />
        </div>

        {/* Card grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {cards2026.map((card, idx) => (
            <div key={card.id} style={{
              background: idx === 2 ? DEEP : '#fff',
              border: `2px solid ${idx === 2 ? GOLD : `${ROSE}20`}`,
              borderTop: `5px solid ${idx === 2 ? GOLD : ROSE}`,
              padding: '36px 28px',
              position: 'relative',
            }}>
              {/* Badge */}
              <div style={{
                display: 'inline-block',
                background: BURGUNDY, color: '#fff',
                fontFamily: "'Lora', Georgia, serif",
                fontWeight: 600, fontSize: 11,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '4px 12px', marginBottom: 20,
              }}>
                {card.badge}
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700, fontSize: 22,
                color: idx === 2 ? '#fff' : ROSE,
                margin: '0 0 10px', lineHeight: 1.2,
              }}>
                {card.name}
              </h3>
              <p style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: 16, lineHeight: 1.65,
                color: idx === 2 ? 'rgba(253,246,240,0.8)' : '#555',
                margin: '0 0 28px',
              }}>
                {card.desc}
              </p>
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700, fontSize: 32,
                color: idx === 2 ? GOLD : ROSE,
                marginBottom: 24,
              }}>
                ${card.price.toFixed(2)}
              </div>

              {/* Qty + Add */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  border: `2px solid ${idx === 2 ? 'rgba(201,168,76,0.5)' : `${ROSE}35`}`,
                }}>
                  <button onClick={() => setQty(q => ({ ...q, [card.id]: Math.max(1, (q[card.id]||1) - 1) }))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px', fontSize: 18, color: idx === 2 ? '#FDF6F0' : ROSE }}>
                    −
                  </button>
                  <span style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 17, padding: '0 10px', color: idx === 2 ? '#fff' : ROSE }}>
                    {qty[card.id] || 1}
                  </span>
                  <button onClick={() => setQty(q => ({ ...q, [card.id]: (q[card.id]||1) + 1 }))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px', fontSize: 18, color: idx === 2 ? '#FDF6F0' : ROSE }}>
                    +
                  </button>
                </div>
                <button onClick={() => addToCart(card, qty[card.id] || 1)}
                  style={{
                    flex: 1,
                    fontFamily: "'Lora', Georgia, serif",
                    fontWeight: 600, fontSize: 14,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    background: idx === 2 ? GOLD : ROSE,
                    color: '#fff', border: 'none',
                    padding: '12px 0', cursor: 'pointer',
                    borderRadius: 40,
                    transition: 'opacity 0.2s',
                  }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION DIVIDER ───────────────────────────────────────── */}
      <div style={{ background: `${ROSE}08`, borderTop: `1px solid ${ROSE}18`, borderBottom: `1px solid ${ROSE}18`, padding: '12px 0', textAlign: 'center', letterSpacing: 16, fontSize: 16, color: `${ROSE}50` }}>
        🀇 &nbsp; 🀈 &nbsp; 🀙 &nbsp; 🀠 &nbsp; 🀅
      </div>

      {/* ── NAVIGATION TILES ──────────────────────────────────────── */}
      <section style={{
        padding: '80px 32px',
        background: CREAM,
        backgroundImage: `radial-gradient(circle, ${ROSE}18 1px, transparent 1px)`,
        backgroundSize: '22px 22px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{
              display: 'inline-block',
              fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: GOLD, marginBottom: 6,
              background: `${ROSE}10`,
              padding: '4px 16px',
            }}>
              Everything We Offer
            </div>
            <div style={{ color: `${ROSE}50`, fontSize: 12, letterSpacing: 6, margin: '6px 0' }}>— ✦ —</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(26px, 4vw, 40px)', color: ROSE, margin: 0 }}>
              Explore <em style={{ fontStyle: 'italic' }}>the League</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, border: `1px solid ${ROSE}18` }}>
            {NAV_TILES.map((tile, i) => (
              <Link key={tile.href} to={tile.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '36px 28px',
                  background: '#fff',
                  borderLeft: i % 3 !== 0 ? `1px solid ${ROSE}12` : 'none',
                  borderBottom: i < 3 ? `1px solid ${ROSE}12` : 'none',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = `${ROSE}06`}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <div style={{ fontSize: 28, marginBottom: 14 }}>{tile.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 20, color: ROSE, margin: '0 0 8px' }}>
                    {tile.label}
                  </h3>
                  <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 16, color: '#666', margin: 0, lineHeight: 1.5 }}>
                    {tile.sub}
                  </p>
                  <div style={{ marginTop: 20, fontFamily: "'Lora', serif", fontSize: 14, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: GOLD }}>
                    Learn more →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER TRUTHS BAND ────────────────────────────────────── */}
      <section style={{ background: DEEP, padding: '64px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 40 }}>
          {[
            { num: '350,000+', label: 'Active Members', sub: 'Across North America and beyond' },
            { num: '89',       label: 'Years of Play',  sub: 'Founded in New York City, 1937' },
            { num: '$3M+',     label: 'Given to Charity', sub: 'Supporting 28 organizations' },
          ].map(fact => (
            <div key={fact.num} style={{ textAlign: 'center', borderTop: `3px solid ${GOLD}`, paddingTop: 28 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 52, color: GOLD, lineHeight: 1 }}>
                {fact.num}
              </div>
              <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 18, color: '#fff', margin: '10px 0 6px', letterSpacing: '0.03em' }}>
                {fact.label}
              </div>
              <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 15, color: 'rgba(253,246,240,0.6)' }}>
                {fact.sub}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
