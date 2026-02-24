export default function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-12">
      {subtitle && (
        <span className="text-xs font-bold tracking-[0.2em] text-ink-muted uppercase block mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-serif text-ink leading-tight">
        {children}
      </h2>
      <div className="h-1 w-24 bg-accent mt-6" />
    </div>
  );
}
