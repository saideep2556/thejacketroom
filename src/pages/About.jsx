import { Link } from 'react-router-dom'
import './About.css'

export default function About() {
  return (
    <main className="about-page">
      <div className="container-tight">

        {/* Hero */}
        <section className="about-hero">
          <p className="overline reveal">Our Story</p>
          <h1 className="display about-headline reveal reveal-1">
            Built for<br /><span className="display-italic about-gold">the jacket.</span>
          </h1>
        </section>

        {/* Story text */}
        <section className="about-story reveal reveal-2">
          <div className="about-story-grid">
            <div className="about-story-text">
              <p>
                The Jacket Room was born from a simple frustration — the best outerwear was always too expensive,
                too generic, or too hard to find in India. We started making our own.
              </p>
              <p>
                Every piece we offer is sourced from premium Indian tanneries and crafted by skilled artisans
                in Hyderabad. No mass production. No middlemen. Just quality outerwear at honest prices,
                delivered through a conversation on WhatsApp.
              </p>
              <p>
                We believe a great jacket is the last thing you put on and the first thing people notice.
                That's the standard we hold every piece to.
              </p>
            </div>
            <div className="about-story-stat-col">
              {[
                { num: '2021', label: 'Founded' },
                { num: '500+', label: 'Jackets Delivered' },
                { num: '100%', label: 'India Made' },
                { num: '4.9★', label: 'Avg. Rating' },
              ].map(s => (
                <div key={s.num} className="about-stat">
                  <span className="display about-stat-num">{s.num}</span>
                  <span className="overline">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="divider" style={{ margin: '5rem 0' }} />

        {/* Values */}
        <section className="about-values reveal">
          <p className="overline" style={{ marginBottom: '3rem' }}>What We Stand For</p>
          <div className="values-grid">
            {[
              { title: 'Craft First', body: 'We visit our makers. We know their names. Every seam is intentional.' },
              { title: 'No Shortcuts', body: 'Full-grain leathers. YKK hardware. Satin linings. It\'s in the details.' },
              { title: 'Human Commerce', body: 'Orders go through WhatsApp because we want to talk to you — not process you.' },
              { title: 'Honest Pricing', body: 'No inflated "original prices". No fake discounts. Just fair value.' },
            ].map(v => (
              <div key={v.title} className="value-card">
                <h3 className="display value-title">{v.title}</h3>
                <p className="value-body">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta reveal">
          <h2 className="display about-cta-headline">
            Ready to find<br /><span className="display-italic about-gold">your jacket?</span>
          </h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/shop" className="btn-primary">Shop the Collection</Link>
            <a href="https://wa.me/916309566002" target="_blank" rel="noopener" className="btn-ghost">
              Talk to Us
            </a>
          </div>
        </section>

      </div>
    </main>
  )
}
