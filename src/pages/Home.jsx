import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { getFeaturedProducts } from '../lib/queries'
import ProductCard from '../components/ProductCard'
import './Home.css'

const MOCK_PRODUCTS = [
  { _id: '1', name: 'Milano Leather Jacket', slug: { current: 'milano-leather' }, price: 8999, category: 'Leather', mainImage: null, badge: 'Bestseller', inStock: true },
  { _id: '2', name: 'Tokyo Bomber', slug: { current: 'tokyo-bomber' }, price: 5499, originalPrice: 6999, category: 'Bomber', mainImage: null, badge: 'Sale', inStock: true },
  { _id: '3', name: 'Heritage Overcoat', slug: { current: 'heritage-overcoat' }, price: 12999, category: 'Overcoat', mainImage: null, inStock: true },
  { _id: '4', name: 'Raw Denim Jacket', slug: { current: 'raw-denim' }, price: 4299, category: 'Denim', mainImage: null, badge: 'New', inStock: true },
]

export default function Home() {
  const [featured, setFeatured] = useState(MOCK_PRODUCTS)
  const [loading, setLoading] = useState(true)

  const featuredRef = useRef(null)
  const editorialRef = useRef(null)
  const categoriesRef = useRef(null)
  const ctaRef = useRef(null)

  const featuredInView = useInView(featuredRef, { once: true, margin: '-80px' })
  const editorialInView = useInView(editorialRef, { once: true, margin: '-80px' })
  const categoriesInView = useInView(categoriesRef, { once: true, margin: '-80px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  useEffect(() => {
    getFeaturedProducts()
      .then(data => { if (data?.length) setFeatured(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="home">

      {/* ── Hero ── */}
      <section className="hero">
        <motion.div
          className="hero-bg"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />

        {/* Gold accent ring */}
        <motion.div
          className="hero-accent-ring"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut', delay: 0.3 }}
        />

        <div className="hero-content">
          <motion.p
            className="overline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            New Collection · 2025
          </motion.p>

          <motion.h1
            className="display hero-headline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.span
              style={{ display: 'block' }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            >
              Wear
            </motion.span>
            <motion.span
              className="display-italic hero-italic"
              style={{ display: 'block' }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
            >
              the
            </motion.span>
            <motion.span
              style={{ display: 'block' }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.45 }}
            >
              Silence
            </motion.span>
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.65 }}
          >
            Outerwear for those who let the jacket do the talking.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.85 }}
          >
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link to="/shop" className="btn-primary">Explore Collection</Link>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener" className="btn-ghost">
                Custom Order
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="hero-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="overline">Scroll</span>
          <div className="scroll-line" />
        </motion.div>
      </section>

      {/* ── Marquee ── */}
      <motion.div
        className="marquee-strip"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <div className="marquee-track">
          {['Leather', 'Bomber', 'Overcoat', 'Denim', 'Premium Quality', 'Hyderabad Made', 'WhatsApp Orders'].flatMap(t => [t, '·']).map((t, i) => (
            <span key={i} className={t === '·' ? 'marquee-dot' : ''}>{t}</span>
          ))}
          {['Leather', 'Bomber', 'Overcoat', 'Denim', 'Premium Quality', 'Hyderabad Made', 'WhatsApp Orders'].flatMap(t => [t, '·']).map((t, i) => (
            <span key={`b-${i}`} className={t === '·' ? 'marquee-dot' : ''}>{t}</span>
          ))}
        </div>
      </motion.div>

      {/* ── Featured Products ── */}
      <section className="section-featured container" ref={featuredRef}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 32 }}
          animate={featuredInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="overline">Curated Pieces</p>
          <h2 className="display section-title">Featured Collection</h2>
          <Link to="/shop" className="section-cta">View All →</Link>
        </motion.div>

        {loading ? (
          <div className="product-grid">
            {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ aspectRatio: '3/4', borderRadius: 0 }} />)}
          </div>
        ) : (
          <div className="product-grid">
            {featured.slice(0, 4).map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 40 }}
                animate={featuredInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 + i * 0.12 }}
              >
                <ProductCard product={p} index={i} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ── Editorial Banner ── */}
      <section className="editorial-banner" ref={editorialRef}>
        <div className="editorial-inner container">
          <motion.div
            className="editorial-text"
            initial={{ opacity: 0, y: 32 }}
            animate={editorialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="overline">The Craft</p>
            <h2 className="display editorial-headline">
              Every piece,<br /><span className="display-italic">a statement.</span>
            </h2>
            <p className="editorial-body">
              We source premium materials from across India. Each jacket passes through
              the hands of skilled artisans before it reaches you — no shortcuts, no compromises.
            </p>
            <Link to="/about" className="btn-ghost" style={{ alignSelf: 'flex-start' }}>Our Story</Link>
          </motion.div>

          <motion.div
            className="editorial-image-grid"
            initial={{ opacity: 0, y: 32 }}
            animate={editorialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          >
            <div className="editorial-img editorial-img-1">
              <div className="editorial-img-placeholder display-italic">01</div>
            </div>
            <div className="editorial-img editorial-img-2">
              <div className="editorial-img-placeholder display-italic">02</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Categories Strip ── */}
      <section className="categories-strip container" ref={categoriesRef}>
        <motion.p
          className="overline"
          style={{ textAlign: 'center', marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Browse By Category
        </motion.p>

        <div className="categories-grid">
          {[
            { label: 'Leather', slug: 'leather', num: '01' },
            { label: 'Bombers', slug: 'bomber', num: '02' },
            { label: 'Overcoats', slug: 'overcoat', num: '03' },
            { label: 'Denim', slug: 'denim', num: '04' },
          ].map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 32 }}
              animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
            >
              <Link to={`/shop?cat=${cat.slug}`} className="category-card">
                <div className="category-card-bg" />
                <div className="category-card-content">
                  <span className="category-num">{cat.num}</span>
                  <span className="display category-label">{cat.label}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WhatsApp CTA ── */}
      <section className="whatsapp-cta container" ref={ctaRef}>
        <motion.div
          className="whatsapp-cta-inner"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div>
            <p className="overline">Bespoke Orders</p>
            <h2 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Can't find your size?<br /><span className="display-italic">Let's talk.</span>
            </h2>
          </div>
          <motion.a
            href="https://wa.me/919999999999?text=Hi%2C+I%27d+like+to+place+a+custom+order"
            target="_blank" rel="noopener"
            className="btn-whatsapp"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            Chat on WhatsApp
          </motion.a>
        </motion.div>
      </section>
    </main>
  )
}