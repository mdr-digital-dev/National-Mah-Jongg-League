import { useState } from 'react';

const ROSE = '#8B3A52';
const GOLD = '#C9A84C';
const CREAM = '#FDF6F0';
const DEEP  = '#3D1A26';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const labelStyle = {
    display: 'block',
    fontFamily: "'Lora', Georgia, serif",
    fontWeight: 600, fontSize: 14,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    color: ROSE, marginBottom: 8,
  };

  const inputStyle = {
    display: 'block', width: '100%',
    fontFamily: "'Lora', Georgia, serif",
    fontSize: 17, color: '#333',
    background: '#fff',
    border: `1px solid ${ROSE}28`,
    borderBottom: `2px solid ${ROSE}50`,
    padding: '12px 16px',
    outline: 'none',
    boxSizing: 'border-box',
    borderRadius: 0,
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ background: CREAM, paddingTop: 72 }}>
      {/* Header */}
      <div style={{ background: DEEP, padding: '52px 32px 44px', borderBottom: `4px solid ${GOLD}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: GOLD, marginBottom: 10,
            background: 'rgba(201,168,76,0.15)', padding: '4px 14px',
          }}>
            Reach Out
          </div>
          <div style={{ color: 'rgba(253,246,240,0.45)', fontSize: 12, letterSpacing: 6, margin: '6px 0 8px' }}>— ✦ —</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', margin: 0 }}>
            Contact <em style={{ fontStyle: 'italic' }}>Us</em>
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64 }}>
        {/* Contact info */}
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 28, color: ROSE, margin: '0 0 32px' }}>
            Get in <em style={{ fontStyle: 'italic' }}>Touch</em>
          </h2>

          {[
            {
              label: 'Phone',
              icon: '☎',
              content: (
                <a href="tel:+12122463052" style={{ color: ROSE, textDecoration: 'none', fontWeight: 600, fontSize: 18, fontFamily: "'Lora', serif" }}>
                  (212) 246-3052
                </a>
              ),
            },
            {
              label: 'Office Address',
              icon: '🏢',
              content: (
                <address style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: 'normal', fontSize: 17, lineHeight: 1.75, color: '#555' }}>
                  450 Seventh Avenue, Suite 405<br />
                  New York, NY 10123
                </address>
              ),
            },
            {
              label: 'Mail Orders',
              icon: '✉',
              content: (
                <address style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: 'normal', fontSize: 17, lineHeight: 1.75, color: '#555' }}>
                  National Mah Jongg League<br />
                  PO Box 50003<br />
                  Newark, NJ 07101-8006
                </address>
              ),
            },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex', gap: 20, marginBottom: 36,
              paddingBottom: 36, borderBottom: `1px solid ${ROSE}15`,
            }}>
              <div style={{
                flexShrink: 0, width: 44, height: 44,
                background: `${ROSE}10`,
                border: `1px solid ${ROSE}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>
                  {item.label}
                </div>
                {item.content}
              </div>
            </div>
          ))}

          <div style={{ padding: '24px', background: `${ROSE}06`, borderLeft: `4px solid ${GOLD}` }}>
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 16, lineHeight: 1.7, color: '#555', margin: 0 }}>
              <strong style={{ color: ROSE }}>Rules questions:</strong> Please include a self-addressed stamped envelope with any written correspondence requesting a reply.
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 28, color: ROSE, margin: '0 0 32px' }}>
            Send <em style={{ fontStyle: 'italic' }}>a Message</em>
          </h2>

          {sent ? (
            <div style={{ background: `${ROSE}08`, border: `2px solid ${ROSE}`, padding: '32px 28px' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>✓</div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 22, color: ROSE, margin: '0 0 12px' }}>
                Message Sent
              </h3>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 17, color: '#555', margin: 0, lineHeight: 1.7 }}>
                Thank you for reaching out. We'll get back to you as soon as possible.
              </p>
              <button onClick={() => setSent(false)}
                style={{ marginTop: 24, fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', color: ROSE, background: 'none', border: `2px solid ${ROSE}`, padding: '10px 24px', cursor: 'pointer', borderRadius: 40 }}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <label style={labelStyle}>Your Name</label>
                <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Jane Smith" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="jane@example.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Subject</label>
                <input type="text" required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  placeholder="Rule card question, order inquiry…" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Message</label>
                <textarea required rows={6} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Your message…"
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }} />
              </div>
              <div>
                <button type="submit" style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontWeight: 600, fontSize: 15,
                  letterSpacing: '0.07em', textTransform: 'uppercase',
                  color: '#fff', background: ROSE,
                  border: `2px solid ${ROSE}`,
                  borderRadius: 40, padding: '14px 36px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}>
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
