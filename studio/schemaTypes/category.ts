import { defineType, defineField } from 'sanity';

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'pillar',
      title: 'Pillar',
      type: 'string',
      options: {
        list: [
          { title: 'Physical Health', value: 'physical' },
          { title: 'Mental Health', value: 'mental' },
          { title: 'Emotional Health', value: 'emotional' },
          { title: 'Social Health', value: 'social' },
          { title: 'Spiritual Health', value: 'spiritual' },
          { title: 'Financial Health', value: 'financial' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
});
