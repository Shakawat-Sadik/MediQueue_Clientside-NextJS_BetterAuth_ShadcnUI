import { notFound } from "next/navigation";
import { getDoctorBySlug } from "@/lib/action/action";
import GuardRail from "@/components/shared/GuardRail";
import BookingForm from "@/components/booking/BookingForm";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await getDoctorBySlug(slug);
  const doctor = data?.result;

  return {
    title: doctor ? `Book ${doctor.name} | MediQueue` : "Book Appointment | MediQueue",
    description: `Confirm your appointment with ${doctor?.name}.`,
  };
}

export default async function BookingPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await getDoctorBySlug(slug);

  if (!data.success || !data.result) {
    notFound();
  }

  const doctor = data.result;

  return (
    <GuardRail>
      <section className="pt-24 pb-16 min-h-screen bg-background">
        <BookingForm doctor={doctor} />
      </section>
    </GuardRail>
  );
}