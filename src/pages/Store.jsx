import { useState } from 'react';
import { PRODUCTS, STORE_CATEGORIES } from '../data';

const ROSE     = '#8B3A52';
const GOLD     = '#C9A84C';
const CREAM    = '#FDF6F0';
const DEEP     = '#3D1A26';
const BURGUNDY = '#5C1A2A';

function ProductCard({ product, addToCart }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${ROSE}18`,
      borderTop: `4px solid ${ROSE}`,
      display: 'flex', flexDirection: 'column',
      position: 'relative',
    }}>
      {product.badge && (
        <div style={{
          position: 'absolute', top: 16, right: 0,
          background: product.badge === 'New 2026' ? BURGUNDY : GOLD,
          color: '#fff',
          fontFamily: "'Lora', Georgia, serif",
          fontWeight: 600, fontSize: 11,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '5px 14px',
        }}>
          {product.badge}
        </div>
      )}
      <div style={{ padding: '28px 24px 24px', flex: 1 }}>
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700, fontSize: 19,
          color: ROSE, margin: '0 0 10px', lineHeight: 1.25,
          paddingRight: product.badge ? 80 : 0,
        }}>
          {product.name}
        </h3>
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: 15, lineHeight: 1.65,
          color: '#666', margin: '0 0 20px',
        }}>
          {product.desc}
        </p>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700, fontSize: 28,
          color: ROSE,
        }}>
          ${product.price.toFixed(2)}
        </div>
      </div>

      {/* Add controls */}
      <div style={{ padding: '0 24px 24px', display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: `2px solid ${ROSE}30` }}>
          <button onClick={() => setQty(q => Math.max(1, q - 1))}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px', fontSize: 18, color: ROSE }}>−</button>
          <span style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 16, padding: '0 8px', color: ROSE, minWidth: 28, textAlign: 'center' }}>
            {qty}
          </span>
          <button onClick={() => setQty(q => q + 1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px', fontSize: 18, color: ROSE }}>+</button>
        </div>
        <button onClick={handleAdd}
          style={{
            flex: 1,
            fontFamily: "'Lora', Georgia, serif",
            fontWeight: 600, fontSize: 13,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            background: added ? '#a05070' : ROSE,
            color: '#fff', border: 'none',
            padding: '10px 0', cursor: 'pointer',
            borderRadius: 40,
            transition: 'background 0.2s',
          }}>
          {added ? '✓ Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default function Store({ addToCart }) {
  const [activeCat, setActiveCat] = useState('All');

  const cards2026 = PRODUCTS.filter(p => p.badge === 'New 2026');
  const filtered = PRODUCTS
    .filter(p => p.badge !== 'New 2026')
    .filter(p => activeCat === 'All' || p.cat === activeCat);

  const countFor = cat => cat === 'All'
    ? PRODUCTS.filter(p => p.badge !== 'New 2026').length
    : PRODUCTS.filter(p => p.cat === cat && p.badge !== 'New 2026').length;

  return (
    <div style={{ background: CREAM, paddingTop: 72 }}>
      {/* Page header */}
      <div style={{ background: DEEP, padding: '52px 32px 44px', borderBottom: `4px solid ${GOLD}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: GOLD, marginBottom: 10,
            background: 'rgba(201,168,76,0.15)', padding: '4px 14px',
          }}>
            Official NMJL Shop
          </div>
          <div style={{ color: 'rgba(253,246,240,0.45)', fontSize: 12, letterSpacing: 6, margin: '6px 0 8px' }}>— ✦ —</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', margin: 0 }}>
            The <em style={{ fontStyle: 'italic' }}>Store</em>
          </h1>
        </div>
      </div>

      {/* 2026 pinned block */}
      <div style={{ background: `${GOLD}18`, borderBottom: `3px solid ${GOLD}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <div style={{ width: 4, height: 32, background: GOLD }} />
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 26, color: ROSE, margin: 0 }}>
              2026 <em style={{ fontStyle: 'italic' }}>Rule Cards</em>
            </h2>
            <div style={{ fontFamily: "'Lora', serif", fontSize: 14, color: '#888', fontStyle: 'italic' }}>
              — Ships April 2026
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
            {cards2026.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}
          </div>
        </div>
      </div>

      {/* Main: sidebar + grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 32px', display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        {/* Sidebar */}
        <aside style={{ width: 200, flexShrink: 0, position: 'sticky', top: 96 }}>
          <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
            Categories
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {STORE_CATEGORIES.map(cat => {
              const active = activeCat === cat;
              return (
                <li key={cat}>
                  <button onClick={() => setActiveCat(cat)} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    width: '100%', textAlign: 'left',
                    background: active ? `${ROSE}08` : 'none', border: 'none',
                    borderLeft: active ? `3px solid ${GOLD}` : '3px solid transparent',
                    padding: '11px 14px',
                    cursor: 'pointer',
                    fontFamily: "'Lora', Georgia, serif",
                    fontWeight: active ? 600 : 400, fontSize: 17,
                    color: active ? ROSE : '#555',
                    transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                  }}>
                    <span>{cat}</span>
                    <span style={{ fontSize: 13, color: '#aaa', fontWeight: 400 }}>{countFor(cat)}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mail order info */}
          <div style={{ marginTop: 36, borderTop: `1px solid ${ROSE}18`, paddingTop: 24 }}>
            <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: 12 }}>
              Mail Orders
            </div>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 15, lineHeight: 1.7, color: '#666', margin: 0 }}>
              Send check to:<br />
              <strong style={{ color: ROSE }}>NMJL</strong><br />
              PO Box 50003<br />
              Newark NJ 07101-8006
            </p>
          </div>
        </aside>

        {/* Product grid */}
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Lora', serif", fontSize: 15, color: '#888', marginBottom: 24 }}>
            Showing {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
            {activeCat !== 'All' && <span style={{ color: ROSE, fontWeight: 600 }}> in {activeCat}</span>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 2 }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '64px 32px', color: '#aaa', fontFamily: "'Lora', serif", fontSize: 18 }}>
              No items in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
