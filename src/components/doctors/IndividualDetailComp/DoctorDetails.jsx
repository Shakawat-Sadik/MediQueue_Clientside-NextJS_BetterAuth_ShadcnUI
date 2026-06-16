"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Star,
  MapPin,
  Briefcase,
  Hospital,
  Clock,
  ArrowLeft,
  CalendarPlus,
  HeartPulse,
  MessageSquare,
  Banknote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { statusConfig } from "@/lib/badgeProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export default function DoctorDetails({ doctor }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBookAppointment = () => {
    if (user) {
      router.push(`/book/${doctor.slug}`);
    } else {
      router.push(`/auth/login?redirect=/book/${doctor.slug}`);
    }
  };

  if (!doctor) {
    return (
      <section className="pt-24 pb-16 min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive font-semibold">Doctor is unavailable.</p>
      </section>
    );
  }

  const status = statusConfig[doctor.availabilityStatus];
  console.log(status);

  return (
    <section className="pt-24 pb-16 min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Back Button ── */}
        <Button
          variant="ghost"
          className="mb-6 text-muted-foreground hover:text-foreground gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Doctors
        </Button>

        {/* ── Main Profile Card ── */}
        <Card className="overflow-hidden border-border shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Image Section */}
            <div className="relative h-72 md:h-auto overflow-hidden bg-muted">
              <Image
                loading="eager"
                src={doctor.image}
                alt={doctor.name}
                fill
                unoptimized
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>

            {/* Content Section */}
            <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <Badge
                    variant="secondary"
                    className="uppercase tracking-widest text-[10px] font-bold"
                  >
                    {doctor.specialty}
                  </Badge>
                  <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-none gap-1">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    {doctor.rating} ({doctor.reviews?.length || 0})
                  </Badge>
                </div>

                <h1 className="font-heading font-black text-3xl md:text-4xl text-foreground tracking-tight mb-4">
                  {doctor.name}
                </h1>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {doctor.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
                <div className="text-2xl font-black text-foreground">
                  £{doctor.fee}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    / session
                  </span>
                </div>
              <Tooltip>
                <TooltipContent>
                  {
                    status && status.label
                  }
                </TooltipContent>
                <TooltipTrigger>
                <Button
                  size="lg"
                  className="group/btn w-full sm:w-auto"
                  onClick={handleBookAppointment}
                  disabled={doctor.availabilityStatus === "fully_booked"}
                >
                  <CalendarPlus className="mr-2 h-5 w-5" />
                  Book Appointment
                </Button>
                </TooltipTrigger>
              </Tooltip>
              </div>
            </div>
          </div>
        </Card>

        {/* ── Details Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Information Card */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <CardTitle className="font-heading font-bold text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Professional Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Hospital className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Hospital</p>
                  <p className="text-sm font-semibold text-foreground">
                    {doctor.hospital}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-semibold text-foreground">
                    {doctor.location}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <HeartPulse className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Experience</p>
                  <p className="text-sm font-semibold text-foreground">
                    {doctor.experience}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Banknote className="h-4 w-4 text-accent-600 dark:text-accent-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Consultation Fee
                  </p>
                  <p className="text-sm font-bold text-accent-600 dark:text-accent-400">
                    £{doctor.fee}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability Card */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <CardTitle className="font-heading font-bold text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {status && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    Current Status :
                  </span>
                  <Badge className={`${status.className} text-xs`}>
                    {status.label}
                  </Badge>
                </div>
              )}
              <Separator />
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">
                  Time Slots
                </p>
                <div className="flex flex-wrap gap-2">
                  {doctor.availability?.map((slot, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="py-1.5 px-3 text-sm font-medium"
                    >
                      <Clock className="h-3 w-3 mr-1.5 text-muted-foreground" />
                      {slot}
                    </Badge>
                  )) || (
                    <p className="text-sm text-muted-foreground">
                      No availability listed.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 px-6 pb-6 md:hidden">
              <Tooltip>
                <TooltipContent>
                  {status && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        Current Status :
                      </span>
                      <Badge className={`${status.className} text-xs`}>
                        {status.label}
                      </Badge>
                    </div>
                  )}
                </TooltipContent>
                <TooltipTrigger>
                  <Button
                    className="w-full group/btn"
                    onClick={handleBookAppointment}
                  >
                    <CalendarPlus className="mr-2 h-5 w-5" />
                    Book Appointment
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </CardFooter>
          </Card>
        </div>

        {/* ── Reviews Section ── */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading font-bold text-xl flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Patient Reviews
              </CardTitle>
              <Badge variant="secondary" className="gap-1.5">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {doctor.rating} Overall
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {doctor.reviews && doctor.reviews.length > 0 ? (
              <div className="space-y-4">
                {doctor.reviews.map((review, idx) => (
                  <div key={idx}>
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                          {review.user.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">
                          {review.user}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array.from({ length: review.rating }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="h-3 w-3 fill-amber-400 text-amber-400"
                                />
                              ),
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-12">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                    {idx < doctor.reviews.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No reviews yet for this doctor.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
