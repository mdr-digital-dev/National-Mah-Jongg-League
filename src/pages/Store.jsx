import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Minus, Plus, Check, ShoppingCart } from 'lucide-react';
import { PRODUCTS, STORE_CATEGORIES, GREEN, DARK } from '../data';

// ── Single product row ──────────────────────────────────────────────────────
function ProductRow({ product, onAdd, isEven }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAdd(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const badgeStyle = {
    'New 2026':  { background: GREEN,    color: 'white'  },
    'Best Value': { background: '#8b1a2e', color: 'white' },
  };
  const bs = product.badge ? badgeStyle[product.badge] : null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 px-6 border-b border-stone-200 last:border-0" style={{ background: isEven ? '#fff' : '#f8f8f6' }}>
      {/* Left: name + desc */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="font-bold" style={{ fontSize: '19px', color: DARK, lineHeight: '1.3' }}>{product.name}</h3>
          {bs && (
            <span className="inline-block font-bold px-3 py-0.5 rounded-full text-sm" style={{ ...bs, fontSize: '13px' }}>
              {product.badge}
            </span>
          )}
        </div>
        <p style={{ fontSize: '17px', color: '#555', lineHeight: '1.55' }}>{product.desc}</p>
      </div>

      {/* Right: price + qty + button */}
      <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
        {/* Price */}
        <span className="font-bold" style={{ fontSize: '22px', color: GREEN, minWidth: '70px' }}>
          ${product.price.toFixed(2)}
        </span>

        {/* Qty */}
        <div className="flex items-center gap-2">
          <button onClick={() => setQty(q => Math.max(1, q - 1))} className="flex items-center justify-center rounded-lg border-2 border-stone-300 font-bold hover:bg-stone-100 transition-colors" style={{ width: '48px', height: '48px' }} aria-label="Decrease"><Minus size={16} strokeWidth={2.5} /></button>
          <span className="font-bold text-center" style={{ width: '30px', fontSize: '18px' }}>{qty}</span>
          <button onClick={() => setQty(q => q + 1)} className="flex items-center justify-center rounded-lg border-2 border-stone-300 font-bold hover:bg-stone-100 transition-colors" style={{ width: '48px', height: '48px' }} aria-label="Increase"><Plus size={16} strokeWidth={2.5} /></button>
        </div>

        {/* Add button */}
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-xl font-bold text-white transition-all hover:opacity-90"
          style={{ height: '48px', padding: '0 20px', fontSize: '16px', minWidth: '148px', justifyContent: 'center', background: added ? '#059669' : `linear-gradient(135deg, ${GREEN}, #2d7a52)` }}
        >
          {added ? <><Check size={18} strokeWidth={2.5} /> Added!</> : <><ShoppingCart size={18} /> Add to Cart</>}
        </button>
      </div>
    </div>
  );
}

// ── Store Page ──────────────────────────────────────────────────────────────
export default function Store({ onAdd }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'All';
  const [activeCat, setActiveCat] = useState(STORE_CATEGORIES.includes(initialCat) ? initialCat : 'All');
  const listRef = useRef(null);

  function selectCat(cat) {
    setActiveCat(cat);
    setSearchParams(cat === 'All' ? {} : { cat });
    // Scroll list to top on mobile
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const filtered = activeCat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCat);

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: '#faf6ee' }}>
      {/* Page header */}
      <div style={{ background: GREEN, padding: '40px 24px' }}>
        <div className="max-w-6xl mx-auto">
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
            The Official NMJL Store
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)' }}>
            Rule cards, tiles, accessories, apparel, and books — all official NMJL merchandise.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Sidebar: categories ── */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border-2 border-stone-200 overflow-hidden sticky top-24">
              <div className="px-5 py-4 border-b-2 border-stone-200" style={{ background: '#f5f5f0' }}>
                <h2 className="font-bold" style={{ fontSize: '17px', color: DARK }}>Browse by Category</h2>
              </div>
              <nav>
                {STORE_CATEGORIES.map(cat => {
                  const count = cat === 'All' ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === cat).length;
                  const active = activeCat === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => selectCat(cat)}
                      className="flex items-center justify-between w-full px-5 py-4 font-bold transition-colors border-b border-stone-100 last:border-0 hover:bg-stone-50"
                      style={{
                        fontSize: '17px',
                        color: active ? 'white' : '#2a2a2a',
                        background: active ? GREEN : 'transparent',
                        textAlign: 'left',
                      }}
                    >
                      <span>{cat}</span>
                      <span className="rounded-full font-bold px-2 py-0.5 text-sm" style={{ background: active ? 'rgba(255,255,255,0.25)' : '#e5e5e5', color: active ? 'white' : '#555', fontSize: '14px' }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Mail order note */}
            <div className="mt-5 bg-amber-50 rounded-2xl border-2 p-5" style={{ borderColor: '#d4af37' }}>
              <p className="font-bold mb-2" style={{ fontSize: '16px', color: '#7a5c00' }}>📬 Order by Mail</p>
              <p style={{ fontSize: '15px', color: '#5a4000', lineHeight: '1.7' }}>
                Send a check to:<br />
                <strong>NMJL, PO Box 50003<br />Newark NJ 07101-8006</strong>
              </p>
              <p style={{ fontSize: '14px', color: '#6a5000', marginTop: '8px', lineHeight: '1.6' }}>
                Include your name, address, and exact number of items.
              </p>
            </div>
          </aside>

          {/* ── Product list ── */}
          <div className="flex-1 min-w-0" ref={listRef}>
            {/* Active category header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-stone-300">
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 700, color: DARK }}>
                {activeCat === 'All' ? 'All Products' : activeCat}
              </h2>
              <span style={{ fontSize: '16px', color: '#666', fontWeight: 600 }}>
                {filtered.length} item{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* 2026 Card spotlight */}
            {(activeCat === 'All' || activeCat === 'Rule Cards') && (
              <div className="rounded-2xl border-2 p-6 mb-5" style={{ background: '#fffbf0', borderColor: '#b8960c' }}>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold px-3 py-1 rounded-full text-white" style={{ background: '#b8960c', fontSize: '13px' }}>NEW FOR 2026</span>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 700, color: DARK }}>2026 Official Rule Cards</h3>
                </div>
                <p style={{ fontSize: '16px', color: '#666', marginBottom: '16px' }}>Ships beginning of April — order now to reserve yours.</p>
                <div className="divide-y divide-amber-200">
                  {PRODUCTS.filter(p => [1, 2, 25].includes(p.id)).map((p, idx) => (
                    <ProductRow key={p.id} product={p} onAdd={onAdd} isEven={idx % 2 === 0} />
                  ))}
                </div>
              </div>
            )}

            {/* All other products */}
            <div className="rounded-2xl border-2 border-stone-200 overflow-hidden">
              {filtered
                .filter(p => (activeCat === 'All' || activeCat === 'Rule Cards') ? ![1, 2, 25].includes(p.id) : true)
                .map((p, idx) => (
                  <ProductRow key={p.id} product={p} onAdd={onAdd} isEven={idx % 2 === 0} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
