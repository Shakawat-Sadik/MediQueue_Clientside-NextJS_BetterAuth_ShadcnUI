"use client";

import { Suspense } from "react";
import DoctorCardSkeleton from "./Doctor-X-ray";
import AllDoctorsContent from "./DoctorsContent";

// ── Main Component ──


// ── Export with Suspense boundary ──
export default function AllDoctors() {
  return (
    <Suspense
      fallback={
        <section className="pt-24 pb-16 min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                <DoctorCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      }
    >
      <AllDoctorsContent />
    </Suspense>
  );
}