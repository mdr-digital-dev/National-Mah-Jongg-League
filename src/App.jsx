import { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Check } from 'lucide-react';
import Layout from './components/Layout';
import Home    from './pages/Home';
import About   from './pages/About';
import Game    from './pages/Game';
import Store   from './pages/Store';
import Charity from './pages/Charity';
import Faq     from './pages/Faq';
import Contact from './pages/Contact';

function Toast({ toasts }) {
  return (
    <div className="fixed bottom-8 left-1/2 z-50 space-y-3 pointer-events-none" style={{ transform: 'translateX(-50%)' }}>
      {toasts.map(t => (
        <div key={t.id} className="bg-stone-900 text-white px-7 py-4 rounded-2xl shadow-2xl flex items-center gap-3 whitespace-nowrap" style={{ fontSize: '18px' }} role="status">
          <Check size={22} className="text-emerald-400 flex-shrink-0" />
          Added to cart!
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
      <Layout cart={cart} onUpdateQty={updateQty} onRemove={removeFromCart}>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/about"   element={<About />} />
          <Route path="/game"    element={<Game />} />
          <Route path="/store"   element={<Store onAdd={addToCart} />} />
          <Route path="/charity" element={<Charity />} />
          <Route path="/faq"     element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
      <Toast toasts={toasts} />
    </BrowserRouter>
  );
}
