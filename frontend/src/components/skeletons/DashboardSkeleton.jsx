// src/components/skeletons/DashboardSkeleton.jsx
import Skeleton from "../Skeleton";

const DashboardSkeleton = () => {
  return (
    <main className="flex-1 p-6 md:p-10">
      <Skeleton className="mb-8 h-9 w-48" />

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>

      <div className="mb-8 rounded-lg bg-slate-800 p-6">
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-7 w-1/3" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <Skeleton className="mt-6 h-12 w-full" />
      </div>

      <div className="rounded-lg bg-slate-800 p-6">
        <Skeleton className="mb-6 h-7 w-1/2" />
        <div className="grid grid-cols-7 gap-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DashboardSkeleton;
