import { Star, ShoppingCart } from "lucide-react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-xl bg-slate-800/50 border border-white/10 overflow-hidden hover:border-blue-500/40 transition">
      <div className="aspect-square overflow-hidden bg-slate-900">
        <img src={product.image_url} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold truncate" title={product.title}>{product.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="text-blue-200">${product.price.toFixed(2)}</div>
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            <Star className="w-4 h-4 fill-yellow-400" />
            {product.rating?.toFixed?.(1) || product.rating}
          </div>
        </div>
        <button onClick={() => onAdd(product)} className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition">
          <ShoppingCart className="w-4 h-4" />
          Add to cart
        </button>
      </div>
    </div>
  );
}
