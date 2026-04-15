import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// ⚠️ Replace these with your actual Sanity project values
export const client = createClient({
  projectId: 'l6jpnjpm',   // e.g. 'abc123de'
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}
