import { useEffect, useMemo, useState } from "react";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import { ShoppingCart } from "lucide-react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

function App() {
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSeed = async () => {
    setLoading(true);
    setMessage("");
    try {
      await fetch(`${API_BASE}/seed`, { method: "POST" });
      await fetchProducts();
      setMessage("Demo products loaded");
    } catch (e) {
      setMessage("Failed to load demo products");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.title === product.title);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        return copy;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = async (totals) => {
    try {
      const payload = {
        items: cart.map((c) => ({
          product_id: "",
          title: c.title,
          price: c.price,
          quantity: c.quantity,
        })),
        subtotal: totals.subtotal,
        tax: totals.tax,
        total: totals.total,
        customer: {
          name: "Guest",
          email: "guest@example.com",
          address: "123 Main St",
        },
        status: "pending",
      };
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Checkout failed");
      setCart([]);
      setCartOpen(false);
      setMessage("Order placed! Thank you.");
    } catch (e) {
      setMessage("Checkout failed");
    }
  };

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.quantity, 0), [cart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="sticky top-0 z-30 backdrop-blur border-b border-white/10 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-white font-extrabold text-lg tracking-tight">VibeCommerce</a>
          <div className="flex items-center gap-3">
            {message && <div className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/20">{message}</div>}
            <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-lg hover:bg-white/5 text-white">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500 text-white">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main>
        <Hero onSeed={handleSeed} />
        {loading ? (
          <div className="max-w-7xl mx-auto px-6 py-12 text-blue-200">Loading...</div>
        ) : (
          <ProductGrid products={products} onAdd={addToCart} />
        )}
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-blue-200/70">
        <div className="max-w-7xl mx-auto px-6">© {new Date().getFullYear()} VibeCommerce. All rights reserved.</div>
      </footer>

      {cartOpen && (
        <Cart items={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onCheckout={handleCheckout} />
      )}
    </div>
  );
}

export default App;
