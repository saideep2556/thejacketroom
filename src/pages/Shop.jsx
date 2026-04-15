import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllProducts } from '../lib/queries'
import ProductCard from '../components/ProductCard'
import './Shop.css'

const MOCK = [
  { _id: '1', name: 'Milano Leather Jacket', slug: { current: 'milano-leather' }, price: 8999, category: 'leather', mainImage: null, badge: 'Bestseller', inStock: true },
  { _id: '2', name: 'Tokyo Bomber', slug: { current: 'tokyo-bomber' }, price: 5499, originalPrice: 6999, category: 'bomber', mainImage: null, badge: 'Sale', inStock: true },
  { _id: '3', name: 'Heritage Overcoat', slug: { current: 'heritage-overcoat' }, price: 12999, category: 'overcoat', mainImage: null, inStock: true },
  { _id: '4', name: 'Raw Denim Jacket', slug: { current: 'raw-denim' }, price: 4299, category: 'denim', mainImage: null, badge: 'New', inStock: true },
  { _id: '5', name: 'Biker Leather', slug: { current: 'biker-leather' }, price: 10999, category: 'leather', mainImage: null, inStock: true },
  { _id: '6', name: 'Satin Bomber', slug: { current: 'satin-bomber' }, price: 6299, category: 'bomber', mainImage: null, inStock: false },
]

const CATEGORIES = ['All', 'Leather', 'Bomber', 'Overcoat', 'Denim']
const SORT_OPTIONS = [
  { value: 'default', label: 'New In' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export default function Shop() {
  const [products, setProducts] = useState(MOCK)
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('default')

  const activeCat = searchParams.get('cat') || 'all'

  useEffect(() => {
    getAllProducts()
      .then(data => { if (data?.length) setProducts(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = products.filter(p => {
    if (activeCat === 'all') return true
    return p.category?.toLowerCase() === activeCat.toLowerCase()
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    return 0
  })

  const setCategory = (cat) => {
    if (cat.toLowerCase() === 'all') setSearchParams({})
    else setSearchParams({ cat: cat.toLowerCase() })
  }

  return (
    <main className="shop-page">
      <div className="container">
        {/* Header */}
        <div className="shop-header">
          <p className="overline">The Collection</p>
          <h1 className="display shop-title">
            {activeCat === 'all' ? 'All Jackets' : activeCat.charAt(0).toUpperCase() + activeCat.slice(1)}
          </h1>
          <p className="shop-count">{sorted.length} pieces</p>
        </div>

        {/* Controls */}
        <div className="shop-controls">
          <div className="category-tabs">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cat-tab ${(activeCat === 'all' && cat === 'All') || activeCat === cat.toLowerCase() ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            className="sort-select"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="product-grid">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="skeleton" style={{ aspectRatio: '3/4', borderRadius: 0 }} />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="shop-empty">
            <p className="display-italic" style={{ fontSize: '1.8rem', color: 'var(--white-dimmer)' }}>
              No pieces found
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {sorted.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </main>
  )
}
