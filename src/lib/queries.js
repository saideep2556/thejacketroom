import { client } from './sanity'

export async function getAllProducts() {
  return client.fetch(`
    *[_type == "product"] | order(_createdAt desc) {
      _id,
      name,
      slug,
      price,
      originalPrice,
      category,
      description,
      sizes,
      inStock,
      "images": images[].asset->url,
      "mainImage": images[0].asset->url,
      featured,
      badge
    }
  `)
}

export async function getProductBySlug(slug) {
  return client.fetch(`
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      price,
      originalPrice,
      category,
      description,
      sizes,
      inStock,
      "images": images[].asset->url,
      badge,
      details
    }
  `, { slug })
}

export async function getFeaturedProducts() {
  return client.fetch(`
    *[_type == "product" && featured == true] | order(_createdAt desc) [0...6] {
      _id,
      name,
      slug,
      price,
      category,
      "mainImage": images[0].asset->url,
      badge
    }
  `)
}

export async function getCategories() {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      "image": image.asset->url
    }
  `)
}

export async function getHeroContent() {
  return client.fetch(`
    *[_type == "hero"][0] {
      headline,
      subheading,
      ctaText,
      "backgroundImage": backgroundImage.asset->url
    }
  `)
}
