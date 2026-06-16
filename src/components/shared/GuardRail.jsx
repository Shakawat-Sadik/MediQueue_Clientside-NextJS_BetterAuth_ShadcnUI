"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import DoctorCardSkeleton from "../doctors/Doctor-X-ray";

export default function GuardRail({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    // Wait until session check is complete
    if (!isPending && !session) {
      // Save where the user was trying to go
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, router, pathname]);

  // Still checking session — show loading, DON'T redirect yet
  if (isPending) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-background flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full px-4">
          {[1, 2, 3].map((i) => (
            <DoctorCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Session loaded, no user — show nothing (redirect is happening)
  if (!session) {
    return null;
  }

  // Session loaded, user exists — show the protected content
  return children;
}