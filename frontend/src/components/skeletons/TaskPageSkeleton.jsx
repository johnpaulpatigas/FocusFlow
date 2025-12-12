// src/components/skeletons/TaskPageSkeleton.jsx
import Skeleton from "../Skeleton";

const SkeletonTaskRow = () => (
  <div className="grid grid-cols-12 items-center gap-4 border-b border-slate-700 p-4 last:border-b-0">
    <div className="col-span-12 flex items-center gap-4 md:col-span-4">
      <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
    <div className="col-span-6 flex items-center gap-2 text-slate-400 md:col-span-2">
      <Skeleton className="h-4 w-4 shrink-0" />
      <Skeleton className="h-4 w-12" />
    </div>
    <div className="col-span-6 md:col-span-2">
      <Skeleton className="h-7 w-20 rounded-full" />
    </div>
    <div className="col-span-6 text-slate-400 md:col-span-1">
      <Skeleton className="h-4 w-full" />
    </div>
    <div className="col-span-5 text-slate-400 md:col-span-1">
      <Skeleton className="h-4 w-full" />
    </div>
    <div className="col-span-1 flex items-center justify-end gap-2 text-right">
      <Skeleton className="h-5 w-5" />
      <Skeleton className="h-5 w-5" />
    </div>
  </div>
);

const TaskPageSkeleton = () => {
  return (
    <main className="flex-1 overflow-y-auto p-6 text-white md:p-10">
      <div className="mb-8 flex flex-col items-start justify-between sm:flex-row">
        <Skeleton className="mb-4 h-9 w-[280px] sm:mb-0" />{" "}
        <div className="flex gap-4">
          <Skeleton className="h-10 w-[110px]" />{" "}
          <Skeleton className="h-10 w-[125px]" />{" "}
        </div>
      </div>

      <div className="rounded-lg bg-slate-800 p-4 sm:p-6">
        <div className="mb-2 flex flex-col items-center justify-between gap-4 md:flex-row">
          <Skeleton className="h-7 w-28 self-start md:self-center" />{" "}
          <div className="flex w-full items-center gap-4 md:w-auto">
            <Skeleton className="h-5 w-20 shrink-0" />
            <Skeleton className="h-10 w-48 grow" />
          </div>
        </div>

        <div className="mb-6 flex space-x-2 border-b border-slate-700 sm:space-x-4">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-28" />
        </div>

        <div>
          <div className="hidden grid-cols-12 gap-4 border-b-2 border-slate-700 p-4 font-semibold text-slate-400 md:grid">
            <div className="col-span-4">
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="col-span-2">
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="col-span-2">
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="col-span-1">
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="col-span-1">
              <Skeleton className="h-4 w-14" />
            </div>
            <div className="col-span-2"></div>
          </div>

          <div>
            {[...Array(5)].map((_, i) => (
              <SkeletonTaskRow key={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default TaskPageSkeleton;
