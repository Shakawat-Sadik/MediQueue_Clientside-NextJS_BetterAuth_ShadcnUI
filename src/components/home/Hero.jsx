"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Zap, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const slides = [
  {
    tagIcon: "clock",
    tagline: "Tired of Waiting?",
    title: "Your Health Can't",
    titleAccent: "Wait in Line",
    subtitle: "Neither Should You",
    description:
      "Long queues, delayed appointments, and weeks of uncertainty. The traditional system wasn't built for urgency — but we were.",
    primaryCTA: "Skip the Wait",
    primaryLink: "/appointments",
    secondaryCTA: "See How It Works",
    secondaryLink: "/#how-it-works",
    // Upload: patients sitting idly in a hospital waiting room / corridor
    image:
      "https://res.cloudinary.com/sadik-store/image/upload/v1781195159/hero_image_2_buqeco.jpg",
  },
  {
    tagIcon: "zap",
    tagline: "Care Without Delay",
    title: "Specialist Care,",
    titleAccent: "On Your Schedule",
    subtitle: "From Booking to Consultation in Minutes",
    description:
      "Browse verified specialists, choose your time, and connect directly. No queues, no referrals, no waiting weeks for an answer.",
    primaryCTA: "Book Appointment",
    primaryLink: "/appointments",
    secondaryCTA: "My Dashboard",
    secondaryLink: "/dashboard",
    // Upload: doctor consulting a patient one-on-one in a modern clinic
    image:
      "https://res.cloudinary.com/sadik-store/image/upload/v1781195162/hero_image_3_oflxhw.jpg",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-137.5 sm:h-150 lg:h-162.5 bg-accent/30 dark:bg-accent/10 overflow-hidden border-b border-border transition-colors duration-300">
      {/* ── Slider Viewport ── */}
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="flex w-[200%] h-full will-change-transform"
          style={{
            transform: `translate3d(-${currentSlide * 50}%, 0, 0)`,
            transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;

            return (
              <div
                key={index}
                className="w-1/2 h-full shrink-0 relative flex items-center"
              >
                {/* Gradient overlay — protects text readability */}
                <div className="absolute inset-0 bg-linear-to-r from-background via-background/95 to-transparent z-10" />

                {/* Background image — right-aligned, Ken Burns zoom */}
                <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full opacity-15 lg:opacity-100 overflow-hidden">
                  <Image
                    src={slide.image}
                    fill
                    alt={slide.titleAccent}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                    style={{
                      transform: isActive ? "scale(1.08)" : "scale(1)",
                      transition:
                        "transform 5000ms cubic-bezier(0.25, 1, 0.5, 1)",
                      willChange: "transform",
                    }}
                    priority={index === 0}
                  />
                </div>

                {/* ── Content ── */}
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-20">
                  <div className="max-w-2xl text-left flex flex-col gap-4">
                    {/* Tagline badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary w-fit uppercase tracking-widest border border-primary/20">
                      {slide.tagIcon === "clock" ? (
                        <Clock className="h-3 w-3" />
                      ) : (
                        <Zap className="h-3 w-3" />
                      )}
                      {slide.tagline}
                    </span>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight text-foreground">
                      {slide.title}
                      <span className="block text-primary mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold">
                        {slide.titleAccent}
                      </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-sm sm:text-base font-semibold text-foreground/70">
                      {slide.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-muted-foreground font-medium leading-relaxed max-w-xl">
                      {slide.description}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-3.5 mt-2">
                      <Link
                        href={slide.primaryLink}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-sm font-bold transition-colors duration-200 shadow-sm"
                      >
                        {slide.primaryCTA}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={slide.secondaryLink}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-foreground border border-border hover:bg-accent rounded-xl text-sm font-bold transition-colors duration-200"
                      >
                        {slide.secondaryCTA}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Slide Indicators ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <Button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
              idx === currentSlide
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}