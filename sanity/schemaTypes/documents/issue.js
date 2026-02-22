import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "issue",
  title: "Issue",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "volume",
      title: "Volume number",
      type: "number",
      validation: (rule) => rule.required().integer().positive()
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: "coverTint",
      title: "Fallback cover class",
      type: "string",
      description: "Tailwind class used only when no cover image is available.",
      initialValue: "bg-stone-800"
    }),
    defineField({
      name: "pdfFile",
      title: "Issue PDF",
      type: "file",
      options: {
        accept: ".pdf"
      }
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "featured",
      title: "Featured issue",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo"
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "year",
      media: "coverImage"
    }
  }
});
