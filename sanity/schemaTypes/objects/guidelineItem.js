import { defineField, defineType } from "sanity";

export default defineType({
  name: "guidelineItem",
  title: "Guideline item",
  type: "object",
  fields: [
    defineField({
      name: "key",
      title: "Icon key",
      type: "string",
      options: {
        list: [
          { title: "Length", value: "length" },
          { title: "Format", value: "format" },
          { title: "Details", value: "details" },
          { title: "Referencing", value: "referencing" }
        ],
        layout: "dropdown"
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "copy",
      title: "Copy",
      type: "string",
      validation: (rule) => rule.required()
    })
  ]
});
