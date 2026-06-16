import GuardRail from "@/components/shared/GuardRail";
import Link from "next/link";
import { CalendarCheck, UserCircle } from "lucide-react";

export const metadata = {
  title: "Dashboard | MediQueue",
  description: "Manage your appointments and profile.",
};

export default function DashboardLayout({ children }) {
  return (
    <GuardRail>
      <section className="pt-24 pb-16 min-h-screen bg-muted/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-foreground">
                Dashboard
              </h1>
              <p className="text-muted-foreground text-sm">
                Manage your appointments and profile.
              </p>
            </div>
            {/* Tabs / Navigation */}
            <div className="flex gap-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <CalendarCheck className="h-4 w-4" /> My Bookings
              </Link>
              <Link
                href="/dashboard/profile"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border border-border bg-card text-foreground hover:bg-accent transition-colors"
              >
                <UserCircle className="h-4 w-4" /> My Profile
              </Link>
            </div>
          </div>
          
          {/* Page Content */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            {children}
          </div>
        </div>
      </section>
    </GuardRail>
  );
}