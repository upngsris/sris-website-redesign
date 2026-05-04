import { defineField, defineType } from "sanity"

export default defineType({
    name: 'event',
    type: 'document',
    title: 'Event',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Event Title',
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
            name: 'status',
            type: 'string',
            title: 'Event Status',
            initialValue: 'upcoming',
            options: {
                list: [
                    { title: 'Upcoming', value: 'upcoming' },
                    { title: 'Ongoing', value: 'ongoing' },
                    { title: 'Completed', value: 'completed' },
                    { title: 'Cancelled', value: 'cancelled' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            type: 'string',
            title: 'Event Category',
            options: {
                list: [
                    { title: 'Workshop', value: 'workshop' },
                    { title: 'Seminar', value: 'seminar' },
                    { title: 'Conference', value: 'conference' },
                    { title: 'Field Trip', value: 'field-trip' },
                    { title: 'Competition', value: 'competition' },
                    { title: 'Social Event', value: 'social' },
                    { title: 'General Meeting', value: 'general-meeting' },
                    { title: 'Other', value: 'other' },
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
            name: 'description',
            type: 'text',
            title: 'Short Description',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'body',
            type: 'array',
            title: 'Full Event Details',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'startDate',
            type: 'datetime',
            title: 'Start Date & Time',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'endDate',
            type: 'datetime',
            title: 'End Date & Time',
        }),
        defineField({
            name: 'location',
            type: 'string',
            title: 'Location / Venue',
        }),
        defineField({
            name: 'isOnline',
            type: 'boolean',
            title: 'Online Event?',
            initialValue: false,
        }),
        defineField({
            name: 'registrationLink',
            type: 'url',
            title: 'Registration Link',
            validation: (Rule) =>
                Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
            name: 'organizers',
            title: 'Organizers',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'executive' }],
                },
            ],
        }),
        defineField({
            name: 'gallery',
            title: 'Event Gallery',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
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
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'status',
            media: 'coverImage',
        },
    },
})