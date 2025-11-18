import { ShoppingBag } from "lucide-react";

export default function Hero({ onSeed }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.15),transparent_25%)]" />
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-blue-200 text-xs mb-4">
              <ShoppingBag className="w-4 h-4" />
              Fresh arrivals for the season
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
              Shop the latest. Feel the vibe.
            </h1>
            <p className="text-blue-200/80 text-lg max-w-xl">
              A clean, modern storefront powered by a live backend. Explore products, add to cart, and checkout.
            </p>
            <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
              <button onClick={onSeed} className="px-5 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition">Load demo products</button>
              <a href="#products" className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition">Browse products</a>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900">
              <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&q=80&auto=format&fit=crop" alt="Hero" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
