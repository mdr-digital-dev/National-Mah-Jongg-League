import { Link } from 'react-router-dom';

const GREEN = '#1C3A2A';
const GOLD  = '#C9A84C';
const CREAM = '#F7F2E8';

const FEATURES = [
  {
    title: 'The Annual Rule Card',
    body: 'Each year the NMJL publishes a new rule card — the definitive guide to that year\'s winning hands. The card changes annually, which keeps the game fresh and requires players to study and adapt every season.',
    icon: '🀄',
  },
  {
    title: 'Joker Tiles',
    body: 'American Mah Jongg incorporates Joker tiles as wild cards, a distinctive feature not found in other forms of the game. Jokers can substitute for any tile in an exposed set — but never in a pair.',
    icon: '🃏',
  },
  {
    title: 'The Charleston',
    body: 'Before play begins, players participate in a ritual exchange of tiles called the Charleston — passing tiles left, across, and right. This uniquely American addition adds a strategic layer of tile management.',
    icon: '↻',
  },
  {
    title: 'Quints & Sextets',
    body: 'With the use of Jokers, American Mah Jongg allows for hands containing quints (5 of a kind) and sextets (6 of a kind), creating winning combinations impossible in other forms of the game.',
    icon: '🀙',
  },
];

const BASICS = [
  { n: '4', l: 'Players' },
  { n: '144', l: 'Tiles' },
  { n: '16', l: 'Jokers' },
  { n: '~45 min', l: 'Per game' },
];

export default function Game() {
  return (
    <div style={{ background: CREAM, paddingTop: 72 }}>
      {/* Header */}
      <div style={{ background: GREEN, padding: '52px 32px 44px', borderBottom: `4px solid ${GOLD}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>
            The Game
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', margin: 0 }}>
            How to Play Mah Jongg
          </h1>
        </div>
      </div>

      {/* Overview */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'start' }}>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 38px)', color: GREEN, margin: '0 0 24px', lineHeight: 1.2 }}>
            An Ancient Game,<br />
            <em style={{ fontStyle: 'italic' }}>American Rules</em>
          </h2>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 18, lineHeight: 1.85, color: '#444', margin: '0 0 20px' }}>
            Mah Jongg is a tile-based game, similar to the card game rummy, played by four players. The game originated in China and spread to the United States in the 1920s. The American version, governed by the NMJL, developed its own unique rules, hands, and traditions.
          </p>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 18, lineHeight: 1.85, color: '#444', margin: 0 }}>
            Each player draws and discards tiles to build a winning combination called "Mah Jongg" — a complete hand as defined by the current year's official rule card. The first player to complete a valid hand wins.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          {BASICS.map(b => (
            <div key={b.n} style={{ background: '#fff', border: `1px solid ${GREEN}18`, borderTop: `4px solid ${GREEN}`, padding: '28px 24px' }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 44, color: GREEN, lineHeight: 1 }}>{b.n}</div>
              <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 16, color: '#777', marginTop: 8 }}>{b.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ background: `${GREEN}10`, borderTop: `1px solid ${GREEN}18`, borderBottom: `1px solid ${GREEN}18`, padding: '12px 0', textAlign: 'center', letterSpacing: 14, fontSize: 16, color: `${GREEN}55` }}>
        🀇 &nbsp; 🀈 &nbsp; 🀙 &nbsp; 🀠 &nbsp; 🀅
      </div>

      {/* Features */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>
            What Makes It Unique
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(26px, 4vw, 40px)', color: GREEN, margin: 0 }}>
            4 Defining Features
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} style={{
              background: i % 2 === 0 ? '#fff' : `${GREEN}06`,
              border: `1px solid ${GREEN}18`,
              borderTop: `4px solid ${i % 2 === 0 ? GREEN : GOLD}`,
              padding: '36px 28px',
            }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 21, color: GREEN, margin: '0 0 14px' }}>
                {f.title}
              </h3>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 17, lineHeight: 1.8, color: '#555', margin: 0 }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Rule card CTA */}
      <section style={{ background: GREEN, padding: '64px 32px', borderTop: `4px solid ${GOLD}`, textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 20 }}>
            Official Rules
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 32, color: '#fff', margin: '0 0 20px' }}>
            Get the 2026 Rule Card
          </h2>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 18, lineHeight: 1.8, color: 'rgba(247,242,232,0.8)', margin: '0 0 32px' }}>
            The only way to learn this year's official winning hands is with the 2026 NMJL Rule Card. Available in Standard, Large Print, and Mega sizes.
          </p>
          <Link to="/store" style={{
            display: 'inline-block',
            fontFamily: "'Lora', Georgia, serif",
            fontWeight: 600, fontSize: 15,
            letterSpacing: '0.07em', textTransform: 'uppercase',
            color: GREEN, background: GOLD,
            border: `2px solid ${GOLD}`,
            borderRadius: 40, padding: '14px 36px',
            textDecoration: 'none',
          }}>
            Order Now
          </Link>
        </div>
      </section>
    </div>
  );
}
