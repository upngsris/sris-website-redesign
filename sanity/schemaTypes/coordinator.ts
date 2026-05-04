import { defineField, defineType } from "sanity"

export default defineType({
    name: 'coordinator',
    type: 'document',
    title: 'Division Coordinator',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Full Name',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'division',
            type: 'string',
            title: 'Assigned Division',
            description: 'The division this coordinator liaises with',
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
            validation: (Rule) => Rule.required(),
        }),
        /*defineField({
            name: 'liaisesWithHOD',
            type: 'boolean',
            title: 'Liaises with HOD',
            description: 'Does this coordinator liaise directly with the Head of Department?',
            initialValue: true,
        }), */
        defineField({
            name: 'responsibilities',
            type: 'array',
            title: 'Responsibilities',
            description: 'e.g. Lab booking, HOD liaison, project coordination',
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