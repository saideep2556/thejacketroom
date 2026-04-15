import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import Cart from './Cart'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, setIsOpen } = useCart()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="nav-inner">
          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>

          <Link to="/" className="nav-logo">
            <span className="display">The Jacket Room</span>
          </Link>

          <div className="nav-actions">
            <button className="nav-cart-btn" onClick={() => setIsOpen(true)} aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {count > 0 && <span className="nav-cart-count">{count}</span>}
            </button>
          </div>
        </div>

        <div className="nav-links-bar">
          <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`}>All Jackets</Link>
          <Link to="/shop?cat=leather" className="nav-link">Leather</Link>
          <Link to="/shop?cat=bomber" className="nav-link">Bombers</Link>
          <Link to="/shop?cat=overcoat" className="nav-link">Overcoats</Link>
          <Link to="/shop?cat=denim" className="nav-link">Denim</Link>
          <Link to="/shop?cat=new" className="nav-link nav-link-gold">New In</Link>
        </div>

        {/* Mobile menu */}
        <div className="nav-mobile-menu">
          <Link to="/shop" className="mobile-link">All Jackets</Link>
          <Link to="/shop?cat=leather" className="mobile-link">Leather</Link>
          <Link to="/shop?cat=bomber" className="mobile-link">Bombers</Link>
          <Link to="/shop?cat=overcoat" className="mobile-link">Overcoats</Link>
          <Link to="/shop?cat=denim" className="mobile-link">Denim</Link>
          <Link to="/shop?cat=new" className="mobile-link mobile-link-gold">New In</Link>
        </div>
      </nav>

      <Cart />
    </>
  )
}
