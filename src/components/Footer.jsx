import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="display footer-logo">The Jacket Room</h2>
            <p className="footer-tagline display-italic">Crafted for the uncommon individual.</p>
          </div>

          <div className="footer-nav">
            <div className="footer-col">
              <p className="overline footer-col-title">Shop</p>
              <Link to="/shop">All Jackets</Link>
              <Link to="/shop?cat=leather">Leather</Link>
              <Link to="/shop?cat=bomber">Bombers</Link>
              <Link to="/shop?cat=overcoat">Overcoats</Link>
            </div>
            <div className="footer-col">
              <p className="overline footer-col-title">Info</p>
              <Link to="/about">About</Link>
              <a href="#">Size Guide</a>
              <a href="#">Care Instructions</a>
              <a href="#">Returns Policy</a>
            </div>
            <div className="footer-col">
              <p className="overline footer-col-title">Contact</p>
              <a href="https://wa.me/916309566002" target="_blank" rel="noopener">WhatsApp Us</a>
              <a href="mailto:hello@thejacketroom.in">Email</a>
              <a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} The Jacket Room. All rights reserved.</p>
          <p>Orders processed via WhatsApp · Hyderabad, India</p>
        </div>
      </div>
    </footer>
  )
}
