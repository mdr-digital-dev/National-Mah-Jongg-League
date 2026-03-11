import { Link } from 'react-router-dom';
import { CHARITIES } from '../data';

const GREEN = '#1C3A2A';
const GOLD  = '#C9A84C';
const CREAM = '#F7F2E8';

// Split charities into 3 columns
const col = Math.ceil(CHARITIES.length / 3);
const COLS = [CHARITIES.slice(0, col), CHARITIES.slice(col, col * 2), CHARITIES.slice(col * 2)];

export default function Charity() {
  return (
    <div style={{ background: CREAM, paddingTop: 72 }}>
      {/* Hero — full bleed */}
      <div style={{
        position: 'relative',
        height: 480,
        backgroundImage: 'url(https://www.nationalmahjonggleague.org/images/charities_01.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,28,20,0.65)' }} />
        <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px' }}>
          <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 18 }}>
            Giving Back
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(36px, 6vw, 72px)', color: '#fff', margin: '0 0 20px', lineHeight: 1.1 }}>
            Charitable Giving
          </h1>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 20, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.6 }}>
            Every card sold supports organizations that change lives.
          </p>
        </div>
      </div>

      {/* Intro */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '72px 32px 56px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 20, lineHeight: 1.85, color: '#444', margin: 0 }}>
          Since its founding, the National Mah Jongg League has channeled a portion of every sale toward charitable causes. The game of Mah Jongg builds community — and the League believes that community has an obligation to give back. Through the generosity of its members and players, the League has donated to 28 organizations spanning medical research, disaster relief, children's hospitals, and more.
        </p>
      </section>

      {/* $3M callout */}
      <div style={{ background: GREEN, padding: '64px 32px', borderTop: `4px solid ${GOLD}`, borderBottom: `4px solid ${GOLD}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 20 }}>
            Landmark Milestone
          </div>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(64px, 10vw, 120px)', color: GOLD, lineHeight: 1, marginBottom: 20 }}>
            $3,000,000
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 28, color: '#fff', margin: '0 0 20px' }}>
            Donated to Valley Hospital
          </h2>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 18, lineHeight: 1.8, color: 'rgba(247,242,232,0.8)', margin: 0, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            The League reached a historic milestone with a $3 million cumulative donation to Valley Hospital in Ridgewood, New Jersey — a testament to the generosity of Mah Jongg players everywhere.
          </p>
        </div>
      </div>

      {/* Charity list */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>
            Our Partners
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(26px, 4vw, 40px)', color: GREEN, margin: 0 }}>
            28 Organizations We Support
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0 40px' }}>
          {COLS.map((col, ci) => (
            <ul key={ci} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {col.map(name => (
                <li key={name} style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: 17, lineHeight: 1.5,
                  color: '#444',
                  padding: '12px 0',
                  borderBottom: `1px solid ${GREEN}15`,
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <span style={{ color: GOLD, fontSize: 14, flexShrink: 0 }}>♦</span>
                  {name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: `${GREEN}08`, borderTop: `3px solid ${GREEN}20`, padding: '64px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontSize: 20, letterSpacing: 8, marginBottom: 28, color: `${GREEN}60` }}>🀇 🀙 🀠</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 32, color: GREEN, margin: '0 0 20px' }}>
            Play the Game. Support the Cause.
          </h2>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 18, lineHeight: 1.8, color: '#555', margin: '0 0 32px' }}>
            Every 2026 rule card you purchase directly supports the League's charitable mission. Order yours today.
          </p>
          <Link to="/store" style={{
            display: 'inline-block',
            fontFamily: "'Lora', Georgia, serif",
            fontWeight: 600, fontSize: 16,
            letterSpacing: '0.07em', textTransform: 'uppercase',
            color: '#fff', background: GREEN,
            border: `2px solid ${GREEN}`,
            borderRadius: 40, padding: '14px 36px',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}>
            Shop the Store
          </Link>
        </div>
      </section>
    </div>
  );
}
