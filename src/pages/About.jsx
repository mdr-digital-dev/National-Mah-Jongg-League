const GREEN = '#1C3A2A';
const GOLD  = '#C9A84C';
const CREAM = '#F7F2E8';

const TIMELINE = [
  {
    year: '1937',
    title: 'The League is Founded',
    body: 'A small group of 32 women in New York City come together to create a standard American version of Mah Jongg. They establish the National Mah Jongg League to serve as the official governing body of the game.',
  },
  {
    year: '1965',
    title: 'Ruth Unger Takes the Helm',
    body: 'Ruth Unger becomes the driving force behind the League, shepherding it through decades of growth. Under her leadership the annual rule card becomes an institution — eagerly awaited each year by hundreds of thousands of players.',
  },
  {
    year: '2015',
    title: 'A New Generation',
    body: 'David and Larry Unger carry forward their mother\'s legacy, modernizing the League while fiercely protecting its traditions. The membership continues to grow, reaching over 350,000 active members across North America.',
  },
  {
    year: 'Today',
    title: '350,000+ Members Strong',
    body: 'The League issues the official annual rule card, operates the NMJL store, and donates proceeds to 28 charitable organizations. It remains the sole authority on official American Mah Jongg rules.',
  },
];

export default function About() {
  return (
    <div style={{ background: CREAM, paddingTop: 72 }}>
      {/* Page header */}
      <div style={{ background: GREEN, padding: '52px 32px 44px', borderBottom: `4px solid ${GOLD}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>
            Our History
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', margin: 0 }}>
            About the League
          </h1>
        </div>
      </div>

      {/* Intro + vintage photo */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 40px)', color: GREEN, margin: '0 0 24px', lineHeight: 1.2 }}>
            The Official Home of<br />American Mah Jongg
          </h2>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 18, lineHeight: 1.8, color: '#444', margin: '0 0 20px' }}>
            The National Mah Jongg League was founded in 1937 by 32 women in New York City who wanted to create a standardized American version of the ancient Chinese tile game. What began as a small civic organization has grown into the premier governing body for American Mah Jongg.
          </p>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 18, lineHeight: 1.8, color: '#444', margin: 0 }}>
            Each year, the League publishes the official rule card — the definitive guide to that year's winning hands. With over 350,000 active members, the NMJL card is among the most eagerly anticipated publications in the world of tabletop games.
          </p>
        </div>
        <div>
          <img
            src="https://www.nationalmahjonggleague.org/images/league_01.jpg"
            alt="NMJL founding members, circa 1937"
            style={{ width: '100%', display: 'block', filter: 'sepia(15%) contrast(1.05)' }}
            onError={e => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div style={{
            display: 'none', background: `${GREEN}15`,
            border: `2px solid ${GREEN}30`,
            padding: '60px 40px', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 12, minHeight: 280,
          }}>
            <div style={{ fontSize: 48 }}>🀄</div>
            <div style={{ fontFamily: "'Lora', serif", fontSize: 16, color: GREEN, fontStyle: 'italic' }}>
              NMJL — Est. 1937
            </div>
          </div>
          <div style={{ padding: '12px 16px', background: `${GREEN}08`, borderBottom: `2px solid ${GREEN}20` }}>
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic', fontSize: 14, color: '#777', margin: 0, lineHeight: 1.5 }}>
              National Mah Jongg League founding members, New York City, 1937
            </p>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <div style={{ background: GREEN, padding: '56px 32px', borderTop: `3px solid ${GOLD}`, borderBottom: `3px solid ${GOLD}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, textAlign: 'center' }}>
          {[
            { n: '350,000+', l: 'Active Members' },
            { n: '89',       l: 'Years of History' },
            { n: '$3M+',     l: 'Donated to Charity' },
            { n: '1937',     l: 'Year Founded' },
          ].map(s => (
            <div key={s.n} style={{ borderTop: `2px solid ${GOLD}`, paddingTop: 20 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 44, color: GOLD, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 16, color: 'rgba(247,242,232,0.8)', marginTop: 8 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>
            Our Story
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(26px, 4vw, 40px)', color: GREEN, margin: 0 }}>
            A Timeline of Tradition
          </h2>
        </div>

        <div style={{ position: 'relative', paddingLeft: 40 }}>
          {/* Vertical rule */}
          <div style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 2, background: `${GREEN}25` }} />

          {TIMELINE.map((item, i) => (
            <div key={item.year} style={{ position: 'relative', marginBottom: i < TIMELINE.length - 1 ? 52 : 0 }}>
              {/* Dot */}
              <div style={{
                position: 'absolute', left: -48,
                width: 18, height: 18,
                background: GOLD, border: `3px solid ${CREAM}`,
                outline: `2px solid ${GOLD}`,
                borderRadius: '50%',
                top: 6,
              }} />
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>
                {item.year}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 22, color: GREEN, margin: '0 0 12px' }}>
                {item.title}
              </h3>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 17, lineHeight: 1.8, color: '#555', margin: 0 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section style={{ background: `${GREEN}08`, borderTop: `1px solid ${GREEN}20`, padding: '64px 32px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 16 }}>
            Leadership
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 32, color: GREEN, margin: '0 0 24px' }}>
            The Unger Family
          </h2>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 18, lineHeight: 1.8, color: '#555', margin: 0 }}>
            For decades the League has been guided by the Unger family. Ruth Unger spent her career building NMJL into the institution it is today, and her sons David and Larry Unger continue that work with the same dedication to the game, its players, and the communities they serve.
          </p>
        </div>
      </section>
    </div>
  );
}
