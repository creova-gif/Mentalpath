export function Placeholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-[60px] text-center">
      <div className="font-[var(--font-display)] text-[22px] text-[var(--ink)] mb-2">{title}</div>
      <div className="text-sm text-[var(--ink-muted)]">{description}</div>
    </div>
  );
}
