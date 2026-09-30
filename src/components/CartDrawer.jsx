/**
 * CartDrawer – Slide-out cart panel for DIY Kits & Gourmet Platters.
 */
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartCount,
    clearCart,
    startBooking,
  } = useApp();
  const navigate = useNavigate();

  if (!cartOpen) return null;

  const handleCheckout = (serviceType) => {
    setCartOpen(false);
    startBooking(serviceType, { cartItems: cart, cartTotal });
    navigate(`/booking/${serviceType}`);
  };

  // Determine service type from cart items
  const serviceType = cart.length > 0 && cart[0].type === 'platter' ? 'platter' : 'diy';

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={() => setCartOpen(false)} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cream-dark">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-sage" />
            <h3 className="font-heading text-lg font-bold text-charcoal">
              Your Cart ({cartCount})
            </h3>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-1 rounded-full hover:bg-cream-dark transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-charcoal-light">
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size || ''}`}
                  className="flex gap-3 bg-cream rounded-xl p-3"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-charcoal truncate">{item.name}</h4>
                    {item.size && (
                      <p className="text-xs text-charcoal-light">{item.size}</p>
                    )}
                    <p className="text-sm font-bold text-sage mt-1">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? updateCartQuantity(item.id, item.size, item.quantity - 1)
                            : removeFromCart(item.id, item.size)
                        }
                        className="w-7 h-7 rounded-full bg-cream-dark hover:bg-sage/20 flex items-center justify-center cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.id, item.size, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-full bg-cream-dark hover:bg-sage/20 flex items-center justify-center cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="ml-auto p-1 text-red-400 hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-cream-dark px-6 py-4 space-y-3">
            <div className="flex justify-between text-lg">
              <span className="font-medium text-charcoal">Subtotal</span>
              <span className="font-heading font-bold text-sage">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            </div>
            <button
              onClick={() => handleCheckout(serviceType)}
              className="w-full py-3 bg-sage text-white rounded-full font-semibold hover:bg-sage-dark transition-colors cursor-pointer"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-sm text-red-500 hover:text-red-700 transition-colors cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}