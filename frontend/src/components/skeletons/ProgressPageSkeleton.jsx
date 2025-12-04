// src/components/skeletons/ProgressPageSkeleton.jsx
import Skeleton from "../Skeleton";

const SkeletonCard = ({ children }) => (
  <div className="rounded-lg bg-slate-800 p-6">
    <Skeleton className="mb-4 h-6 w-1/2" />
    {children}
  </div>
);

const ProgressPageSkeleton = () => {
  return (
    <main className="flex-1 p-6 md:p-10">
      <Skeleton className="mb-8 h-9 w-64" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SkeletonCard>
          <Skeleton className="h-64 w-full" />
        </SkeletonCard>
        <SkeletonCard>
          <Skeleton className="h-64 w-full" />
        </SkeletonCard>

        <div className="lg:col-span-2">
          <SkeletonCard>
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <Skeleton className="h-16 w-48" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </SkeletonCard>
        </div>

        <div className="lg:col-span-2">
          <SkeletonCard>
            <div className="grid grid-cols-2 gap-8 py-4 sm:grid-cols-4">
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-28 w-full" />
            </div>
          </SkeletonCard>
        </div>
      </div>
    </main>
  );
};

export default ProgressPageSkeleton;
