import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onAdd }) {
  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Products</h2>
          <p className="text-blue-200/70 text-sm">Browse a curated set of items</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.title + p.price} product={p} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}
