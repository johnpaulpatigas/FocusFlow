// src/components/skeletons/FocusPageSkeleton.jsx
import Skeleton from "../Skeleton";

const FocusPageSkeleton = () => {
  return (
    <main className="flex-1 p-6 md:p-10">
      <Skeleton className="mb-8 h-9 w-48" />

      <div className="mx-auto w-full max-w-lg rounded-lg bg-slate-800 p-8">
        <Skeleton className="mb-6 h-7 w-3/4" />
        <Skeleton className="h-12 w-full" />
      </div>
    </main>
  );
};

export default FocusPageSkeleton;
