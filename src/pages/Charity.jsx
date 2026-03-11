import { CHARITIES, GREEN, DARK } from '../data';

const NMJL_BASE = 'https://www.nationalmahjonggleague.org/images';

export default function Charity() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f2ea' }}>

      {/* ── Hero with real image ── */}
      <div style={{ position: 'relative', minHeight: '360px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', paddingTop: '72px' }}>
        <img
          src={`${NMJL_BASE}/charities_01.jpg`}
          alt="Mah Jongg tiles"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          onError={e => { e.target.style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,20,12,0.92) 0%, rgba(5,20,12,0.50) 60%, rgba(5,20,12,0.30) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '48px 24px', maxWidth: '1140px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 14px', borderRadius: '999px', border: '2px solid rgba(212,175,55,0.5)', color: '#d4af37', background: 'rgba(212,175,55,0.12)', marginBottom: '14px' }}>
            Our Mission
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, color: 'white', margin: 0, lineHeight: 1.2, textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
            Giving Back to the Community
          </h1>
        </div>
      </div>

      {/* ── Intro + $3M highlight ── */}
      <div style={{ background: 'white', padding: '64px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center' }}>

            <div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, color: DARK, marginBottom: '20px', lineHeight: 1.3 }}>
                Helping Others Through<br />the Love of Mah Jongg
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.9', color: '#2a2a2a', marginBottom: '16px' }}>
                <strong>Each year</strong>, proceeds from sales of the League's Official Rule Cards go directly to charitable organizations across the country.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.9', color: '#2a2a2a', margin: 0 }}>
                Since our founding in 1937, the National Mah Jongg League has made charitable giving a core part of who we are. Every card sold helps fund the causes below.
              </p>
            </div>

            {/* $3M callout */}
            <div style={{ background: '#fffbf0', border: '3px solid #c9a227', borderRadius: '20px', padding: '36px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7a5c00', marginBottom: '8px' }}>Landmark Donation</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '52px', fontWeight: 700, color: '#b8960c', lineHeight: 1, marginBottom: '12px' }}>$3,000,000</div>
              <p style={{ fontSize: '17px', color: '#5a4000', lineHeight: '1.75', margin: 0 }}>
                Donated to <strong>Valley Hospital</strong> in Paramus, NJ — funding a dedicated post-partum care floor for new mothers and families.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Charity list ── */}
      <div style={{ background: '#f5f2ea', padding: '64px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, color: DARK, marginBottom: '8px' }}>
              Organizations We Support
            </h2>
            <p style={{ fontSize: '17px', color: '#666', margin: 0 }}>
              A partial list of groups, both past and present, that the League has supported.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
            {CHARITIES.map(name => (
              <div
                key={name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'white',
                  border: '2px solid #e5e2db',
                  borderRadius: '12px',
                  padding: '14px 18px',
                }}
              >
                <span style={{ color: '#8b1a2e', fontSize: '18px', flexShrink: 0, lineHeight: 1 }}>♥</span>
                <span style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', lineHeight: '1.35' }}>{name}</span>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: '15px', color: '#888', marginTop: '28px' }}>
            {CHARITIES.length} organizations supported
          </p>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{ background: GREEN, padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
            Every rule card purchase supports these causes.
          </p>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.82)', marginBottom: '24px' }}>
            Order your 2026 card and help us give back.
          </p>
          <a
            href="/store?cat=Rule%20Cards"
            style={{ display: 'inline-flex', alignItems: 'center', height: '56px', padding: '0 32px', borderRadius: '12px', background: 'linear-gradient(135deg, #b8960c, #d4af37)', color: '#1a1a1a', fontWeight: 700, fontSize: '18px', textDecoration: 'none' }}
          >
            Order Your 2026 Card
          </a>
        </div>
      </div>
    </div>
  );
}
