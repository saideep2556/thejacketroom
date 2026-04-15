import { useCart } from '../hooks/useCart'
import './Cart.css'

export default function Cart() {
  const { items, removeItem, updateQty, total, isOpen, setIsOpen, clearCart, buildWhatsAppMessage } = useCart()

  const handleCheckout = () => {
    if (items.length === 0) return
    window.open(buildWhatsAppMessage(), '_blank')
  }

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)} />
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div>
            <p className="overline">Your Selection</p>
            <h2 className="display" style={{ fontSize: '1.6rem' }}>Cart</h2>
          </div>
          <button className="cart-close" onClick={() => setIsOpen(false)} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p className="display-italic" style={{ fontSize: '1.4rem', color: 'var(--white-dimmer)' }}>Your cart is empty</p>
              <p style={{ fontSize: '12px', color: 'var(--white-dimmer)', marginTop: '0.5rem' }}>Add a piece to begin</p>
            </div>
          ) : (
            <ul className="cart-items">
              {items.map(item => (
                <li key={item.key} className="cart-item">
                  <div className="cart-item-img">
                    {item.product.mainImage
                      ? <img src={item.product.mainImage} alt={item.product.name} />
                      : <div className="cart-item-img-placeholder" />
                    }
                  </div>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.product.name}</p>
                    <p className="cart-item-size">Size: {item.size}</p>
                    <p className="cart-item-price">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                    <div className="cart-item-actions">
                      <div className="qty-control">
                        <button onClick={() => updateQty(item.key, item.quantity - 1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQty(item.key, item.quantity + 1)}>+</button>
                      </div>
                      <button className="remove-btn" onClick={() => removeItem(item.key)}>Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span className="overline">Total</span>
              <span className="display" style={{ fontSize: '1.5rem' }}>₹{total.toLocaleString()}</span>
            </div>
            <button className="btn-checkout" onClick={handleCheckout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M5.077 21H3.867A1.867 1.867 0 012 19.133V4.867A1.867 1.867 0 013.867 3H20.133A1.867 1.867 0 0122 4.867v14.266A1.867 1.867 0 0120.133 21H8.923l-3.846.001z"/>
              </svg>
              Order via WhatsApp
            </button>
            <button className="btn-clear" onClick={clearCart}>Clear Cart</button>
          </div>
        )}
      </aside>
    </>
  )
}
