import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '../lib/queries'
import ProductCard from '../components/ProductCard'
import './Home.css'

// Fallback mock data while Sanity is being set up
const MOCK_PRODUCTS = [
  { _id: '1', name: 'Milano Leather Jacket', slug: { current: 'milano-leather' }, price: 8999, category: 'Leather', mainImage: null, badge: 'Bestseller', inStock: true },
  { _id: '2', name: 'Tokyo Bomber', slug: { current: 'tokyo-bomber' }, price: 5499, originalPrice: 6999, category: 'Bomber', mainImage: null, badge: 'Sale', inStock: true },
  { _id: '3', name: 'Heritage Overcoat', slug: { current: 'heritage-overcoat' }, price: 12999, category: 'Overcoat', mainImage: null, inStock: true },
  { _id: '4', name: 'Raw Denim Jacket', slug: { current: 'raw-denim' }, price: 4299, category: 'Denim', mainImage: null, badge: 'New', inStock: true },
]

export default function Home() {
  const [featured, setFeatured] = useState(MOCK_PRODUCTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeaturedProducts()
      .then(data => { if (data?.length) setFeatured(data) })
      .catch(() => {}) // silently use mock
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="overline reveal">New Collection · 2025</p>
          <h1 className="display hero-headline reveal reveal-1">
            Wear<br /><span className="display-italic hero-italic">the</span><br />Silence
          </h1>
          <p className="hero-sub reveal reveal-2">
            Outerwear for those who let the jacket do the talking.
          </p>
          <div className="hero-actions reveal reveal-3">
            <Link to="/shop" className="btn-primary">Explore Collection</Link>
            <a href="https://wa.me/916309566002" target="_blank" rel="noopener" className="btn-ghost">
              Custom Order
            </a>
          </div>
        </div>
        <div className="hero-scroll-hint">
          {/* <span className="overline">Scroll</span> */}
          <div className="scroll-line" />
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-strip">
        <div className="marquee-trackk">
          {['Leather', 'Bomber', 'Overcoat', 'Denim', 'Premium Quality', 'Hyderabad Made', 'WhatsApp Orders'].flatMap(t => [t, '·']).map((t, i) => (
            <span key={i} className={t === '·' ? 'marquee-dot' : ''}>{t}</span>
          ))}
          {/* duplicate for seamless loop */}
          {['Leather', 'Bomber', 'Overcoat', 'Denim', 'Premium Quality', 'Hyderabad Made', 'WhatsApp Orders'].flatMap(t => [t, '·']).map((t, i) => (
            <span key={`b-${i}`} className={t === '·' ? 'marquee-dot' : ''}>{t}</span>
          ))}
        </div>
      </div>

      <div class="marquee-bar">
        <div class="marquee-track">
          <span>THE JACKET ROOM</span><span class="dot">◆</span>
          <span>NEW SEASON ARRIVALS</span><span class="dot">◆</span>
          <span>LEATHER</span><span class="dot">◆</span>
          <span>BOMBER</span><span class="dot">◆</span>
          <span>OVERCOAT</span><span class="dot">◆</span>
          <span>DENIM</span><span class="dot">◆</span>
          <span>PREMIUM QUALITY</span><span class="dot">◆</span>
          <span>WHATSAPP ORDERS</span><span class="dot">◆</span>
          <span>EASY 30-DAY RETURNS</span><span class="dot">◆</span>
          <span>THE JACKET ROOM</span><span class="dot">◆</span>
          <span>NEW SEASON ARRIVALS</span><span class="dot">◆</span>
          <span>LEATHER</span><span class="dot">◆</span>
          <span>BOMBER</span><span class="dot">◆</span>
          <span>OVERCOAT</span><span class="dot">◆</span>
          <span>DENIM</span><span class="dot">◆</span>
          <span>PREMIUM QUALITY</span><span class="dot">◆</span>
          <span>WHATSAPP ORDERS</span><span class="dot">◆</span>
          <span>EASY 30-DAY RETURNS</span><span class="dot">◆</span>
          <span>THE JACKET ROOM</span><span class="dot">◆</span>
          <span>NEW SEASON ARRIVALS</span><span class="dot">◆</span>
        </div>
      </div>

      {/* Featured Products */}
      <section className="section-featured container">
        <div className="section-header">
          <p className="overline">Curated Pieces</p>
          <h2 className="display section-title">Featured Collection</h2>
          <Link to="/shop" className="section-cta">View All →</Link>
        </div>

        {loading ? (
          <div className="product-grid">
            {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ aspectRatio: '3/4', borderRadius: 0 }} />)}
          </div>
        ) : (
          <div className="product-grid">
            {featured.slice(0, 4).map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
          </div>
        )}
      </section>

      {/* Editorial Banner */}
      <section className="editorial-banner">
        <div className="editorial-inner container">
          <div className="editorial-text">
            <p className="overline">The Craft</p>
            <h2 className="display editorial-headline">
              Every piece,<br /><span className="display-italic">a statement.</span>
            </h2>
            <p className="editorial-body">
              We source premium materials from across India. Each jacket passes through
              the hands of skilled artisans before it reaches you — no shortcuts, no compromises.
            </p>
            <Link to="/about" className="btn-ghost" style={{ alignSelf: 'flex-start' }}>Our Story</Link>
          </div>
          <div className="editorial-image-grid">
            <div className="editorial-img editorial-img-1">
              <div className="editorial-img-placeholder display-italic">01</div>
            </div>
            <div className="editorial-img editorial-img-2">
              <div className="editorial-img-placeholder display-italic">02</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Strip */}
      <section className="categories-strip container">
        <p className="overline" style={{ textAlign: 'center', marginBottom: '3rem' }}>Browse By Category</p>
        <div className="categories-grid">
          {[
            { label: 'Leather', slug: 'leather', num: '01' },
            { label: 'Bombers', slug: 'bomber', num: '02' },
            { label: 'Overcoats', slug: 'overcoat', num: '03' },
            { label: 'Denim', slug: 'denim', num: '04' },
          ].map(cat => (
            <Link key={cat.slug} to={`/shop?cat=${cat.slug}`} className="category-card">
              <div className="category-card-bg" />
              <div className="category-card-content">
                <span className="category-num">{cat.num}</span>
                <span className="display category-label">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="whatsapp-cta container">
        <div className="whatsapp-cta-inner">
          <div>
            <p className="overline">Bespoke Orders</p>
            <h2 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Can't find your size?<br /><span className="display-italic">Let's talk.</span>
            </h2>
          </div>
          <a
            href="https://wa.me/916309566002?text=Hi%2C+I%27d+like+to+place+a+custom+order"
            target="_blank" rel="noopener"
            className="btn-whatsapp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </main>
  )
}
