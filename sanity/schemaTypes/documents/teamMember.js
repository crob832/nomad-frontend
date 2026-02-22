import { defineField, defineType } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "major",
      title: "Major",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "headshot",
      title: "Headshot",
      type: "image",
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      validation: (rule) => rule.integer().min(1)
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "headshot"
    }
  }
});
