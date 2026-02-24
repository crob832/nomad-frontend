import "./globals.css";
import { getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: settings.siteTitle,
    description: settings.defaultSeo?.description,
    pathname: "/",
    defaultSeo: settings.defaultSeo
  });
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans text-ink bg-paper">
        {children}
      </body>
    </html>
  );
}
