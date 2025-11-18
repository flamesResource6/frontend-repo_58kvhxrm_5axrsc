import { X, ShoppingCart, Trash2 } from "lucide-react";

export default function Cart({ items, onClose, onRemove, onCheckout }) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-slate-900/60" onClick={onClose} />
      <div className="w-full max-w-md h-full bg-slate-900 border-l border-white/10 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 text-white font-semibold">
            <ShoppingCart className="w-5 h-5" /> Cart
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-blue-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-blue-200/70">Your cart is empty.</div>
        ) : (
          <div className="space-y-4">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 border border-white/10 rounded-lg p-3">
                <img src={item.image_url} alt={item.title} className="w-16 h-16 rounded object-cover" />
                <div className="flex-1">
                  <div className="text-white font-medium">{item.title}</div>
                  <div className="text-blue-200 text-sm">${item.price.toFixed(2)} × {item.quantity}</div>
                </div>
                <button onClick={() => onRemove(idx)} className="p-2 rounded hover:bg-white/5 text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <div className="border-t border-white/10 pt-4 space-y-2 text-blue-100">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-semibold text-white"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>

            <button onClick={() => onCheckout({ subtotal, tax, total })} className="w-full mt-2 px-4 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold">Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}
