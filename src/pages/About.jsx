import { Check } from 'lucide-react';
import { GREEN, DARK } from '../data';

function PageHeader({ label, title, subtitle }) {
  return (
    <div style={{ background: GREEN, padding: '40px 24px', paddingTop: '112px' }}>
      <div className="max-w-5xl mx-auto">
        <div className="inline-block font-bold tracking-widest uppercase px-4 py-1 rounded-full mb-3" style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)', fontSize: '12px' }}>{label}</div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'white', marginBottom: subtitle ? '8px' : 0 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)' }}>{subtitle}</p>}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div style={{ minHeight: '100vh', background: '#faf6ee' }}>
      <PageHeader label="Our Heritage" title="About the National Mah Jongg League" subtitle="Serving American Mah Jongg players since 1937." />

      <div style={{ background: 'white', padding: '64px 24px' }}>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p style={{ fontSize: '19px', lineHeight: '1.9', color: '#2a2a2a', marginBottom: '1.5rem' }}>
              For over <strong>89 years</strong>, the National Mah Jongg League has been the official authority on American Mah Jongg — standardizing the rules, supporting players, and giving back to the community.
            </p>
            <p style={{ fontSize: '19px', lineHeight: '1.9', color: '#2a2a2a', marginBottom: '2rem' }}>
              Founded in <strong>1937</strong> in New York City with just 32 members, we have grown to more than <strong>350,000 members</strong> across North America.
            </p>
            <div className="space-y-3">
              {[
                'Publishes the official American rule card every year',
                'Sells equipment and merchandise for the game',
                'Answers rules questions and settles disputes',
                'Donates generously to charities across the country',
                'The only official source for authentic NMJL cards',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ background: GREEN }}>
                    <Check size={14} color="white" strokeWidth={3} />
                  </div>
                  <p style={{ fontSize: '18px', lineHeight: '1.65', color: '#2a2a2a' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden border-2 border-stone-200">
              <img src="https://www.nationalmahjonggleague.org/images/league_01.jpg" alt="The National Mah Jongg League" className="w-full object-cover" style={{ height: '260px' }} loading="lazy" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800&q=80'; }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '350,000+', label: 'Members'        },
                { value: '89 Years', label: 'Of Service'     },
                { value: '$3M+',     label: 'To Charity'     },
                { value: '1937',     label: 'Year Founded'   },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl p-5 text-center border-2 border-stone-200 bg-stone-50">
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 700, color: GREEN }}>{s.value}</div>
                  <div style={{ fontSize: '16px', color: '#555', marginTop: '4px', fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ background: '#f0ede4', padding: '64px 24px' }}>
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: DARK, marginBottom: '36px' }}>Our History</h2>
          <div className="space-y-6">
            {[
              { year: '1937',  text: 'Founded in New York City with 32 charter members to standardize American Mah Jongg rules.' },
              { year: '1965',  text: 'Ruth Unger becomes president, shaping the League\'s modern era and growing membership.' },
              { year: '2015',  text: 'David & Larry Unger take leadership of the League, continuing the family tradition.' },
              { year: 'Today', text: 'Over 350,000 members across North America, publishing the official rule card each year.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 bg-white rounded-2xl p-6 border-2 border-stone-200">
                <div className="flex-shrink-0 font-bold text-center pt-0.5" style={{ width: '52px', color: '#b8960c', fontSize: '15px', fontFamily: 'Georgia, serif' }}>{item.year}</div>
                <div className="flex gap-4 items-start flex-1">
                  <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ background: GREEN }} />
                  <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#2a2a2a' }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
