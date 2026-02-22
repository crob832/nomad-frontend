import { defineField, defineType } from "sanity";

export default defineType({
  name: "homeHero",
  title: "Home hero",
  type: "object",
  fields: [
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "titleLeading",
      title: "Title leading text",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "titleEmphasisOne",
      title: "Title emphasis one",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "titleMiddle",
      title: "Title middle text",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "titleEmphasisTwo",
      title: "Title emphasis two",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required()
    })
  ]
});
