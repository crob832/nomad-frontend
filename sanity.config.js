import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./sanity/schemaTypes";
import { deskStructure, singletonTypes } from "./sanity/deskStructure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Nomad CMS",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    deskTool({
      structure: deskStructure
    })
  ],
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type !== "global") {
        return prev;
      }

      return prev.filter((templateItem) => !singletonTypes.has(templateItem.templateId));
    }
  },
  schema: {
    types: schemaTypes
  }
});
