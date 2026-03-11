import { useState } from 'react';
import { FAQS } from '../data';

const GREEN = '#1C3A2A';
const GOLD  = '#C9A84C';
const CREAM = '#F7F2E8';

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div style={{
      borderBottom: `1px solid ${GREEN}20`,
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', textAlign: 'left',
          background: 'none', border: 'none',
          padding: '24px 0',
          cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24,
        }}
      >
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700, fontSize: 20,
          color: GREEN, lineHeight: 1.35,
        }}>
          {q}
        </span>
        <span style={{
          flexShrink: 0, width: 28, height: 28,
          border: `2px solid ${isOpen ? GOLD : GREEN}`,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'monospace', fontSize: 18,
          color: isOpen ? GOLD : GREEN,
          marginTop: 2,
          transition: 'border-color 0.2s, color 0.2s',
        }}>
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div style={{ paddingBottom: 28 }}>
          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: 18, lineHeight: 1.8,
            color: '#555', margin: 0,
            borderLeft: `4px solid ${GOLD}`,
            paddingLeft: 20,
          }}>
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ background: CREAM, paddingTop: 72 }}>
      {/* Header */}
      <div style={{ background: GREEN, padding: '52px 32px 44px', borderBottom: `4px solid ${GOLD}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>
            Common Questions
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', margin: 0 }}>
            Frequently Asked Questions
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '72px 32px' }}>
        {/* Decorative */}
        <div style={{ textAlign: 'center', fontSize: 18, letterSpacing: 10, marginBottom: 52, color: `${GREEN}50` }}>
          🀇 &nbsp; 🀙 &nbsp; 🀠
        </div>

        {FAQS.map((faq, i) => (
          <FaqItem
            key={i}
            q={faq.q}
            a={faq.a}
            isOpen={open === i}
            onToggle={() => setOpen(open === i ? -1 : i)}
          />
        ))}

        {/* More help */}
        <div style={{
          marginTop: 64,
          background: `${GREEN}08`,
          border: `1px solid ${GREEN}20`,
          borderLeft: `5px solid ${GOLD}`,
          padding: '28px 28px',
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 22, color: GREEN, margin: '0 0 12px' }}>
            Still have a question?
          </h3>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 17, lineHeight: 1.7, color: '#555', margin: '0 0 20px' }}>
            Call us at <a href="tel:+12122463052" style={{ color: GREEN, fontWeight: 600 }}>(212) 246-3052</a>, or write to us at 450 7th Avenue, Suite 405, New York, NY 10123. Include a self-addressed stamped envelope if requesting a written reply.
          </p>
        </div>
      </div>
    </div>
  );
}
