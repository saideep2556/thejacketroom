import { Link } from 'react-router-dom'
import './ProductCard.css'

export default function ProductCard({ product, index = 0 }) {
  const delay = (index % 4) * 0.1

  return (
    <Link
      to={`/product/${product.slug?.current || product._id}`}
      className="product-card"
      style={{ '--delay': `${delay}s` }}
    >
      <div className="product-card-image">
        {product.mainImage
          ? <img src={product.mainImage} alt={product.name} loading="lazy" />
          : <div className="product-card-placeholder">
              <span className="display-italic" style={{ fontSize: '3rem', color: 'var(--white-dimmer)' }}>TJR</span>
            </div>
        }
        {product.badge && <span className="product-badge">{product.badge}</span>}
        {product.inStock === false && <div className="product-sold-out">Sold Out</div>}

        <div className="product-card-overlay">
          <span className="product-card-cta">View Piece</span>
        </div>
      </div>

      <div className="product-card-info">
        <p className="overline" style={{ marginBottom: '4px' }}>{product.category}</p>
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-price">
          <span className="price-current">₹{product.price?.toLocaleString()}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="price-original">₹{product.originalPrice?.toLocaleString()}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
