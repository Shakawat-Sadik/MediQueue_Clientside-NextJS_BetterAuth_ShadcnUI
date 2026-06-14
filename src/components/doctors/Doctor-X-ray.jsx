"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function DoctorCardSkeleton() {
  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-24" />
        <Separator />
        <div className="flex justify-between pt-1">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}