export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price (₹)',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    },
    {
      name: 'originalPrice',
      title: 'Original Price (₹) — for sale display',
      type: 'number',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Leather', value: 'leather' },
          { title: 'Bomber', value: 'bomber' },
          { title: 'Overcoat', value: 'overcoat' },
          { title: 'Denim', value: 'denim' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'badge',
      title: 'Badge (e.g. New, Sale, Bestseller)',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.required().min(1),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'details',
      title: 'Product Details (bullet points)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL'],
      },
    },
    {
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
      subtitle: 'price',
    },
    prepare({ title, media, subtitle }) {
      return { title, media, subtitle: subtitle ? `₹${subtitle.toLocaleString()}` : 'No price set' }
    },
  },
}
