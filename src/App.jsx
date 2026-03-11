import { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home    from './pages/Home';
import About   from './pages/About';
import Game    from './pages/Game';
import Store   from './pages/Store';
import Charity from './pages/Charity';
import Faq     from './pages/Faq';
import Contact from './pages/Contact';

const GOLD = '#C9A84C';
const GREEN = '#1C3A2A';

function Toast({ toasts }) {
  return (
    <div style={{
      position: 'fixed', bottom: 32, left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 200,
      display: 'flex', flexDirection: 'column', gap: 10,
      pointerEvents: 'none',
    }}>
      {toasts.map(t => (
        <div key={t.id} role="status" style={{
          background: GREEN, color: '#fff',
          fontFamily: "'Lora', Georgia, serif",
          fontWeight: 600, fontSize: 17,
          padding: '14px 28px',
          border: `2px solid ${GOLD}`,
          display: 'flex', alignItems: 'center', gap: 10,
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        }}>
          <span style={{ color: GOLD }}>✓</span>
          Added to cart
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  function addToCart(product, qty) {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
    const id = ++toastId.current;
    setToasts(t => [...t, { id }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2500);
  }

  function updateQty(id, qty) {
    if (qty <= 0) setCart(prev => prev.filter(i => i.id !== id));
    else setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  return (
    <BrowserRouter>
      <Layout cart={cart} updateQty={updateQty} removeFromCart={removeFromCart}>
        <Routes>
          <Route path="/"        element={<Home addToCart={addToCart} />} />
          <Route path="/about"   element={<About />} />
          <Route path="/game"    element={<Game />} />
          <Route path="/store"   element={<Store addToCart={addToCart} />} />
          <Route path="/charity" element={<Charity />} />
          <Route path="/faq"     element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
      <Toast toasts={toasts} />
    </BrowserRouter>
  );
}
