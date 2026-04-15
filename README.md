# 🧥 The Jacket Room — Setup Guide

A dark editorial luxury e-commerce store built with React + Vite + Sanity CMS.
Orders are redirected to WhatsApp.

---

## Project Structure

```
thejacketroom/
├── src/                  → React storefront (Vite)
│   ├── components/       → Navbar, Cart, ProductCard, Footer
│   ├── pages/            → Home, Shop, ProductDetail, About
│   ├── hooks/            → useCart (context)
│   └── lib/              → sanity.js (client), queries.js (GROQ)
└── sanity-studio/        → Sanity CMS admin panel
    └── schemas/          → product.js, hero.js
```

---

## Step 1 — Create a Sanity Project

1. Go to [https://sanity.io](https://sanity.io) and create a free account
2. Create a new project — name it `thejacketroom`
3. Choose dataset: **production**
4. Copy your **Project ID** (looks like `abc123de`)

---

## Step 2 — Set Up Sanity Studio

```bash
cd sanity-studio
npm install
```

Open `sanity-studio/sanity.config.js` and replace:
```js
projectId: 'YOUR_PROJECT_ID',   // ← paste your Sanity project ID here
```

Then start the studio locally:
```bash
npm run dev
# Opens at http://localhost:3333
```

Add your products via the **Products** section in the studio UI.

To deploy the studio publicly (optional):
```bash
npm run deploy
# Gives you a URL like https://thejacketroom.sanity.studio
```

---

## Step 3 — Configure CORS in Sanity

In [https://sanity.io/manage](https://sanity.io/manage):
1. Open your project → **API** tab → **CORS Origins**
2. Add `http://localhost:5173` (for dev)
3. Add your production domain when you deploy (e.g. `https://thejacketroom.in`)

---

## Step 4 — Connect the Storefront

Open `src/lib/sanity.js` and replace:
```js
projectId: 'YOUR_PROJECT_ID',   // ← same project ID
```

---

## Step 5 — Set Your WhatsApp Number

In TWO places, replace `916309566002` with your actual number (country code + number, no spaces, no `+`):

1. `src/hooks/useCart.jsx` line ~30
2. `src/pages/Home.jsx` — the WhatsApp links
3. `src/components/Footer.jsx` — the footer link
4. `src/pages/ProductDetail.jsx` line ~15

Example: India number `+91 98765 43210` → `919876543210`

---

## Step 6 — Run the Storefront

```bash
# In the root /thejacketroom folder:
npm install
npm run dev
# Opens at http://localhost:5173
```

---

## Deployment (Vercel recommended)

```bash
npm run build
# Deploy the dist/ folder to Vercel or Netlify
```

For Vercel with React Router, add a `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## Adding Products in Sanity

Each product has:
- **Name** + **Slug** (auto-generated from name)
- **Price** + **Original Price** (for sale badge)
- **Category**: leather / bomber / overcoat / denim
- **Badge**: New, Sale, Bestseller, etc.
- **Images**: Upload multiple — first image is the main one
- **Description** + **Details** (bullet points)
- **Sizes**: pick from XS–3XL
- **In Stock**: toggle to show/hide
- **Featured**: tick to show on homepage

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite |
| Routing | React Router v6 |
| CMS / Admin | Sanity v3 |
| Payments | WhatsApp redirect |
| Fonts | Cormorant Garamond + Archivo |
| Hosting | Vercel / Netlify |
