import { X, Minus, Plus, Trash2, Check } from 'lucide-react';
import { GREEN } from '../data';

export default function CartDrawer({ cart, open, onClose, onUpdateQty, onRemove }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />}
      <div
        className="fixed top-0 right-0 h-full bg-white z-50 flex flex-col transition-transform duration-300 w-full sm:w-[440px]"
        style={{ transform: open ? 'translateX(0)' : 'translateX(100%)', boxShadow: '-4px 0 32px rgba(0,0,0,0.15)' }}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-stone-200">
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>Your Cart</h2>
          <button onClick={onClose} className="flex items-center gap-2 px-5 rounded-xl border-2 border-stone-300 hover:bg-stone-100 font-bold text-stone-800 transition-colors" style={{ height: '52px', fontSize: '17px' }}>
            <X size={20} /> Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center mt-20">
              <div style={{ fontSize: '52px', marginBottom: '16px' }}>🛒</div>
              <p style={{ fontSize: '20px', color: '#666' }}>Your cart is empty.</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="rounded-2xl p-5 border-2 border-stone-200 bg-stone-50">
              <p className="font-bold mb-1" style={{ fontSize: '18px', color: '#1a1a1a', lineHeight: '1.4' }}>{item.name}</p>
              <p className="font-bold mb-4" style={{ fontSize: '22px', color: GREEN }}>${(item.price * item.qty).toFixed(2)}</p>
              <div className="flex items-center gap-3">
                <button onClick={() => onUpdateQty(item.id, item.qty - 1)} className="flex items-center justify-center rounded-xl border-2 border-stone-300 font-bold hover:bg-stone-200 transition-colors" style={{ width: '48px', height: '48px' }} aria-label="Decrease quantity"><Minus size={16} strokeWidth={2.5} /></button>
                <span className="font-bold text-center" style={{ width: '32px', fontSize: '20px' }}>{item.qty}</span>
                <button onClick={() => onUpdateQty(item.id, item.qty + 1)} className="flex items-center justify-center rounded-xl border-2 border-stone-300 font-bold hover:bg-stone-200 transition-colors" style={{ width: '48px', height: '48px' }} aria-label="Increase quantity"><Plus size={16} strokeWidth={2.5} /></button>
                <button onClick={() => onRemove(item.id)} className="ml-auto flex items-center gap-1.5 font-semibold text-red-600 hover:text-red-800 transition-colors" style={{ fontSize: '16px' }}><Trash2 size={17} /> Remove</button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="px-6 py-6 border-t-2 border-stone-200 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-bold" style={{ fontSize: '20px', color: '#1a1a1a' }}>Total</span>
              <span className="font-bold" style={{ fontSize: '30px', color: GREEN }}>${total.toFixed(2)}</span>
            </div>
            <button className="w-full rounded-xl text-white font-bold hover:opacity-90 transition-opacity" style={{ height: '60px', fontSize: '20px', background: `linear-gradient(135deg, ${GREEN}, #2d7a52)` }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
