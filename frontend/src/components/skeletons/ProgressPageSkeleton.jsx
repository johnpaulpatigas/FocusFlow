// src/components/skeletons/ProgressPageSkeleton.jsx
import Skeleton from "../Skeleton";

const SkeletonCard = ({ children, className = "" }) => (
  <div className={`rounded-lg bg-slate-800 p-6 ${className}`}>
    <Skeleton className="mb-6 h-6 w-1/2" />
    {children}
  </div>
);

const ProgressPageSkeleton = () => {
  return (
    <main className="flex-1 p-6 md:p-10">
      <div className="mb-8 flex items-center justify-between">
        <Skeleton className="h-9 w-1/2 max-w-xs" />
        <Skeleton className="h-10 w-36" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SkeletonCard>
          <div className="flex h-64 items-end justify-around gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="flex w-full flex-col items-center justify-end gap-2"
              >
                <Skeleton className="h-4 w-1/2" />
                <Skeleton
                  className="w-2/3 rounded-t-sm"
                  style={{ height: `${Math.random() * 80 + 10}%` }}
                />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        </SkeletonCard>
        <SkeletonCard>
          <div className="flex h-64">
            <div className="flex h-full flex-col justify-between pr-2">
              <Skeleton className="h-3 w-4" />
              <Skeleton className="h-3 w-3" />
              <Skeleton className="h-3 w-2" />
            </div>
            <div className="flex grow flex-col border-l border-slate-700">
              <div className="relative grow">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="flex justify-around border-t border-slate-700 pt-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-3 w-8" />
                ))}
              </div>
            </div>
          </div>
        </SkeletonCard>

        <div className="lg:col-span-2">
          <SkeletonCard>
            <div className="flex flex-col items-center gap-2 py-8">
              <Skeleton className="h-16 w-48" />
              <Skeleton className="h-4 w-3/4 max-w-md" />
            </div>
          </SkeletonCard>
        </div>

        <div className="lg:col-span-2">
          <SkeletonCard>
            <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-4 sm:gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton className="h-16 w-16 sm:h-20 sm:w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </SkeletonCard>
        </div>
      </div>
    </main>
  );
};

export default ProgressPageSkeleton;
