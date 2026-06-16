import Image from "next/image";
import {
  Clock,
  Award,
  CalendarCheck,
  ShieldCheck,
  Activity,
  HeartPulse,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const advantages = [
  {
    title: "24/7 Digital Access",
    desc: "Browse availability and book appointments anytime — no phone calls, no waiting for office hours.",
    icon: Clock,
  },
  {
    title: "Board Certified Specialists",
    desc: "Every doctor is credentialed from leading UK hospitals with verified track records.",
    icon: Award,
  },
  {
    title: "Centralised Health Dashboard",
    desc: "Track all bookings, prescriptions, and consultation history in one secure panel.",
    icon: CalendarCheck,
  },
  {
    title: "Bank-Grade Security",
    desc: "Patient data encrypted with AES-256 standards. Your privacy is non-negotiable.",
    icon: ShieldCheck,
  },
];

const microStats = [
  { value: "60s", label: "Avg. Booking Time" },
  { value: "98%", label: "Patient Satisfaction" },
  { value: "15+", label: "Specialties Covered" },
];

export default function WhyMediQueue() {
  return (
    <section className="py-16 sm:py-24 bg-background transition-colors duration-300 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute -top-40 -right-40 w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-100 h-100 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* ── Left Side: Text + Stats + Advantages ── */}
          <div className="flex flex-col gap-6">
            <span className="inline-block w-fit px-3 py-1.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-widest">
              Why MediQueue
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-tight tracking-tight">
              Healthcare Infrastructure Built Around
              <span className="text-primary"> Your Peace of Mind</span>
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
              We leverage modern digital coordination to simplify doctor
              consults. No long wait lines, no complicated phone tags. Book
              appointments within 60 seconds and track all history directly
              within your patient panel.
            </p>

            {/* Micro Stats Row */}
            <div className="flex items-center gap-6 sm:gap-8 py-4 border-y border-border">
              {microStats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black text-primary leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-medium mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Core Advantages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
              {advantages.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="group relative p-4 rounded-xl border border-border bg-card hover:bg-accent hover:border-primary/30 transition-all duration-300"
                  >
                    {/* Checkmark accent — appears on hover */}
                    <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex gap-3.5">
                      {/* Icon Container */}
                      <div className="w-10 h-10 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                        <IconComponent className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right Side: Image + Floating Badges ── */}
          <div className="relative">
            {/* Decorative glow behind image */}
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl opacity-50 pointer-events-none" />

            <div className="relative h-95 sm:h-115 rounded-2xl overflow-hidden shadow-2xl border border-border">
              <Image
                src="https://res.cloudinary.com/sadik-store/image/upload/v1781192446/Hero_photo_2_tjn6pf.jpg"
                alt="Medical consultation at MediQueue"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Gradient overlay at bottom for badge readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            {/* Floating Badge 1 — Vitals / Active Monitoring */}
            <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-70 backdrop-blur-xl bg-card/80 border border-border p-4 rounded-xl shadow-lg flex items-center gap-3.5 animate-[float_3s_ease-in-out_infinite]">
              <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-md">
                <Activity className="w-5 h-5 text-primary-foreground animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">
                  Active Patient Monitoring
                </h4>
                <p className="text-[11px] text-muted-foreground font-medium leading-snug mt-0.5">
                  Real-time vitals & schedule coordination
                </p>
              </div>
            </div>

            {/* Floating Badge 2 — Health Outcomes */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 backdrop-blur-xl bg-card/80 border border-border px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-[float_3s_ease-in-out_infinite_0.5s]">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xl font-black text-foreground leading-none">
                  98%
                </p>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">
                  Positive Outcomes
                </p>
              </div>
            </div>

            {/* Floating Badge 3 — Trusted Care */}
            <div className="hidden sm:flex absolute top-6 left-6 backdrop-blur-xl bg-card/80 border border-border p-2.5 rounded-full shadow-lg items-center gap-2 animate-[float_3s_ease-in-out_infinite_1s]">
              <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center">
                <HeartPulse className="w-4 h-4 text-rose-500" />
              </div>
              <span className="text-xs font-bold text-foreground pr-1.5">
                Trusted Care
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}