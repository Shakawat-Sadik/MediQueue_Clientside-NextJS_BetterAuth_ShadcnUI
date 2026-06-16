"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { updateAppointment } from "@/lib/action/action";
import { Loader2 } from "lucide-react";
import { toast } from "sonner"; // ← Added Sonner
import { formatDate } from "@/lib/utils"; // ← Added utility

const UpdateBookingModal = ({ booking, onClose, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);
  // Removed the inline error state since we use toast.error() now

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const updateData = {
      patientName: formData.get("patientName"),
      gender: formData.get("gender"),
      phone: formData.get("phone"),
      appointmentDate: formData.get("appointmentDate"),
      appointmentTime: formData.get("appointmentTime"),
      notes: formData.get("notes") || "",
    };

    const res = await updateAppointment(booking._id, updateData);

    if (res.success) {
      // Merge updated data with existing booking to keep read-only fields
      onSuccess({ ...booking, ...updateData });
      onClose(); // Close the modal after success
      
      // Fire success toast
      toast.success("Appointment updated successfully!", {
        description: `Your appointment with ${booking.doctorName} is now scheduled for ${formatDate(updateData.appointmentDate)} at ${updateData.appointmentTime}.`,
      });
    } else {
      // Fire error toast
      toast.error("Failed to update appointment.", {
        description: res.message || "An unexpected error occurred.",
      });
    }
    setSubmitting(false);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Appointment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Read-only fields */}
          <div className="space-y-1.5">
            <Label>Doctor Name</Label>
            <Input value={booking.doctorName} readOnly disabled className="bg-muted cursor-not-allowed" />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input value={booking.userEmail} readOnly disabled className="bg-muted cursor-not-allowed" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="up_patientName">Patient Name</Label>
              <Input id="up_patientName" name="patientName" required defaultValue={booking.patientName} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="up_gender">Gender</Label>
              <Select name="gender" defaultValue={booking.gender}>
                <SelectTrigger id="up_gender">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="up_phone">Phone</Label>
              <Input id="up_phone" name="phone" required defaultValue={booking.phone} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="up_date">Date</Label>
              <Input id="up_date" name="appointmentDate" type="date" required defaultValue={booking.appointmentDate} min={today} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="up_time">Time</Label>
            <Select name="appointmentTime" defaultValue={booking.appointmentTime}>
              <SelectTrigger id="up_time">
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                <SelectItem value="05:00 PM">05:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="up_notes">Notes</Label>
            <textarea
              id="up_notes"
              name="notes"
              rows={2}
              className="w-full p-2.5 rounded-md border border-border bg-transparent text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
              defaultValue={booking.notes}
            />
          </div>

          {/* Removed inline error paragraph here */}

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button type="button" variant="ghost">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateBookingModal;