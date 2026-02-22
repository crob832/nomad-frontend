import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "article",
  title: "Article",
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
      name: "authorName",
      title: "Author name",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "authorDegree",
      title: "Author degree",
      type: "string"
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Environment", value: "Environment" },
          { title: "Culture", value: "Culture" },
          { title: "Politics", value: "Politics" },
          { title: "Interview", value: "Interview" },
          { title: "Economy", value: "Economy" },
          { title: "Analysis", value: "Analysis" }
        ]
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "readTime",
      title: "Read time",
      type: "string",
      description: "Example: 8 min read"
    }),
    defineField({
      name: "abstract",
      title: "Abstract",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(20)
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true } })
      ],
      validation: (rule) => rule.required().min(1)
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: "issue",
      title: "Issue",
      type: "reference",
      to: [{ type: "issue" }],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "featured",
      title: "Featured article",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "authorName",
      media: "heroImage"
    }
  }
});
