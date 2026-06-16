import { notFound } from "next/navigation";
import { getDoctorBySlug } from "@/lib/action/action";
import DoctorDetails from "@/components/doctors/IndividualDetailComp/DoctorDetails";

// ── Metadata Generation ──
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await getDoctorBySlug(slug);

  if (!data.success || !data.result) {
    return {
      title: "Doctor Not Found | MediQueue",
      description: "The doctor profile you are looking for could not be found.",
    };
  }

  const doctor = data.result;

  return {
    title: `${doctor.name} - ${doctor.specialty} | MediQueue`,
    description: `Book an appointment with ${doctor.name}, a board-certified specialist in ${doctor.specialty} with ${doctor.experience} experience at ${doctor.hospital}.`,
    openGraph: {
      title: `${doctor.name} - ${doctor.specialty} | MediQueue`,
      description: `Book an appointment with ${doctor.name}, a board-certified specialist in ${doctor.specialty}.`,
      images: [doctor.image],
    },
  };
}

// ── Page Component ──
export default async function DoctorDetailsPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await getDoctorBySlug(slug);

  // If the action fails or returns no result, trigger the 404 page
  if (!data.success || !data.result) {
    notFound();
  }

  const doctor = data.result;

  return <DoctorDetails doctor={doctor} />;
}