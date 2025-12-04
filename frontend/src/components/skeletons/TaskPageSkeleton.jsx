// src/components/skeletons/TaskPageSkeleton.jsx
import Skeleton from "../Skeleton";

const SkeletonTaskRow = () => (
  <div className="grid grid-cols-12 items-center gap-4 border-b border-slate-700 p-4 last:border-b-0">
    <div className="col-span-12 flex items-center gap-4 md:col-span-4">
      <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
    <div className="col-span-6 flex items-center gap-2 md:col-span-2">
      <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
      <Skeleton className="h-4 w-12" />
    </div>
    <div className="col-span-6 md:col-span-2">
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
    <div className="col-span-6 text-slate-400 md:col-span-1">
      <Skeleton className="h-4 w-full" />
    </div>
    <div className="col-span-5 text-slate-400 md:col-span-1">
      <Skeleton className="h-4 w-full" />
    </div>
    <div className="col-span-1 flex items-center justify-end gap-2 text-right">
      <Skeleton className="h-5 w-5 rounded-full" />
      <Skeleton className="h-5 w-5 rounded-full" />
    </div>
  </div>
);

const TaskPageSkeleton = () => {
  return (
    <main className="flex-1 p-6 md:p-10">
      <div className="mb-8 flex flex-col items-start justify-between sm:flex-row">
        <Skeleton className="mb-4 h-9 w-64 sm:mb-0" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="rounded-lg bg-slate-800 p-4 sm:p-6">
        <div className="mb-2 flex flex-col items-center justify-between gap-4 md:flex-row">
          <Skeleton className="h-7 w-32 self-start md:self-center" />
          <Skeleton className="h-10 w-full md:w-64" />
        </div>

        <div className="mb-6 flex space-x-4 border-b border-slate-700">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>

        <div>
          <div className="hidden md:grid">
            <Skeleton className="mb-1 h-10 w-full" />
          </div>
          {[...Array(5)].map((_, i) => (
            <SkeletonTaskRow key={i} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default TaskPageSkeleton;
