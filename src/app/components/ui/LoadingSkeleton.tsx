export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-[var(--border)] rounded w-3/4"></div>
      <div className="h-4 bg-[var(--border)] rounded w-1/2"></div>
      <div className="h-4 bg-[var(--border)] rounded w-5/6"></div>
    </div>
  );
}

export function ClientCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-[var(--border)] p-5 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-[var(--border)] rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-[var(--border)] rounded w-32 mb-2"></div>
          <div className="h-3 bg-[var(--border)] rounded w-24"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-[var(--border)] rounded w-full"></div>
        <div className="h-3 bg-[var(--border)] rounded w-2/3"></div>
      </div>
    </div>
  );
}

export function SessionCardSkeleton() {
  return (
    <div className="bg-[var(--warm)] rounded-lg p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[var(--border)] rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-[var(--border)] rounded w-24 mb-2"></div>
          <div className="h-3 bg-[var(--border)] rounded w-32"></div>
        </div>
        <div className="w-16 h-6 bg-[var(--border)] rounded"></div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header skeleton */}
      <div className="animate-pulse">
        <div className="h-8 bg-[var(--border)] rounded w-64 mb-2"></div>
        <div className="h-4 bg-[var(--border)] rounded w-48"></div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-[var(--border)] p-5 animate-pulse">
            <div className="h-8 bg-[var(--border)] rounded w-16 mb-2"></div>
            <div className="h-4 bg-[var(--border)] rounded w-24"></div>
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="bg-white rounded-xl border border-[var(--border)] p-6 animate-pulse">
        <div className="h-6 bg-[var(--border)] rounded w-48 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <SessionCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
