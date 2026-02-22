export default function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-12">
      {subtitle && (
        <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase block mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight">
        {children}
      </h2>
      <div className="h-1 w-24 bg-orange-700 mt-6" />
    </div>
  );
}
