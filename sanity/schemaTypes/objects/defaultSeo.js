import { defineField, defineType } from "sanity";

export default defineType({
  name: "defaultSeo",
  title: "Default SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Default title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Default description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "ogImage",
      title: "Default Open Graph image",
      type: "image",
      options: {
        hotspot: true
      }
    })
  ]
});
