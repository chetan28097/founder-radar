import type { FC } from 'react';

interface SkeletonCardProps {
  count?: number;
}

export const SkeletonCard: FC<SkeletonCardProps> = () => {
  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-pulse">
      {/* Top Header Row Skeleton */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-2.5 flex-1">
          <div className="flex items-center gap-3">
            <div className="h-6 w-44 bg-slate-200 rounded-md" />
            <div className="h-5 w-24 bg-slate-100 rounded-full" />
            <div className="h-5 w-28 bg-emerald-50 rounded-full" />
          </div>
          <div className="h-4 w-64 bg-slate-200 rounded" />
          <div className="h-3 w-48 bg-slate-100 rounded" />
        </div>

        <div className="flex md:flex-col items-baseline md:items-end justify-between gap-1">
          <div className="h-9 w-16 bg-indigo-100 rounded-lg" />
          <div className="h-3 w-14 bg-slate-200 rounded" />
        </div>
      </div>

      {/* Sector Hypothesis Box Skeleton */}
      <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
        <div className="h-4 w-56 bg-slate-200 rounded" />
        <div className="space-y-1.5 pt-1">
          <div className="h-3 w-full bg-slate-200 rounded" />
          <div className="h-3 w-4/5 bg-slate-200 rounded" />
          <div className="h-3 w-2/3 bg-slate-200 rounded" />
        </div>
      </div>

      {/* Score Breakdown Drawer Skeleton Preview */}
      <div className="mt-3 py-2 px-3 bg-slate-50/70 border border-dashed border-slate-200 rounded-xl flex items-center justify-between">
        <div className="h-3.5 w-36 bg-slate-200 rounded" />
        <div className="h-4 w-4 bg-slate-200 rounded-full" />
      </div>

      {/* Outreach Message Box Skeleton */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="h-3 w-40 bg-slate-200 rounded" />
          <div className="h-3 w-20 bg-slate-100 rounded" />
        </div>
        <div className="h-20 w-full bg-slate-100 rounded-xl border border-slate-200" />
      </div>
    </article>
  );
};
