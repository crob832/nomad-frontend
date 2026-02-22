import { defineField, defineType } from "sanity";

export default defineType({
  name: "mission",
  title: "Mission section",
  type: "object",
  fields: [
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      validation: (rule) => rule.required().min(1)
    }),
    defineField({
      name: "archiveCaption",
      title: "Archive caption",
      type: "string"
    }),
    defineField({
      name: "archiveImage",
      title: "Archive image",
      type: "image",
      options: {
        hotspot: true
      }
    })
  ]
});
