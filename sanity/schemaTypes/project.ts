import { defineField, defineType } from "sanity"

export default defineType({
    name: 'project',
    type: 'document',
    title: 'Project',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Project Title',
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
            title: 'Project Status',
            initialValue: 'active',
            options: {
                list: [
                    { title: 'Active', value: 'active' },
                    { title: 'Completed', value: 'completed' },
                    { title: 'On Hold', value: 'on-hold' },
                    { title: 'Archived', value: 'archived' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'division',
            type: 'string',
            title: 'Division',
            description: 'Which SRIS division led this project?',
            options: {
                list: [
                    { title: 'Physics Division', value: 'physics' },
                    { title: 'Chemistry Division', value: 'chemistry' },
                    { title: 'Biology Division', value: 'biology' },
                    { title: 'Earth Science & Geology Division', value: 'esg' },
                    { title: 'Mathematics, Statistics & Computer Science Division', value: 'mscs' },
                    { title: 'Environmental Science & Geography Division', value: 'esg-geo' },
                    { title: 'Cross-divisional', value: 'cross-divisional' },
                ],
                layout: 'dropdown',
            },
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
            name: 'summary',
            type: 'text',
            title: 'Project Summary',
            description: 'A brief overview shown on the projects listing page.',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'body',
            type: 'array',
            title: 'Full Project Description',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        }),
        defineField({
            name: 'startDate',
            type: 'date',
            title: 'Start Date',
        }),
        defineField({
            name: 'endDate',
            type: 'date',
            title: 'End Date',
            description: 'Leave blank if the project is ongoing.',
        }),
        defineField({
            name: 'teamMembers',
            title: 'Team Members',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'executive' }],
                },
            ],
        }),
        defineField({
            name: 'outcomes',
            title: 'Key Outcomes',
            type: 'array',
            description: 'Bullet-point list of results or deliverables from the project.',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'externalLink',
            type: 'url',
            title: 'External Link',
            description: 'GitHub repo, published paper, or any relevant external URL.',
            validation: (Rule) =>
                Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
            name: 'gallery',
            title: 'Project Gallery',
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
        defineField({
            name: 'isFeatured',
            type: 'boolean',
            title: 'Feature this project?',
            description: 'Featured projects are highlighted on the homepage.',
            initialValue: false,
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