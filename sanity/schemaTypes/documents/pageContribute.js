import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "pageContribute",
  title: "Page: Contribute",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "intro",
      title: "Intro copy",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "sectionHeading",
      title: "Section heading",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "sectionCopy",
      title: "Section copy",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "guidelinesHeading",
      title: "Guidelines heading",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "guidelines",
      title: "Guidelines",
      type: "array",
      of: [defineArrayMember({ type: "guidelineItem" })],
      validation: (rule) => rule.required().min(1)
    }),
    defineField({
      name: "processHeading",
      title: "Process heading",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "processCopy",
      title: "Process copy",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "submissionSubjectTemplate",
      title: "Submission subject template",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "submissionEmail",
      title: "Submission email",
      type: "string",
      validation: (rule) => rule.required().email()
    }),
    defineField({
      name: "templateFile",
      title: "Template file",
      type: "file"
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
        title: "Contribute Page"
      };
    }
  }
});
