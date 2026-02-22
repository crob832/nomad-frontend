import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
      validation: (rule) => rule.max(70)
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(170)
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      initialValue: false
    })
  ]
});
