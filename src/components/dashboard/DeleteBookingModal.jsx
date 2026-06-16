import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteAppointment } from "@/lib/action/action";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { sonnerFunctionality } from "@/lib/sonnerFunctionality"; // ← Imported your config

const DeleteBookingModal = ({ booking, onClose, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      const res = await deleteAppointment(booking._id);

      if (res.success) {
        toast.success("Appointment deleted successfully!", {
          description: `Your appointment with ${booking.doctorName} on ${formatDate(booking.appointmentDate)} was cancelled.`,
        });
        onSuccess(booking._id);
        onClose();
      } else {
        toast.error("Failed to delete appointment.", {
          description: res.message || "Please try again.",
        });
      }
    } catch (err) {
      toast.error("An unexpected error occurred", {
        description: err.message || "Please refresh and try again.",
      });
    } finally {
      setSubmitting(false); // ✅ ALWAYS runs, even on errors
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Delete Appointment
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel your appointment with{" "}
            <span className="font-semibold text-foreground">
              {booking.doctorName}
            </span>{" "}
            on{" "}
            <span className="font-semibold text-foreground">
              {formatDate(booking.appointmentDate)}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={submitting}
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookingModal;
