import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ArticleCard({ article }) {
  const href = article?.href || (article?.slug ? `/articles/${article.slug}` : "/issues");
  const openInNewTab = Boolean(article?.openInNewTab);
  const Wrapper = openInNewTab ? "a" : Link;
  const wrapperProps = openInNewTab
    ? { href, target: "_blank", rel: "noreferrer noopener", className: "block" }
    : { href, className: "block" };

  return (
    <article className="group border-t border-border-default py-8 hover:bg-paper-alt transition-colors duration-300 px-4 -mx-4">
      <Wrapper {...wrapperProps}>
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
          <span className="text-xs font-bold tracking-wider text-brand uppercase mb-2 md:mb-0">
            {article.category} | {article.issue}
          </span>
          {article.readTime && (
            <span className="text-ink-subtle text-xs font-mono">{article.readTime}</span>
          )}
        </div>
        <h3 className="text-2xl font-serif text-ink group-hover:text-brand transition-colors mb-3">
          {article.title}
        </h3>
        {article.abstract && (
          <p className="text-ink-muted font-light leading-relaxed mb-4 line-clamp-2">
            {article.abstract}
          </p>
        )}
        <div className="flex items-center text-sm text-ink-muted font-medium">
          <span>{article.author}</span>
          {article.degree && (
            <>
              <span className="mx-2 text-ink-subtle">|</span>
              <span className="italic font-light text-ink-subtle">{article.degree}</span>
            </>
          )}
        </div>
        <div className="mt-4 flex items-center text-xs uppercase tracking-widest text-brand font-bold">
          {openInNewTab ? "Open issue PDF" : "Read more"}
          <ChevronRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
        </div>
      </Wrapper>
    </article>
  );
}

