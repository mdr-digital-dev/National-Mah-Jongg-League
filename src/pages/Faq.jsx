import { useState } from 'react';
import { FAQS, GREEN, DARK } from '../data';

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-2 border-stone-300 rounded-2xl overflow-hidden bg-white">
      <button onClick={() => setOpen(o => !o)} className="w-full text-left flex items-center justify-between px-6 py-5 hover:bg-stone-50 transition-colors" aria-expanded={open} style={{ minHeight: '72px' }}>
        <span style={{ fontSize: '19px', fontWeight: 700, lineHeight: '1.4', color: DARK, paddingRight: '16px' }}>{faq.q}</span>
        <span className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl" style={{ background: open ? GREEN : 'rgba(26,92,58,0.1)', color: open ? 'white' : GREEN, minWidth: '40px' }} aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-6 pb-6 pt-4 border-t-2 border-stone-200">
          <p style={{ fontSize: '18px', lineHeight: '1.85', color: '#2a2a2a' }}>{faq.a}</p>
        </div>
      )}
    </div>
  );
}

export default function Faq() {
  return (
    <div style={{ minHeight: '100vh', background: '#f0ede4' }}>
      <div style={{ background: GREEN, padding: '40px 24px', paddingTop: '112px' }}>
        <div className="max-w-3xl mx-auto">
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Frequently Asked Questions</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)' }}>Common questions about orders, rules, and the game — answered clearly.</p>
        </div>
      </div>
      <div style={{ padding: '56px 24px' }}>
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} />)}
        </div>
      </div>
    </div>
  );
}
