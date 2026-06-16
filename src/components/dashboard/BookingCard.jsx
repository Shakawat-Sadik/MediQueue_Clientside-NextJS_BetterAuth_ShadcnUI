"use client";

import Image from "next/image";
import { Calendar, Clock, MapPin, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils"; // ← Using your utility!

const BookingCard = ({ booking, onUpdate, onDelete }) => {
  return (
    <Card className="border-border overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <CardContent className="p-5 flex-1">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-muted shrink-0">
            <Image
              src={booking.doctorImage}
              alt={booking.doctorName}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base text-foreground truncate">
              {booking.doctorName}
            </h3>
            <p className="text-xs text-primary font-semibold mb-1">
              {booking.doctorSpecialty}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {booking.hospital}
            </p>
          </div>
          <Badge
            variant={booking.status === "Confirmed" ? "default" : "secondary"}
            className={
              booking.status === "Confirmed"
                ? "bg-emerald-500 hover:bg-emerald-500 text-white"
                : ""
            }
          >
            {booking.status}
          </Badge>
        </div>

        <Separator className="mb-4" />

        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold mb-0.5">
              Patient
            </p>
            <p className="text-foreground font-medium truncate">
              {booking.patientName}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold mb-0.5">
              Phone
            </p>
            <p className="text-foreground font-medium truncate">
              {booking.phone}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] text-muted-foreground uppercase font-bold mb-0.5">
              Schedule
            </p>
            <div className="flex flex-wrap items-center gap-3 text-foreground font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                {formatDate(booking.appointmentDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                {booking.appointmentTime}
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 bg-muted/40 border-t border-border flex items-center justify-between">
        <span className="text-lg font-black text-foreground">
          £{booking.doctorFee}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={onUpdate}
          >
            <Pencil className="h-3.5 w-3.5" /> Update
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="gap-1.5"
            onClick={onDelete}
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default BookingCard;