import { defineField, defineType } from "sanity"

export default defineType({
    name: 'committee',
    type: 'document',
    title: 'Committee Member',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Full Name',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'committeeType',
            type: 'string',
            title: 'Committee',
            description: 'The committee this member belongs to',
            options: {
                list: [
                    { title: 'Fundraising Committee', value: 'fundraising' },
                    { title: 'Events & Activities Committee', value: 'events' },
                    { title: 'Publications & Media Committee', value: 'publications' },
                    { title: 'Research & Innovation Committee', value: 'research' },
                    { title: 'Welfare & Outreach Committee', value: 'welfare' },
                ],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'responsibilities',
            type: 'array',
            title: 'Responsibilities',
            description: 'List of key responsibilities for this committee member',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'profileImage',
            type: 'image',
            title: 'Profile Image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'bio',
            type: 'text',
            title: 'Short Bio',
            rows: 3,
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Facebook', value: 'facebook' },
                                    { title: 'Instagram', value: 'instagram' },
                                    { title: 'Twitter / X', value: 'twitter' },
                                    { title: 'LinkedIn', value: 'linkedin' },
                                    { title: 'YouTube', value: 'youtube' },
                                    { title: 'GitHub', value: 'github' },
                                    { title: 'TikTok', value: 'tiktok' },
                                ],
                                layout: 'dropdown',
                            },
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'url',
                            title: 'Profile URL',
                            type: 'url',
                            validation: (Rule) =>
                                Rule.required().uri({ scheme: ['http', 'https'] }),
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'platform',
                            subtitle: 'url',
                        },
                    },
                },
            ],
        }),
    ],
})