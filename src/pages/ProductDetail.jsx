import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductBySlug } from '../lib/queries'
import { useCart } from '../hooks/useCart'
import './ProductDetail.css'

const MOCK_PRODUCT = {
  _id: '1',
  name: 'Milano Leather Jacket',
  slug: { current: 'milano-leather' },
  price: 8999,
  originalPrice: 10999,
  category: 'Leather',
  description: 'A masterpiece in full-grain leather. The Milano is our most refined silhouette — structured shoulders, a clean front zip, and a cut that works as well with tailored trousers as it does with raw denim. Sourced from tanneries in Tamil Nadu and hand-finished in Hyderabad.',
  details: [
    'Full-grain cowhide leather',
    'YKK front zipper',
    'Satin lining, 100% polyester',
    'Two side zip pockets',
    'Hand-stitched collar',
    'Available in Black and Dark Brown',
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  images: [],
  inStock: true,
  badge: 'Bestseller',
}

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    setLoading(true)
    getProductBySlug(slug)
      .then(data => setProduct(data || MOCK_PRODUCT))
      .catch(() => setProduct(MOCK_PRODUCT))
      .finally(() => setLoading(false))
  }, [slug])

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return }
    setSizeError(false)
    addItem(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleWhatsApp = () => {
    if (!selectedSize) { setSizeError(true); return }
    setSizeError(false)
    const WHATSAPP_NUMBER = '916309566002'
    const productUrl = `${window.location.origin}/product/${product.slug?.current || product._id}`
    const msg = [
      `Hi! I'd like to order the following:`,
      ``,
      `*${product.name}*`,
      `Size: ${selectedSize}`,
      `Price: ₹${product.price?.toLocaleString()}`,
      ``,
      `Product link: ${productUrl}`,
      ``,
      `Please confirm availability and share payment details.`
    ].join('\n')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  if (loading) {
    return (
      <main className="product-detail-page">
        <div className="container">
          <div className="product-detail-grid">
            <div className="skeleton" style={{ aspectRatio: '3/4', borderRadius: 0 }} />
            <div className="pd-info">
              <div className="skeleton" style={{ height: 16, width: 100, marginBottom: 16 }} />
              <div className="skeleton" style={{ height: 48, width: '80%', marginBottom: 12 }} />
              <div className="skeleton" style={{ height: 24, width: 120 }} />
            </div>
          </div>
        </div>
      </main>
    )
  }

  const images = product.images?.length ? product.images : [null, null, null]

  return (
    <main className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pd-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-grid">
          {/* Images */}
          <div className="pd-images">
            <div className="pd-main-image">
              {images[activeImage]
                ? <img src={images[activeImage]} alt={product.name} />
                : (
                  <div className="pd-image-placeholder">
                    <span className="display-italic pd-placeholder-text">TJR</span>
                  </div>
                )
              }
              {product.badge && <span className="product-badge">{product.badge}</span>}
            </div>

            {images.length > 1 && (
              <div className="pd-thumbnails">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`pd-thumb ${activeImage === i ? 'active' : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    {img
                      ? <img src={img} alt={`View ${i + 1}`} />
                      : <div className="pd-thumb-placeholder" />
                    }
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pd-info">
            <p className="overline">{product.category}</p>
            <h1 className="display pd-name">{product.name}</h1>

            <div className="pd-price-row">
              <span className="pd-price">₹{product.price?.toLocaleString()}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="pd-original-price">₹{product.originalPrice?.toLocaleString()}</span>
                  <span className="pd-discount-badge">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="pd-description">{product.description}</p>

            <hr className="divider" style={{ margin: '2rem 0' }} />

            {/* Size selector */}
            <div className="pd-sizes">
              <div className="pd-sizes-header">
                <p className="overline">Select Size</p>
                <button className="size-guide-link">Size Guide</button>
              </div>
              <div className="size-grid">
                {(product.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL']).map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => { setSelectedSize(size); setSizeError(false) }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && <p className="size-error">Please select a size</p>}
            </div>

            {/* CTAs */}
            <div className="pd-ctas">
              {product.inStock ? (
                <>
                  <button className={`btn-add-cart ${added ? 'added' : ''}`} onClick={handleAddToCart}>
                    {added ? '✓ Added to Cart' : 'Add to Cart'}
                  </button>
                  <button className="btn-whatsapp-buy" onClick={handleWhatsApp}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
                    Buy via WhatsApp
                  </button>
                </>
              ) : (
                <div className="pd-sold-out-block">
                  <p className="pd-sold-out-label">Currently Out of Stock</p>
                  <button className="btn-notify" onClick={handleWhatsApp}>
                    Notify Me on WhatsApp
                  </button>
                </div>
              )}
            </div>

            {/* Details */}
            {product.details?.length > 0 && (
              <div className="pd-details">
                <p className="overline" style={{ marginBottom: '1rem' }}>Product Details</p>
                <ul className="pd-details-list">
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Delivery note */}
            <div className="pd-delivery-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .5h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <span>Orders fulfilled via WhatsApp · Typically ships in 2–4 days</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
