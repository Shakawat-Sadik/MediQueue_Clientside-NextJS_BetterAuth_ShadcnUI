"use client";

import Link from "next/link";
import { ArrowRight, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-0 w-full h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-64 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-primary/75 rounded-3xl p-8 sm:p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
          {/* Dot grid pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(15,23,43,0.15)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-foreground text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              <CalendarPlus className="h-4 w-4" />
              Start Today
            </div>

            {/* Heading — ties back to the Hero narrative */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary-foreground tracking-tight leading-tight mb-4">
              Stop Waiting.
              <br />
              Start Healing.
            </h2>

            {/* Description */}
            <p className="text-primary-foreground/80 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Join thousands of patients who have taken control of their
              healthcare journey. Book your first appointment in under a minute.
            </p>

            {/* Buttons using Shadcn */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/doctors">
                <Button
                  size="lg"
                  className="bg-foreground/30 text-card dark:text-accent-foreground dark:hover:text-primary dark:hover:bg-white/90 font-bold shadow-lg hover:scale-105 group cursor-pointer"
                >
                  Book Appointment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-foreground bg-accent hover:bg-white/10 hover:text-primary-foreground font-bold shadow-lg hover:scale-105 cursor-pointer"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}