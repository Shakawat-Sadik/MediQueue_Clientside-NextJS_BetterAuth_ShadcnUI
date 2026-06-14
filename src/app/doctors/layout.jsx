import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "All Doctors — CareSync",
  description:
    "Browse all available doctors and book appointments with top-rated specialists across the UK. Search, filter, and sort to find the right doctor for your needs.",
  keywords: [
    "doctor appointment",
    "find doctor",
    "book consultation",
    "specialist",
    "CareSync",
  ],
  openGraph: {
    title: "All Doctors — CareSync",
    description:
      "Browse all available doctors and book appointments with top-rated specialists across the UK.",
  },
};

export default function AppointmentsLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}