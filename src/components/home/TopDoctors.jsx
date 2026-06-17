"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_REMOTE_SERVER_URL : process.env.SERVER_URL || "http://localhost:5000";

const statusConfig = {
  available: {
    label: "Available Today",
    className:
      "bg-emerald-500 hover:bg-emerald-500 text-white border-emerald-500",
  },
  few_slots: {
    label: "Few Slots Left",
    className:
      "bg-amber-500 hover:bg-amber-500 text-white border-amber-500",
  },
  fully_booked: {
    label: "Fully Booked",
    className: "bg-red-500 hover:bg-red-500 text-white border-red-500",
  },
};

export default function TopDoctors({ res }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopDoctors = async () => {
      try {
        setLoading(true);
        
        if (!res.success) {
          throw new Error(res.message || "Failed to load doctors");
        }
        console.log("API Response for Top Doctors:", res);
        
        setDoctors(res.result);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching top doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopDoctors();
  }, [res]);

  const handleViewDetails = (slug) => {
    if (user) {
      router.push(`/doctors/${slug}`);
    } else {
      router.push(`/auth/login?redirect=/doctors/${slug}`);
    }
  };

  // ── Loading State ──
  if (loading) {
    return (
      <section className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-card border border-border overflow-hidden">
                <div className="aspect-4/3 bg-muted animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                  <div className="h-5 w-40 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                  <div className="flex justify-between pt-3">
                    <div className="h-6 w-16 bg-muted animate-pulse rounded" />
                    <div className="h-9 w-28 bg-muted animate-pulse rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Error State ──
  if (error) {
    return (
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-destructive font-semibold">
            Failed to load doctors. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  // ── Empty State ──
  if (doctors.length === 0) {
    return (
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground font-semibold">
            No doctors found.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-linear-190 from-background via-muted/40 via-60% to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-widest mb-4">
              Highly Rated
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-3">
              Consult Our Top-Rated Doctors
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Book online or in-person consultations with our highest-rated
              medical experts across the UK.
            </p>
          </div>
          <Link href="/appointments">
            <Button variant="outline" className="w-fit gap-2 shrink-0">
              View All Doctors
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map((doctor) => {
            const status = statusConfig[doctor.availabilityStatus];

            return (
              <Card
                key={doctor.id || doctor._id}
                className="group overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    unoptimized
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Rating Badge */}
                  <Badge className="absolute top-3 right-3 bg-card/90 text-foreground backdrop-blur-sm border-none gap-1 py-1 px-2.5 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-xs">{doctor.rating}</span>
                    <span className="text-muted-foreground text-[10px]">
                      ({doctor.reviews?.length || 0})
                    </span>
                  </Badge>

                  {/* Availability Badge */}
                  {status && (
                    <Badge
                      className={`absolute top-3 left-3 ${status.className}`}
                    >
                      {status.label}
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <CardContent className="pt-5 pb-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">
                    {doctor.specialty}
                  </p>
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {doctor.name}
                  </h3>
                  <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary/60" />
                    <span className="line-clamp-1">
                      {doctor.hospital}, {doctor.location}
                    </span>
                  </div>
                </CardContent>

                {/* Footer */}
                <CardFooter className="pt-0 pb-5 px-6 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-foreground">
                      £{doctor.fee}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      / session
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="group/btn"
                    onClick={() => handleViewDetails(doctor.slug)}
                  >
                    View Details
                    <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}