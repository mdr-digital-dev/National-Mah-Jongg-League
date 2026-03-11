import { CHARITIES, GREEN, DARK } from '../data';

export default function Charity() {
  return (
    <div style={{ minHeight: '100vh', background: '#faf6ee' }}>
      <div style={{ background: GREEN, padding: '40px 24px', paddingTop: '112px' }}>
        <div className="max-w-5xl mx-auto">
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Our Charitable Mission</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)' }}>Each year, proceeds from rule card sales go directly to charitable organizations.</p>
        </div>
      </div>

      <div style={{ background: 'white', padding: '64px 24px' }}>
        <div className="max-w-4xl mx-auto">
          <p style={{ fontSize: '19px', lineHeight: '1.9', color: '#2a2a2a', marginBottom: '2rem', maxWidth: '680px' }}>
            Since its founding, the National Mah Jongg League has made charitable giving a core part of its mission. A portion of every rule card sold goes to support important causes across the country.
          </p>

          <div className="rounded-2xl border-2 p-8 text-center mb-10" style={{ borderColor: '#d4af37', background: '#fffbf0', maxWidth: '480px' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '52px', fontWeight: 700, color: '#b8960c' }}>$3,000,000</div>
            <p style={{ fontSize: '18px', lineHeight: '1.75', color: '#5a4000', marginTop: '8px' }}>
              Donated to Valley Hospital in Paramus, NJ for a post-partum care floor — one of our largest single charitable contributions.
            </p>
          </div>
        </div>
      </div>

      <div style={{ background: '#f0ede4', padding: '64px 24px' }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: DARK, marginBottom: '32px' }}>Organizations We Support</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CHARITIES.map(name => (
              <div key={name} className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white border-2 border-stone-200">
                <span style={{ color: '#8b1a2e', fontSize: '18px', flexShrink: 0 }}>♥</span>
                <span style={{ fontSize: '17px', color: '#2a2a2a', lineHeight: '1.4', fontWeight: 500 }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
