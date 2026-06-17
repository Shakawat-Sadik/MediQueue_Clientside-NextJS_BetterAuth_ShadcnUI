"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { getAppointments } from "@/lib/action/action";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookingCard from "./BookingCard";
import UpdateBookingModal from "./UpdateBookingModal";
import DeleteBookingModal from "./DeleteBookingModal";

const MyBookings = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // State to control which modal is open and what data it holds
  const [updateTarget, setUpdateTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetchBookings(user.email);
    }
  }, [user]);

  const fetchBookings = async (email) => {
    try {
      setLoading(true);
      const res = await getAppointments(email);
      if (res.success) {
        setBookings(res.result);
      }
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  // Instant UI update when an appointment is edited
  const handleUpdateSuccess = (updatedBooking) => {
    setBookings((prev) =>
      prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
    );
    setUpdateTarget(null);
  };

  // Instant UI update when an appointment is deleted
  const handleDeleteSuccess = (deletedId) => {
    setBookings((prev) => prev.filter((b) => b._id !== deletedId));
    setDeleteTarget(null);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 flex flex-col items-center gap-4">
        <CalendarX className="h-16 w-16 text-muted-foreground/30" />
        <h3 className="text-lg font-bold text-foreground">No Bookings Yet</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          You haven&apos;t booked any appointments yet. Find your doctor and book
          your first session.
        </p>
        <Link href="/doctors">
          <Button className="mt-2">Browse Doctors</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            onUpdate={() => setUpdateTarget(booking)}
            onDelete={() => setDeleteTarget(booking)}
          />
        ))}
      </div>

      {/* Conditionally Render Modals */}
      {updateTarget && (
        <UpdateBookingModal
          booking={updateTarget}
          onClose={() => setUpdateTarget(null)}
          onSuccess={handleUpdateSuccess}
        />
      )}

      {deleteTarget && (
        <DeleteBookingModal
          booking={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </>
  );
}

export default MyBookings;