import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Minus, Plus, Check, ShoppingCart, Package } from 'lucide-react';
import { PRODUCTS, STORE_CATEGORIES, GREEN, DARK } from '../data';

const CAT_ICONS = {
  'Rule Cards':   '📋',
  'Tiles & Sets': '🀄',
  'Accessories':  '🎯',
  'Apparel':      '👕',
  'Books':        '📖',
};

// ── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, onAdd }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAdd(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const badgeColors = {
    'New 2026':   { bg: '#1a5c3a', text: 'white' },
    'Best Value': { bg: '#8b1a2e', text: 'white'  },
  };
  const badge = product.badge ? badgeColors[product.badge] : null;

  return (
    <div
      className="bg-white rounded-2xl flex flex-col overflow-hidden transition-shadow duration-200 hover:shadow-lg"
      style={{ border: '2px solid #e5e2db', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
    >
      {/* Top accent */}
      <div style={{ height: '6px', background: `linear-gradient(90deg, ${GREEN}, #2d7a52)`, flexShrink: 0 }} />

      <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
        {/* Badge */}
        {badge && (
          <div>
            <span style={{ background: badge.bg, color: badge.text, fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Name */}
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 700, color: DARK, lineHeight: '1.35', margin: 0 }}>
          {product.name}
        </h3>

        {/* Description */}
        <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6', margin: 0, flex: 1 }}>
          {product.desc}
        </p>

        {/* Price */}
        <div style={{ fontSize: '28px', fontWeight: 700, color: GREEN, lineHeight: 1 }}>
          ${product.price.toFixed(2)}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#ede9e1' }} />

        {/* Qty + Add */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #d1cdc5', borderRadius: '10px', overflow: 'hidden' }}>
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f3ef', border: 'none', cursor: 'pointer', borderRight: '2px solid #d1cdc5', fontSize: '20px', color: '#444', fontWeight: 700 }}
              aria-label="Decrease quantity"
            >
              <Minus size={15} strokeWidth={2.5} />
            </button>
            <span style={{ width: '36px', textAlign: 'center', fontSize: '18px', fontWeight: 700, color: DARK }}>
              {qty}
            </span>
            <button
              onClick={() => setQty(q => q + 1)}
              style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f3ef', border: 'none', cursor: 'pointer', borderLeft: '2px solid #d1cdc5', fontSize: '20px', color: '#444', fontWeight: 700 }}
              aria-label="Increase quantity"
            >
              <Plus size={15} strokeWidth={2.5} />
            </button>
          </div>

          <button
            onClick={handleAdd}
            style={{
              flex: 1,
              height: '46px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '15px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: added ? '#059669' : `linear-gradient(135deg, ${GREEN}, #2d7a52)`,
              transition: 'all 0.15s',
            }}
          >
            {added
              ? <><Check size={16} strokeWidth={2.5} /> Added!</>
              : <><ShoppingCart size={16} /> Add to Cart</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 2026 Featured Strip ───────────────────────────────────────────────────────
function FeaturedStrip({ onAdd }) {
  const cards2026 = PRODUCTS.filter(p => [1, 2, 25].includes(p.id));
  return (
    <div style={{ background: '#fffbf0', border: '2px solid #c9a227', borderRadius: '16px', padding: '24px', marginBottom: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
        <span style={{ background: '#b8960c', color: 'white', fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          New for 2026
        </span>
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 700, color: DARK, margin: 0 }}>
          2026 Official Rule Cards
        </h3>
      </div>
      <p style={{ fontSize: '15px', color: '#7a6520', marginBottom: '20px' }}>
        Ships beginning of April — order now to reserve yours.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '16px' }}>
        {cards2026.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} />)}
      </div>
    </div>
  );
}

// ── Store Page ────────────────────────────────────────────────────────────────
export default function Store({ onAdd }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'All';
  const [activeCat, setActiveCat] = useState(STORE_CATEGORIES.includes(initialCat) ? initialCat : 'All');
  const listRef = useRef(null);

  function selectCat(cat) {
    setActiveCat(cat);
    setSearchParams(cat === 'All' ? {} : { cat });
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const show2026 = activeCat === 'All' || activeCat === 'Rule Cards';
  const mainProducts = PRODUCTS
    .filter(p => activeCat === 'All' ? true : p.cat === activeCat)
    .filter(p => show2026 ? ![1, 2, 25].includes(p.id) : true);

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: '#f5f2ea' }}>

      {/* Page header */}
      <div style={{ background: GREEN, padding: '40px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, color: 'white', marginBottom: '6px' }}>
            The Official NMJL Store
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.82)', margin: 0 }}>
            All official NMJL merchandise — rule cards, tiles, accessories, apparel, and books.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '36px 20px' }}>
        <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>

          {/* ── Sidebar ── */}
          <aside style={{ width: '220px', flexShrink: 0 }}>
            <div style={{ background: 'white', borderRadius: '16px', border: '2px solid #e0ddd6', overflow: 'hidden', position: 'sticky', top: '88px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ padding: '14px 18px', borderBottom: '2px solid #e0ddd6', background: '#f5f2ea' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666' }}>Categories</span>
              </div>
              {STORE_CATEGORIES.map(cat => {
                const count = cat === 'All' ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === cat).length;
                const active = activeCat === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => selectCat(cat)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '13px 18px',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: active ? 'white' : '#2a2a2a',
                      background: active ? GREEN : 'transparent',
                      border: 'none',
                      borderBottom: '1px solid #ede9e1',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {cat !== 'All' && <span style={{ fontSize: '16px' }}>{CAT_ICONS[cat]}</span>}
                      {cat}
                    </span>
                    <span style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      padding: '1px 8px',
                      borderRadius: '999px',
                      background: active ? 'rgba(255,255,255,0.25)' : '#ede9e1',
                      color: active ? 'white' : '#666',
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mail order */}
            <div style={{ marginTop: '16px', background: '#fffbf0', border: '2px solid #c9a227', borderRadius: '16px', padding: '18px' }}>
              <p style={{ fontSize: '15px', fontWeight: 700, color: '#7a5c00', marginBottom: '8px' }}>📬 Order by Mail</p>
              <p style={{ fontSize: '14px', color: '#5a4000', lineHeight: '1.7', margin: 0 }}>
                Send a check to:<br />
                <strong>NMJL, PO Box 50003<br />Newark NJ 07101-8006</strong>
              </p>
              <p style={{ fontSize: '13px', color: '#6a5000', marginTop: '8px', lineHeight: '1.6' }}>
                Include your name, address, and exact number of items.
              </p>
            </div>
          </aside>

          {/* ── Product area ── */}
          <div style={{ flex: 1, minWidth: 0 }} ref={listRef}>

            {/* Category heading */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 700, color: DARK, margin: 0 }}>
                {activeCat === 'All' ? 'All Products' : `${CAT_ICONS[activeCat] || ''} ${activeCat}`}
              </h2>
              <span style={{ fontSize: '15px', color: '#888', fontWeight: 600 }}>
                {(activeCat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCat)).length} items
              </span>
            </div>

            {/* 2026 spotlight */}
            {show2026 && <FeaturedStrip onAdd={onAdd} />}

            {/* Remaining products — card grid */}
            {mainProducts.length > 0 && (
              <>
                {show2026 && (
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '17px', fontWeight: 700, color: '#555', marginBottom: '16px', paddingBottom: '10px', borderBottom: '2px solid #e0ddd6' }}>
                    All Other Products
                  </h3>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                  {mainProducts.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} />)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
