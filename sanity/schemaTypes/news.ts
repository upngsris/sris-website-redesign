import { defineField, defineType } from "sanity"

export default defineType({
    name: 'news',
    type: 'document',
    title: 'News',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'News Title',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            type: 'string',
            title: 'Category',
            options: {
                list: [
                    { title: 'Society Announcement', value: 'announcement' },
                    { title: 'Research & Innovation', value: 'research' },
                    { title: 'Events & Activities', value: 'events' },
                    { title: 'Awards & Recognition', value: 'awards' },
                    { title: 'Partnerships', value: 'partnerships' },
                    { title: 'General News', value: 'general' },
                ],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'coverImage',
            type: 'image',
            title: 'Cover Image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'excerpt',
            type: 'text',
            title: 'Excerpt',
            description: 'A short summary shown on news listing pages.',
            rows: 3,
            validation: (Rule) => Rule.required().max(300),
        }),
        defineField({
            name: 'body',
            type: 'array',
            title: 'Article Body',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            type: 'datetime',
            title: 'Published At',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'executive' }],
        }),
        defineField({
            name: 'isFeatured',
            type: 'boolean',
            title: 'Feature this article?',
            description: 'Featured articles are highlighted on the homepage.',
            initialValue: false,
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'relatedEvent',
            title: 'Related Event',
            type: 'reference',
            to: [{ type: 'event' }],
            description: 'Link to an event if this news article is about one.',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'coverImage',
        },
    },
})