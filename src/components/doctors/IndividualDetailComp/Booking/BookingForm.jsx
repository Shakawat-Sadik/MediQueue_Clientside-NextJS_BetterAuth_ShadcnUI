"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { createAppointment } from "@/lib/action/action";
import { eliteDateFormat } from "@/lib/utils";

export default function BookingForm({ doctor }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const formData = new FormData(e.currentTarget);
      const appointmentData = {
        doctorId: doctor._id || doctor.id,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        doctorImage: doctor.image,
        doctorFee: doctor.fee,
        hospital: doctor.hospital,
        userEmail: user.email, // Server action will securely handle this later
        patientName: formData.get("patientName"),
        gender: formData.get("gender"),
        phone: formData.get("phone"),
        appointmentDate: formData.get("appointmentDate"),
        appointmentTime: formData.get("appointmentTime"),
        notes: formData.get("notes") || "",
      };

      const result = await createAppointment(appointmentData);

      if (result.success) {
        // Redirect to dashboard to see the new booking
        router.push("/dashboard");
        toast.success("Appointment booked successfully!", {
          description: `Your appointment with Dr. ${doctor.name} is confirmed for ${eliteDateFormat(appointmentData.appointmentDate)} at ${appointmentData.appointmentTime}.`,
          icon: <CalendarPlus className="h-4 w-4" />,
        });
      } else {
        setError(result.message || "Failed to book appointment.");
        toast.error("Booking failed", {
          description: result.message || "Please try again.",
        });
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
      toast.error("Booking failed", {
        description: err.message || "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Generate next 14 days for date selection
  const today = new Date();
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      value: date.toISOString().split("T")[0],
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    };
  });

  // Extract time slots from doctor availability
  const timeSlots = doctor.availability?.flatMap((slot) => {
    if (slot.includes("09:00") || slot.includes("08:00"))
      return ["09:00 AM", "10:00 AM", "11:00 AM"];
    if (slot.includes("10:00")) return ["10:00 AM", "11:00 AM", "12:00 PM"];
    if (slot.includes("04:00") || slot.includes("05:00"))
      return ["04:00 PM", "05:00 PM", "06:00 PM"];
    return ["10:00 AM", "02:00 PM"]; // Fallback
  }) || ["10:00 AM"];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button
        variant="ghost"
        className="mb-6 text-muted-foreground hover:text-foreground gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Doctor
      </Button>

      <Card className="border-border shadow-sm">
        <CardHeader className="mb-4">
          <CardTitle className="font-heading font-bold text-2xl text-foreground">
            Book Appointment
          </CardTitle>
          <CardDescription className="text-muted-foreground pt-2">
            Fill in your details to confirm your appointment with{" "}
            <span className="font-semibold text-foreground">{doctor.name}</span>{" "}
            at{" "}
            <span className="font-semibold text-foreground">
              {doctor.hospital}
            </span>
            .
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  name="patientName"
                  required
                  placeholder="Your full name"
                  defaultValue={user?.name || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select name="gender" required>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (Read-only)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appointmentDate">Appointment Date</Label>
                <Select name="appointmentDate" required>
                  <SelectTrigger id="appointmentDate">
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    {dates.map((date) => (
                      <SelectItem key={date.value} value={date.value}>
                        {date.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointmentTime">Preferred Time</Label>
                <Select name="appointmentTime" required>
                  <SelectTrigger id="appointmentTime">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Deduplicate time slots just in case */}
                    {[...new Set(timeSlots)].map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="w-full p-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                placeholder="Any specific symptoms or concerns..."
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
              <div className="text-lg font-black text-foreground">
                £{doctor.fee}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  / session
                </span>
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full sm:w-auto group/btn"
              >
                <CalendarPlus className="mr-2 h-5 w-5" />
                {submitting ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>

            {error && (
              <p className="text-sm text-destructive font-medium text-center pt-2">
                {error}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
