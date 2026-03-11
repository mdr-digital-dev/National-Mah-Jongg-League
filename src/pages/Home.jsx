import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Check } from 'lucide-react';
import { HERO_IMAGES, GREEN, GOLD, DARK } from '../data';

export default function Home() {
  const [heroImg, setHeroImg] = useState(0);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '100vh' }}>
        {HERO_IMAGES.map((src, i) => (
          <img key={src} src={src} alt="" aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === heroImg ? 1 : 0 }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,25,14,0.80) 0%, rgba(10,40,25,0.70) 55%, rgba(5,25,14,0.88) 100%)' }} />

        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 font-bold tracking-widest uppercase mb-6 px-5 py-2 rounded-full" style={{ border: '2px solid rgba(212,175,55,0.55)', background: 'rgba(212,175,55,0.12)', fontSize: '14px', color: '#d4af37' }}>
            ★ Est. 1937 — New York City
          </div>
          <h1 className="font-bold leading-tight mb-5" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.2rem, 6vw, 4.2rem)', textShadow: '0 3px 20px rgba(0,0,0,0.55)', lineHeight: 1.2 }}>
            The Official Home of<br />American Mah Jongg
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', marginBottom: '2.5rem' }}>
            Serving 350,000+ Mah Jongg players since 1937.<br />Order your official rule card, browse the store, and get answers to your questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/store" className="rounded-xl font-bold text-center no-underline hover:opacity-90 transition-opacity" style={{ height: '64px', padding: '0 2.5rem', fontSize: '20px', background: `linear-gradient(135deg, ${GOLD}, #d4af37)`, color: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Order Your 2026 Card
            </Link>
            <Link to="/about" className="rounded-xl font-bold text-white text-center no-underline hover:bg-white/20 transition-colors" style={{ height: '64px', padding: '0 2.5rem', fontSize: '20px', border: '3px solid rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              About the League
            </Link>
          </div>
        </div>

        <button onClick={() => setHeroImg(i => (i - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center" style={{ width: '56px', height: '56px' }} aria-label="Previous image"><ChevronLeft size={28} /></button>
        <button onClick={() => setHeroImg(i => (i + 1) % HERO_IMAGES.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center" style={{ width: '56px', height: '56px' }} aria-label="Next image"><ChevronRight size={28} /></button>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {HERO_IMAGES.map((_, i) => (
            <button key={i} onClick={() => setHeroImg(i)} className="rounded-full transition-all" style={{ width: i === heroImg ? '28px' : '12px', height: '12px', background: i === heroImg ? '#d4af37' : 'rgba(255,255,255,0.5)' }} aria-label={`Image ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* ── ANNOUNCEMENT ── */}
      <div style={{ background: GREEN, padding: '20px 24px' }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-white text-center">
          <p style={{ fontSize: '19px', fontWeight: 600 }}>
            🀄 &nbsp;<strong>2026 Rule Cards</strong> are available now — ships beginning of April.
          </p>
          <Link to="/store" className="font-bold no-underline hover:underline flex-shrink-0" style={{ color: '#d4af37', fontSize: '18px' }}>
            Order yours →
          </Link>
        </div>
      </div>

      {/* ── QUICK LINKS ── */}
      <section style={{ background: 'white', padding: '64px 24px' }}>
        <div className="max-w-5xl mx-auto">
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: DARK, marginBottom: '12px', textAlign: 'center' }}>
            What Can We Help You With?
          </h2>
          <p style={{ fontSize: '18px', color: '#555', textAlign: 'center', marginBottom: '40px' }}>Choose a section below to get started.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { to: '/store',   emoji: '🛒', title: 'Shop the Store',       desc: 'Order rule cards, tiles, accessories, and more.' },
              { to: '/about',   emoji: '🀄', title: 'About the League',     desc: 'Learn about our 89-year history and mission.' },
              { to: '/game',    emoji: '🎯', title: 'How to Play',          desc: 'New to the game? Learn the basics here.' },
              { to: '/charity', emoji: '❤️', title: 'Charitable Work',      desc: 'See how the League gives back every year.' },
              { to: '/faq',     emoji: '❓', title: 'Common Questions',     desc: 'Rules, orders, shipping — answered simply.' },
              { to: '/contact', emoji: '📞', title: 'Contact Us',           desc: 'Call us or send a message. We\'re here to help.' },
            ].map(card => (
              <Link key={card.to} to={card.to} className="block rounded-2xl p-7 border-2 border-stone-200 bg-stone-50 no-underline transition-all hover:border-green-700 hover:bg-green-50 group" style={{ textDecoration: 'none' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>{card.emoji}</div>
                <h3 className="font-bold mb-2" style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: DARK }}>{card.title}</h3>
                <p style={{ fontSize: '17px', color: '#555', lineHeight: '1.6', marginBottom: '16px' }}>{card.desc}</p>
                <span className="inline-flex items-center gap-1 font-bold" style={{ color: GREEN, fontSize: '16px' }}>
                  Go there <ArrowRight size={16} strokeWidth={2.5} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY NMJL ── */}
      <section style={{ background: '#f0ede4', padding: '64px 24px' }}>
        <div className="max-w-5xl mx-auto">
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: DARK, marginBottom: '40px', textAlign: 'center' }}>
            The Official Source for American Mah Jongg
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Founded in 1937 in New York City — over 89 years of service',
              '350,000+ members across North America',
              'Publishes the official rule card every year',
              'Only authorized source for genuine NMJL cards',
              'Answers rules questions and settles disputes',
              'Donates generously to charities nationwide',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-2xl p-5 border-2 border-stone-200">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: GREEN }}>
                  <Check size={16} color="white" strokeWidth={3} />
                </div>
                <p style={{ fontSize: '18px', lineHeight: '1.65', color: '#2a2a2a', fontWeight: 500 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
