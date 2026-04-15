export default {
  name: 'hero',
  title: 'Homepage Hero',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main hero headline text',
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Explore Collection',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
