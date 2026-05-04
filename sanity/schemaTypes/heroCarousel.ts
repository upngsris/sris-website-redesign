// sanity/schemas/heroCarousel.ts
//
// Schema for the Hero Section Carousel.
// Stores 3–5 activity cards (projects, events, etc.) displayed
// as a sliding carousel on the right side of the home hero.
//
// Register in your Sanity schema index:
//   import heroCarousel from './heroCarousel'
//   export const schemaTypes = [heroCarousel, ...]

import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export default defineType({
  name: "heroCarousel",
  title: "Hero Carousel",
  type: "document",
  icon: ImagesIcon,

  // Prevent editors from creating duplicate carousel documents
  __experimental_actions: ["update", "publish"],

  fields: [
    // ── Internal label (Studio only) ──────────────────────────────────
    defineField({
      name: "title",
      title: "Internal Label",
      type: "string",
      description: "Used only in Sanity Studio to identify this document.",
      initialValue: "Home Hero Carousel",
      validation: (Rule) => Rule.required(),
    }),

    // ── Slides ────────────────────────────────────────────────────────
    defineField({
      name: "slides",
      title: "Carousel Slides",
      type: "array",
      description:
        "Add between 3 and 5 activity cards. Each card shows an image, category badge, title, and optional date.",
      of: [
        {
          type: "object",
          name: "slide",
          title: "Slide",
          preview: {
            select: {
              title: "slideTitle",
              subtitle: "category",
              media: "image",
            },
          },
          fields: [
            // Slide image
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              description:
                "Recommended: 800×600px or larger, landscape orientation.",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),

            // Alt text for accessibility
            defineField({
              name: "imageAlt",
              title: "Image Alt Text",
              type: "string",
              description: "Describe the image for screen readers.",
              validation: (Rule) => Rule.required().max(120),
            }),

            // Category badge
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              description: "Short label shown as a pill badge on the card.",
              options: {
                list: [
                  { title: "Event",    value: "Event"    },
                  { title: "Project",  value: "Project"  },
                  { title: "Workshop", value: "Workshop" },
                  { title: "Research", value: "Research" },
                  { title: "News",     value: "News"     },
                  { title: "Seminar",  value: "Seminar"  },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            }),

            // Slide headline
            defineField({
              name: "slideTitle",
              title: "Title",
              type: "string",
              description: "Short title shown on the card (max 60 chars).",
              validation: (Rule) => Rule.required().max(60),
            }),

            // Optional date string
            defineField({
              name: "date",
              title: "Date (optional)",
              type: "string",
              description: "Displayed as a small label, e.g. 'May 2025'.",
            }),

            // Optional link
            defineField({
              name: "href",
              title: "Link URL (optional)",
              type: "string",
              description:
                "Internal path (e.g. /events/slug) or full external URL.",
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(5)
          .error("The hero carousel requires between 3 and 5 slides."),
    }),

    // ── Auto-play ─────────────────────────────────────────────────────
    defineField({
      name: "autoplay",
      title: "Auto-play",
      type: "boolean",
      description: "Automatically advance slides.",
      initialValue: true,
    }),

    defineField({
      name: "autoplayInterval",
      title: "Auto-play Interval (seconds)",
      type: "number",
      description: "How long each slide is visible. Default: 4s.",
      initialValue: 4,
      hidden: ({ document }) => !document?.autoplay,
      validation: (Rule) => Rule.min(2).max(10),
    }),
  ],

  preview: {
    select: { title: "title", slides: "slides" },
    prepare({ title, slides }) {
      const count = Array.isArray(slides) ? slides.length : 0;
      return {
        title: title ?? "Hero Carousel",
        subtitle: `${count} slide${count !== 1 ? "s" : ""}`,
      };
    },
  },
});