import { Phone, MapPin, Mail } from 'lucide-react';
import { GREEN, DARK } from '../data';

export default function Contact() {
  return (
    <div style={{ minHeight: '100vh', background: '#faf6ee' }}>
      <div style={{ background: GREEN, padding: '40px 24px', paddingTop: '112px' }}>
        <div className="max-w-5xl mx-auto">
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Contact Us</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)' }}>We're happy to answer your questions about rules, orders, and the game.</p>
        </div>
      </div>

      <div style={{ background: 'white', padding: '64px 24px' }}>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-5">
            <div className="rounded-2xl border-2 border-stone-200 p-7 bg-stone-50 space-y-7">
              {[
                {
                  icon: <Phone size={22} strokeWidth={2} />,
                  title: 'Phone',
                  content: <a href="tel:+12122463052" style={{ display: 'block', fontSize: '26px', fontWeight: 700, color: GREEN, marginTop: '4px', textDecoration: 'none' }}>(212) 246-3052</a>,
                },
                {
                  icon: <MapPin size={22} strokeWidth={2} />,
                  title: 'Office Address',
                  content: <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#2a2a2a', marginTop: '4px' }}>The National Mah Jongg League, Inc.<br />450 7th Avenue, Suite 405<br />New York, NY 10123</p>,
                },
                {
                  icon: <Mail size={22} strokeWidth={2} />,
                  title: 'Mail Orders',
                  content: <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#2a2a2a', marginTop: '4px' }}>NMJL, PO Box 50003<br />Newark NJ 07101-8006</p>,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(26,92,58,0.1)', color: GREEN }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: '17px', fontWeight: 700, color: '#1a1a1a' }}>{item.title}</div>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border-2 p-6 bg-amber-50" style={{ borderColor: '#d4af37' }}>
              <p style={{ fontSize: '17px', fontWeight: 700, color: '#7a5c00', marginBottom: '8px' }}>📬 Ordering by Mail?</p>
              <p style={{ fontSize: '17px', color: '#5a4000', lineHeight: '1.75' }}>
                Send a check to our Newark address above. Include your <strong>full name</strong>, <strong>mailing address</strong>, and the <strong>exact number of items</strong> you'd like.
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="rounded-2xl border-2 border-stone-200 p-7 bg-stone-50 space-y-5" onSubmit={e => { e.preventDefault(); alert("Thank you! Your message has been sent."); }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 700, color: DARK }}>Send Us a Message</h2>
            {[
              { label: 'Your Name',  type: 'text',  placeholder: 'First and last name'  },
              { label: 'Your Email', type: 'email', placeholder: 'your@email.com'        },
              { label: 'Subject',    type: 'text',  placeholder: 'e.g. Rules question'   },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', fontSize: '18px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>{f.label}</label>
                <input type={f.type} required placeholder={f.placeholder} className="w-full px-4 rounded-xl border-2 border-stone-300 outline-none bg-white transition-colors focus:border-green-700" style={{ height: '56px', fontSize: '18px', color: '#1a1a1a' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontSize: '18px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>Your Message</label>
              <textarea required rows={5} placeholder="How can we help you?" className="w-full px-4 py-4 rounded-xl border-2 border-stone-300 outline-none bg-white resize-none transition-colors focus:border-green-700" style={{ fontSize: '18px', lineHeight: '1.65', color: '#1a1a1a' }} />
            </div>
            <button type="submit" className="w-full rounded-xl text-white font-bold hover:opacity-90 transition-opacity" style={{ height: '60px', fontSize: '20px', background: `linear-gradient(135deg, ${GREEN}, #2d7a52)` }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
