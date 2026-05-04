import { defineField, defineType } from "sanity"

export default defineType({
    name: 'executive',
    type: 'document',
    title: 'Executive Member',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Full Name',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            type: 'string',
            title: 'Current Role',
            initialValue: 'president',
            options: {
                list: [
                    { title: 'President', value: 'president' },
                    { title: 'Vice-President', value: 'vice-president' },
                    { title: 'Secretary', value: 'secretary' },
                    { title: 'Treasurer', value: 'treasurer' },
                ],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'division',
            type: 'string',
            title: 'Department or Division',
            options: {
                list: [
                    { title: 'Physics Division', value: 'physics' },
                    { title: 'Chemistry Division', value: 'chemistry' },
                    { title: 'Biology Division', value: 'biology' },
                    { title: 'Earth Science & Geology Division', value: 'esg' },
                    { title: 'Mathematics, Statistics & Computer Science Division', value: 'mscs' },
                    { title: 'Environmental Science & Geography Division', value: 'esg-geo' },
                ],
                layout: 'dropdown',
            },
        }),
        defineField({
            name: 'profileImage',
            type: 'image',
            title: 'Profile Image',
            options: {
                hotspot: true, // enables focal point cropping
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
                                    { title: 'Email', value: 'email' },
                                    { title: 'Facebook', value: 'facebook' },
                                    { title: 'Instagram', value: 'instagram' },
                                    { title: 'Twitter / X', value: 'twitter' },
                                    { title: 'LinkedIn', value: 'linkedin' },
                                    { title: 'YouTube', value: 'youtube' },
                                    { title: 'GitHub', value: 'github' },
                                    { title: 'TikTok', value: 'tiktok' },
                                    { title: 'WhatsApp', value: 'whatsapp' },
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