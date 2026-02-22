import { defineField, defineType } from "sanity";

export default defineType({
  name: "pageAbout",
  title: "Page: About",
  type: "document",
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
      name: "boardYearLabel",
      title: "Board heading",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo"
    })
  ],
  preview: {
    prepare() {
      return {
        title: "About Page"
      };
    }
  }
});
