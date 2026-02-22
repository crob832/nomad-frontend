export const singletonTypes = new Set(["siteSettings", "pageAbout", "pageContribute"]);

export const deskStructure = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.editor().id("siteSettings").schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("About Page")
        .id("pageAbout")
        .child(S.editor().id("pageAbout").schemaType("pageAbout").documentId("pageAbout")),
      S.listItem()
        .title("Contribute Page")
        .id("pageContribute")
        .child(S.editor().id("pageContribute").schemaType("pageContribute").documentId("pageContribute")),
      ...S.documentTypeListItems().filter((listItem) => !singletonTypes.has(listItem.getId()))
    ]);
