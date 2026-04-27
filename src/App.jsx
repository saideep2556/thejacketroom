import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CartProvider } from './hooks/useCart'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

const pageVariants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   { opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeIn' } }
}

function AnimatedRoute({ children }) {
  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show" exit="exit">
      {children}
    </motion.div>
  )
}

function AppShell() {
  const location = useLocation()
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"        element={<AnimatedRoute><Home /></AnimatedRoute>} />
          <Route path="/shop"    element={<AnimatedRoute><Shop /></AnimatedRoute>} />
          <Route path="/product/:slug" element={<AnimatedRoute><ProductDetail /></AnimatedRoute>} />
          <Route path="/about"   element={<AnimatedRoute><About /></AnimatedRoute>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </BrowserRouter>
  )
}