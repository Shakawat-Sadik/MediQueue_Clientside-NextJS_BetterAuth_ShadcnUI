"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, LogOut, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { ActivityIcon } from "./ui/activity";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Meet The Docs", href: "/doctors" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const isAuthenticated = Boolean(user);
  const profileInitial =
    user?.name?.slice(0, 2)?.toUpperCase() || "U";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileMenuOpen(false);
      }
    }

    if (profileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  const handleSignOut = async () => {
    await authClient.signOut();
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
    router.push("/");
  };

  const isActiveLink = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-xl bg-background/80 text-foreground transition-colors duration-300">
      <div className=" mx-auto px-5 sm:px-10 lg:px-15 py-1 sm:py-2 lg:py-3">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl group-hover:scale-105 transition-transform shadow-md">
              <ActivityIcon className="h-7 w-7" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Medi<span className="text-primary">Queue</span>
            </span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Right Actions ── */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border border-border bg-card text-muted-foreground hover:text-primary-foreground hover:border-primary/40 transition-all duration-200 cursor-pointer`}
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {isAuthenticated ? (
              /* ── Profile Dropdown ── */
              <div ref={profileRef} className="relative">
                <Button
                  onClick={() => setProfileMenuOpen((p) => !p)}
                  className="flex items-center gap-2 rounded-full bg-primary text-primary-foreground pl-3 pr-1.5 py-1.5 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <span className="text-sm font-semibold max-w-[120px] truncate hidden sm:block">
                    {user?.name || "Profile"}
                  </span>
                  <div className="relative h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center overflow-hidden">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user?.name || "Profile"}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold">
                        {profileInitial}
                      </span>
                    )}
                  </div>
                </Button>

                {profileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 min-w-50 rounded-xl bg-card border border-border shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                    >
                      <User className="h-4 w-4 text-muted-foreground" />
                      My Profile
                    </Link>
                    <div className="border-t border-border" />
                    <Button
                      onClick={handleSignOut}
                      className="flex items-center gap-2.5 w-full px-4 py-3 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Auth Buttons ── */
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-primary border border-primary hover:bg-primary/5 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-200 shadow-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile Controls ── */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-muted-foreground hover:bg-accent transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              onClick={() => setMobileMenuOpen((p) => !p)}
              className="p-2 rounded-xl text-muted-foreground hover:bg-accent transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-1 duration-200">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Auth Section */}
            <div className="pt-3 mt-2 border-t border-border">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-accent">
                    <div className="relative h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {user?.image ? (
                        <Image
                          src={user.image}
                          alt={user?.name || "Profile"}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-sm font-bold text-primary">
                          {profileInitial}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {user?.name || "Profile"}
                      </p>
                      <p className="text-xs text-muted-foreground">Logged in</p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground border border-border hover:bg-accent transition-colors"
                  >
                    My Profile
                  </Link>
                  <Button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors cursor-pointer"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-primary border border-primary hover:bg-primary/5 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}