import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "siteTagline",
      title: "Site tagline",
      type: "string"
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      validation: (rule) => rule.required().email()
    }),
    defineField({
      name: "submissionEmail",
      title: "Submission email",
      type: "string",
      validation: (rule) => rule.required().email()
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url"
    }),
    defineField({
      name: "linkedInUrl",
      title: "LinkedIn URL",
      type: "url"
    }),
    defineField({
      name: "footerSummary",
      title: "Footer summary",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "homeHero",
      title: "Home hero",
      type: "homeHero",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "mission",
      title: "Mission section",
      type: "mission",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "defaultSeo",
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings"
      };
    }
  }
});
