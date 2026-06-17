"use client";

import Link from "next/link";
import {
  ArrowRight,
  HeartPulse,
  Brain,
  Stethoscope,
  Baby,
  Eye,
  Wind,
} from "lucide-react";

const specialties = [
  {
    name: "Cardiology",
    desc: "Heart diseases & preventive care",
    slug: "Cardiologist",
    icon: HeartPulse,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    name: "Neurology",
    desc: "Stroke, epilepsy & brain disorders",
    slug: "Neurologist",
    icon: Brain,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
  },
  {
    name: "Orthopedics",
    desc: "Joint replacement & sports injuries",
    slug: "Orthopedic Surgeon",
    icon: Stethoscope, // Swapped to Stethoscope to avoid Lucide version issues
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    name: "Pediatrics",
    desc: "Child health & development",
    slug: "Pediatrician",
    icon: Baby,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    name: "Ophthalmology",
    desc: "Vision correction & eye care",
    slug: "Ophthalmologist",
    icon: Eye,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    name: "Pulmonology",
    desc: "Asthma, COPD & respiratory health",
    slug: "Pulmonologist",
    icon: Wind,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
  },
];

export default function Specialties() {
  return (
    <section className="py-20 bg-background border-t border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-widest mb-4">
              Browse by Specialty
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Explore Clinical Divisions
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Expert care across every field. Choose a specialty to find the right doctor for your needs.
            </p>
          </div>
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline underline-offset-4 transition-all duration-200"
          >
            See All Specialists <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {specialties.map((spec) => {
            const Icon = spec.icon;
            return (
              <Link
                key={spec.name}
                href={`/doctors?specialty=${spec.slug}`}
                className="group flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card hover:bg-accent hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-2xl ${spec.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-7 w-7 ${spec.color}`} />
                </div>

                {/* Text Content */}
                <h3 className="text-sm font-bold text-foreground mb-1">
                  {spec.name}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-tight hidden sm:block">
                  {spec.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}