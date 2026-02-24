import { PortableText } from "@portabletext/react";

const components = {
  block: {
    h2: ({ children }) => <h2 className="font-serif text-3xl text-ink mt-12 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="font-serif text-2xl text-ink mt-10 mb-4">{children}</h3>,
    normal: ({ children }) => <p className="text-ink-soft leading-relaxed mb-6">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand pl-5 italic text-ink-soft my-8">{children}</blockquote>
    )
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 text-ink-soft mb-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 text-ink-soft mb-6 space-y-2">{children}</ol>
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer noopener" : undefined}
          className="text-brand underline underline-offset-4"
        >
          {children}
        </a>
      );
    }
  }
};

export default function PortableTextContent({ value }) {
  if (!value) {
    return null;
  }

  if (Array.isArray(value) && value.length > 0 && typeof value[0] === "string") {
    return (
      <div>
        {value.map((paragraph, index) => (
          <p key={index} className="text-ink-soft leading-relaxed mb-6">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  return <PortableText value={value} components={components} />;
}
