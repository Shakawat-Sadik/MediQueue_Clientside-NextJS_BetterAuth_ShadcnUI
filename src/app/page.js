import WhyMediQueue from "@/components/home/WhyMediQueue";
import CTA from "@/components/home/CTA";
import Hero from "@/components/home/Hero";
import DepHighlights from "@/components/home/DepHighlights";
import Stats from "@/components/home/Stats";
import Reviews from "@/components/home/Reviews";
import TopDoctors from "@/components/home/TopDoctors";

export default function Home() {
  return (
    <div className="w-full relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/40 min-h-screen transition-colors duration-300">
      {/* Hero banner */}
      <Hero />
      {/* Hero Stats */}
      <Stats />
      {/* Why MediQueue */}
      <WhyMediQueue />
      {/* Top rated Doctor's */}
      <TopDoctors />
      {/* Department Highlights */}
      <DepHighlights />
      {/* Testimonial */}
      <Reviews />
      {/* Call to action btn */}
      <CTA></CTA>
    </div>
  );
}