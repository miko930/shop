export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="skeleton-pulse h-36 sm:h-44" />
      <div className="p-3 space-y-2">
        <div className="skeleton-pulse h-3.5 w-3/4 rounded-md" />
        <div className="skeleton-pulse h-3 w-1/2 rounded-md" />
        <div className="flex items-center justify-between pt-1">
          <div className="skeleton-pulse h-4 w-20 rounded-md" />
          <div className="skeleton-pulse h-7 w-7 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
