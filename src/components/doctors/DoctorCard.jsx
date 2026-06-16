"use client";

import Image from "next/image";
import { Star, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { statusConfig } from "@/lib/badgeProvider";

export default function DoctorCard({ doctor, onViewDetails }) {
  const status = statusConfig[doctor.availabilityStatus];

  return (
    <Card className="group overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          loading="eager"
          src={doctor.image}
          alt={doctor.name}
          fill
          unoptimized
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Rating Badge */}
        <Badge className="absolute top-3 right-3 bg-card/90 text-foreground backdrop-blur-sm border-none gap-1 py-1 px-2.5 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-xs">{doctor.rating}</span>
          <span className="text-muted-foreground text-[10px]">
            ({doctor.reviews?.length || 0})
          </span>
        </Badge>

        {/* Availability Status */}
        {status && (
          <Badge className={`absolute top-3 left-3 ${status.className}`}>
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
        <div className="flex items-start gap-1.5 text-xs text-muted-foreground mb-1.5">
          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary/60" />
          <span className="line-clamp-1">
            {doctor.hospital}, {doctor.location}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {doctor.experience} experience
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="pt-0 pb-5 px-6 flex items-center justify-between">
        <div>
          <span className="text-lg font-black text-foreground">
            £{doctor.fee}
          </span>
          <span className="text-xs text-muted-foreground ml-1">/ session</span>
        </div>
        <Button
          size="sm"
          className="group/btn"
          onClick={() => onViewDetails(doctor.slug)}
        >
          View Details
          <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}