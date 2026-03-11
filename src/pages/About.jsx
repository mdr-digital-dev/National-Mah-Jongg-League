const ROSE  = '#8B3A52';
const GOLD  = '#C9A84C';
const CREAM = '#FDF6F0';
const DEEP  = '#3D1A26';

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
      <div style={{ background: DEEP, padding: '52px 32px 44px', borderBottom: `4px solid ${GOLD}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: GOLD, marginBottom: 10,
            background: 'rgba(201,168,76,0.15)', padding: '4px 14px',
          }}>
            Our History
          </div>
          <div style={{ color: 'rgba(253,246,240,0.45)', fontSize: 12, letterSpacing: 6, margin: '6px 0 8px' }}>— ✦ —</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', margin: 0 }}>
            About <em style={{ fontStyle: 'italic' }}>the League</em>
          </h1>
        </div>
      </div>

      {/* Intro + vintage photo */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 40px)', color: ROSE, margin: '0 0 24px', lineHeight: 1.2 }}>
            The Official Home of<br /><em style={{ fontStyle: 'italic' }}>American Mah Jongg</em>
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
            display: 'none', background: `${ROSE}12`,
            border: `2px solid ${ROSE}25`,
            padding: '60px 40px', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 12, minHeight: 280,
          }}>
            <div style={{ fontSize: 48 }}>🀄</div>
            <div style={{ fontFamily: "'Lora', serif", fontSize: 16, color: ROSE, fontStyle: 'italic' }}>
              NMJL — Est. 1937
            </div>
          </div>
          <div style={{ padding: '12px 16px', background: `${ROSE}06`, borderBottom: `2px solid ${ROSE}18` }}>
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic', fontSize: 14, color: '#777', margin: 0, lineHeight: 1.5 }}>
              National Mah Jongg League founding members, New York City, 1937
            </p>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <div style={{ background: DEEP, padding: '56px 32px', borderTop: `3px solid ${GOLD}`, borderBottom: `3px solid ${GOLD}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, textAlign: 'center' }}>
          {[
            { n: '350,000+', l: 'Active Members' },
            { n: '89',       l: 'Years of History' },
            { n: '$3M+',     l: 'Donated to Charity' },
            { n: '1937',     l: 'Year Founded' },
          ].map(s => (
            <div key={s.n} style={{ borderTop: `2px solid ${GOLD}`, paddingTop: 20 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 44, color: GOLD, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 16, color: 'rgba(253,246,240,0.8)', marginTop: 8 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-block',
            fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: GOLD, marginBottom: 6,
            background: `${ROSE}10`, padding: '4px 16px',
          }}>
            Our Story
          </div>
          <div style={{ color: `${ROSE}50`, fontSize: 12, letterSpacing: 6, margin: '6px 0' }}>— ✦ —</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(26px, 4vw, 40px)', color: ROSE, margin: 0 }}>
            <em style={{ fontStyle: 'italic' }}>A Timeline</em> of Tradition
          </h2>
        </div>

        <div style={{ position: 'relative', paddingLeft: 40 }}>
          {/* Vertical rule */}
          <div style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 2, background: `${ROSE}22` }} />

          {TIMELINE.map((item, i) => (
            <div key={item.year} style={{ position: 'relative', marginBottom: i < TIMELINE.length - 1 ? 52 : 0 }}>
              {/* Dot */}
              <div style={{
                position: 'absolute', left: -48,
                width: 18, height: 18,
                background: ROSE, border: `3px solid ${CREAM}`,
                outline: `2px solid ${ROSE}`,
                borderRadius: '50%',
                top: 6,
              }} />
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>
                {item.year}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 22, color: ROSE, margin: '0 0 12px' }}>
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
      <section style={{ background: `${ROSE}06`, borderTop: `1px solid ${ROSE}18`, padding: '64px 32px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            fontFamily: "'Lora', Georgia, serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: GOLD, marginBottom: 16,
            background: `${ROSE}10`, padding: '4px 16px',
          }}>
            Leadership
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 32, color: ROSE, margin: '0 0 24px' }}>
            The <em style={{ fontStyle: 'italic' }}>Unger Family</em>
          </h2>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 18, lineHeight: 1.8, color: '#555', margin: 0 }}>
            For decades the League has been guided by the Unger family. Ruth Unger spent her career building NMJL into the institution it is today, and her sons David and Larry Unger continue that work with the same dedication to the game, its players, and the communities they serve.
          </p>
        </div>
      </section>
    </div>
  );
}
