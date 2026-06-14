import { Stethoscope, UserCheck, Users, Star } from "lucide-react";

const stats = [
  {
    label: "Active Certified Doctors",
    value: "150+",
    icon: Stethoscope,
  },
  {
    label: "Successful Consultations",
    value: "24,000+",
    icon: UserCheck,
  },
  {
    label: "Satisfied Active Patients",
    value: "12,000+",
    icon: Users,
  },
  {
    label: "Average Patient Rating",
    value: "4.9/5.0",
    icon: Star,
    isStar: true,
  },
];

export default function Stats() {
  return (
    <section className="relative z-20 -mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Floating Card Wrapper */}
      <div className="bg-card border border-border rounded-2xl shadow-xl p-6 sm:p-8 transition-colors duration-300">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-4 ${
                  idx > 0 ? "lg:border-l lg:border-border lg:pl-8" : ""
                }`}
              >
                {/* Icon Container */}
                <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                  <Icon
                    className={`w-6 h-6 ${
                      stat.isStar
                        ? "text-amber-500 fill-amber-500"
                        : "text-primary"
                    }`}
                  />
                </div>

                {/* Stat Text */}
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-muted-foreground leading-tight">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}