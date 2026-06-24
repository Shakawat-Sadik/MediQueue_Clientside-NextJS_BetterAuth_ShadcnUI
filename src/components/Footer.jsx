"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartPulse, Mail, Phone, MapPin, Send } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "All Appointments", href: "/doctors" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Login", href: "/auth/login" },
];

const specialties = [
  { name: "Cardiology", href: "/doctors?specialty=Cardiologist" },
  { name: "Neurology", href: "/doctors?specialty=Neurologist" },
  { name: "Pediatrics", href: "/doctors?specialty=Pediatrician" },
  { name: "Orthopedics", href: "/doctors?specialty=Orthopedic Surgeon" },
  { name: "Ophthalmology", href: "/doctors?specialty=Ophthalmologist" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

const contactInfo = [
  { icon: Mail, text: "support@mediqueue.com", href: "mailto:support@mediqueue.com" },
  { icon: Phone, text: "+44 20 7946 0958", href: "tel:+442079460958" },
  { icon: MapPin, text: "London, United Kingdom", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-accent dark:bg-background border-t border-border transition-colors duration-300">
      {/* ── Upper Footer ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 items-start">
          {/* Brand & Contact Column */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="bg-primary text-primary-foreground p-2 rounded-xl group-hover:scale-105 transition-transform shadow-md">
                <HeartPulse className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Medi<span className="text-primary">Queue</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering individuals to take control of their health journeys
              through seamless doctor appointments, digital records, and
              professional medical guidance.
            </p>

            {/* Contact Details */}
            <div className="space-y-2.5">
              {contactInfo.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>{item.text}</span>
                  </a>
                );
              })}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties Column */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-5">
              Specialties
            </h3>
            <ul className="space-y-3">
              {specialties.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-1">
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Get the latest medical advisories, top doctor profiles, and
              platform updates delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-1">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-muted border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                ✓ Subscription successful! Welcome aboard.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Lower Footer ── */}
      <div className="bg-muted/40 border-t border-border py-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            &copy; {new Date().getFullYear()} MediQueue. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Use
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}