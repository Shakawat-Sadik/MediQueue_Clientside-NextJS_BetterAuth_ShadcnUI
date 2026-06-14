"use client";

import { Star, Quote } from "lucide-react";

const testimonies = [
  {
    author: "Emma Thompson",
    comment:
      "Dr. Mitchell detected my heart condition early when others missed it. MediQueue made booking effortless — I was in her office the next day.",
    role: "Cardiology Patient",
    doctor: "Dr. Sarah Mitchell",
    stars: 5,
  },
  {
    author: "Carlos Rivera",
    comment:
      "My hip replacement was flawless. The platform is so intuitive — I found Dr. Vega and booked my consultation in under two minutes.",
    role: "Orthopedic Patient",
    doctor: "Dr. Alejandro Vega",
    stars: 5,
  },
  {
    author: "Amara Diallo",
    comment:
      "After years of wearing glasses, Dr. Al-Sayed gave me 20/20 vision. The whole process from booking to surgery was completely stress-free.",
    role: "Ophthalmology Patient",
    doctor: "Dr. Fatima Al-Sayed",
    stars: 5,
  },
];

export default function Reviews() {
  return (
    <section className="py-20 bg-background border-t border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          {/* <span className="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-widest mb-4">
            Patient Stories
          </span> */}
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Trusted by Thousands
          </h2>
          <p className="mt-4 text-muted-foreground text-base leading-relaxed">
            Real experiences from patients who found the right care through
            MediQueue.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonies.map((test, idx) => (
            <div
              key={idx}
              className="group relative bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary/15 mb-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: test.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-sm text-foreground leading-relaxed grow mb-6">
                &ldquo;{test.comment}&rdquo;
              </p>

              {/* Footer */}
              <div className="pt-4 border-t border-border flex items-center gap-3">
                {/* Initial Avatar */}
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-black text-primary shrink-0">
                  {test.author.charAt(0)}
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-foreground">
                    {test.author}
                  </h4>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    {test.role}
                  </p>
                </div>

                {/* Doctor badge — right aligned */}
                <span className="ml-auto text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg hidden sm:block">
                  {test.doctor.split(" ").slice(-1)[0]}
                  {/* Shows last name only: "Mitchell", "Vega", "Al-Sayed" */}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}