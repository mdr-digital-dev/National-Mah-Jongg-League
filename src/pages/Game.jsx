import { GREEN, DARK } from '../data';

export default function Game() {
  return (
    <div style={{ minHeight: '100vh', background: '#faf6ee' }}>
      <div style={{ background: GREEN, padding: '40px 24px', paddingTop: '112px' }}>
        <div className="max-w-5xl mx-auto">
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'white', marginBottom: '8px' }}>The Game of Mah Jongg</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)' }}>Learn about American Mah Jongg — how it's played and what makes it special.</p>
        </div>
      </div>

      <div style={{ background: 'white', padding: '64px 24px' }}>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden border-2 border-stone-200">
            <img src="https://www.nationalmahjonggleague.org/images/game_01.jpg" alt="Close-up of Mah Jongg tiles" className="w-full object-cover" style={{ height: '300px' }} loading="lazy" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800&q=80'; }} />
          </div>
          <div>
            <p style={{ fontSize: '19px', lineHeight: '1.9', color: '#2a2a2a', marginBottom: '1.25rem' }}>
              Mah Jongg is a tile-based game similar to rummy, originally from China and popularized in America in the early 1900s. The American version has its own unique rules and a long tradition.
            </p>
            <p style={{ fontSize: '19px', lineHeight: '1.9', color: '#2a2a2a', marginBottom: '1.25rem' }}>
              The game is played with four players, using a set of 152 tiles. Players draw and discard tiles to build a winning hand based on the current year's official rule card.
            </p>
            <p style={{ fontSize: '19px', lineHeight: '1.9', color: '#2a2a2a' }}>
              The NMJL has been setting the official rules and supporting players since 1937.
            </p>
          </div>
        </div>
      </div>

      <div style={{ background: '#f0ede4', padding: '64px 24px' }}>
        <div className="max-w-5xl mx-auto">
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: DARK, marginBottom: '32px' }}>What Makes American Mah Jongg Unique</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: '🀄', title: 'Annual Rule Card',  desc: 'Every year, the NMJL publishes a new card of Standard Hands. The winning combinations change each year — keeping the game fresh.' },
              { icon: '🃏', title: 'Joker Tiles',       desc: 'American Mah Jongg uses special Joker tiles that act as wild tiles. They add a layer of strategy not found in other versions.' },
              { icon: '🔄', title: 'The Charleston',    desc: 'Before play begins, players participate in a structured tile exchange called "The Charleston" — a beloved American tradition.' },
              { icon: '🏆', title: 'Quints & Sextets', desc: 'American Mah Jongg allows special combinations of 5 or 6 matching tiles — giving skilled players extra opportunities to win.' },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border-2 border-stone-200">
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>{card.icon}</div>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 700, color: DARK, marginBottom: '8px' }}>{card.title}</h3>
                <p style={{ fontSize: '17px', color: '#444', lineHeight: '1.7' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
