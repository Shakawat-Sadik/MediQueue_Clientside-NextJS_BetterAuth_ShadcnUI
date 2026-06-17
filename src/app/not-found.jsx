"use client";

import Link from "next/link";
import { Home, ArrowLeft, Stethoscope } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-20 sm:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-glow" />

        <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-chart-1/10 blur-3xl animate-float-slow" />

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[140px]" />
      </div>

      {/* Giant 404 */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="select-none text-[10rem] font-black leading-none text-primary/5 sm:text-[16rem]">
          404
        </span>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-xl animate-fade-up rounded-3xl border border-border bg-card/80 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-[1.01] sm:p-10">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 animate-pulse-slow items-center justify-center rounded-full border border-primary/20 bg-accent">
          <Stethoscope className="h-10 w-10 animate-float text-primary" />
        </div>

        {/* Badge */}
        <div className="mb-4 flex justify-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
            Error 404
          </span>
        </div>

        {/* Heading */}
        <h1 className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
          The clinic, doctor profile, or page you&apos;re looking for doesn&apos;t
          exist, may have been moved, or the URL might be incorrect.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-primary
              px-5
              py-3
              font-semibold
              text-primary-foreground
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-lg
            "
          >
            <Home className="h-4 w-4 transition-transform group-hover:scale-110" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-border
              bg-background
              px-5
              py-3
              font-semibold
              text-foreground
              transition-all
              duration-300
              hover:scale-105
              hover:bg-accent
            "
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Go Back
          </button>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            MediQueue • Your Trusted Healthcare Companion
          </p>
        </div>
      </div>
    </section>
  );
}
