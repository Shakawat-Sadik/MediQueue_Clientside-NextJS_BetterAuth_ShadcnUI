"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Check,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Star,
  Banknote,
  Briefcase,
  TextCursorInput,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { specialtyOptions } from "@/lib/badgeProvider"; // Removed sortOptions, we use sortGroups below
import DoctorCard from "@/components/doctors/DoctorCard";
import DoctorCardSkeleton from "@/components/doctors/Doctor-X-ray";
import { getDoctors } from "@/lib/action/action";

// Sort groups for the DropdownMenu
const sortGroups = [
  {
    label: "Rating",
    Icon: Star,
    options: [
      { value: "rating-desc", label: "High to Low", direction: "desc" },
      { value: "rating-asc", label: "Low to High", direction: "asc" },
    ],
  },
  {
    label: "Fee",
    Icon: Banknote,
    options: [
      { value: "fee-asc", label: "Low to High", direction: "asc" },
      { value: "fee-desc", label: "High to Low", direction: "desc" },
    ],
  },
  {
    label: "Experience",
    Icon: Briefcase,
    options: [
      { value: "experience-desc", label: "Most First", direction: "desc" },
      { value: "experience-asc", label: "Least First", direction: "asc" },
    ],
  },
  {
    label: "Name",
    Icon: TextCursorInput,
    options: [
      { value: "name-asc", label: "A to Z", direction: "asc" },
      { value: "name-desc", label: "Z to A", direction: "desc" },
    ],
  },
];

export default function AllDoctorsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const initialSpecialty = searchParams.get("specialty") || "";

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState(initialSpecialty);
  const [showFilters, setShowFilters] = useState(false);

  // ── Fetch via Server Action ──
  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const query = {};
      if (searchQuery.trim()) query.search = searchQuery.trim();
      if (specialtyFilter) query.specialty = specialtyFilter;

      if (sortValue) {
        const [field, order] = sortValue.split("-");
        query.sort = field;
        query.order = order;
      }

      const data = await getDoctors(query);

      if (!data.success) {
        throw new Error(data.message || "Failed to load doctors");
      }

      setDoctors(data.result);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, sortValue, specialtyFilter]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  // ── Debounced search ──
  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // ── Handlers ──
  const handleViewDetails = (slug) => {
    if (user) {
      router.push(`/doctors/${slug}`);
    } else {
      router.push(`/auth/login?redirect=/doctors/${slug}`);
    }
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearchQuery("");
    setSortValue("");
    setSpecialtyFilter("");
  };

  const hasActiveFilters = searchQuery || sortValue || specialtyFilter;

  // Get active sort display info
  const activeSortOption = sortValue
    ? sortGroups.flatMap((g) => g.options).find((o) => o.value === sortValue)
    : null;
  const activeSortGroup = sortValue
    ? sortGroups.find((g) => g.options.some((o) => o.value === sortValue))
    : null;

  return (
    <section className="pt-24 pb-16 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Page Header ── */}
        <div className="mb-10">
          <span className="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-widest mb-4">
            Our Specialists
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-3">
            All Doctors
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Browse all available doctors and book an appointment with the
            specialist you need.
          </p>
        </div>

        {/* ── Search & Filter Bar ── */}
        <div className="mb-8 space-y-4">
          {/* Main search row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by doctor name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 h-11 bg-card border-border"
              />
              {searchInput && (
                <button
                  onClick={() => {
                    setSearchInput("");
                    setSearchQuery("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-11 gap-2 justify-between sm:justify-center"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>
                    {sortValue
                      ? `${activeSortGroup?.label}: ${activeSortOption?.label}`
                      : "Sort by"}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {sortGroups.map((group, groupIdx) => {
                  const GroupIcon = group.Icon;
                  return (
                    <div key={group.label}>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                          <GroupIcon className="h-3.5 w-3.5" />
                          {group.label}
                        </DropdownMenuLabel>
                        {group.options.map((option) => (
                          <DropdownMenuItem
                            key={option.value}
                            onClick={() => setSortValue(option.value)}
                            className="flex items-center justify-between gap-4 cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              {option.direction === "asc" ? (
                                <ArrowUp className="h-3.5 w-3.5 text-muted-foreground" />
                              ) : (
                                <ArrowDown className="h-3.5 w-3.5 text-muted-foreground" />
                              )}
                              {option.label}
                            </span>
                            {sortValue === option.value && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                      {groupIdx < sortGroups.length - 1 && (
                        <DropdownMenuSeparator />
                      )}
                    </div>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setSortValue("")}
                  className="flex items-center justify-between gap-4 cursor-pointer text-muted-foreground"
                  disabled={!sortValue}
                >
                  <span className="flex items-center gap-2">
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset Sort
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Filter Toggle (mobile) */}
            <Button
              variant="outline"
              className="sm:hidden h-11 gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-primary" />
              )}
            </Button>
          </div>

          {/* Specialty Filter Row */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center gap-3 ${
              showFilters ? "block" : "hidden sm:flex"
            }`}
          >
            <Select
              value={specialtyFilter}
              onValueChange={setSpecialtyFilter}
            >
              <SelectTrigger className="w-full sm:w-55 h-11 bg-card border-border">
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                {specialtyOptions.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground gap-1.5"
              >
                <X className="h-3.5 w-3.5" />
                Clear all filters
              </Button>
            )}

            {/* Active filter badges */}
            <div className="flex flex-wrap gap-2">
              {specialtyFilter && (
                <Badge
                  variant="secondary"
                  className="gap-1.5 py-1 px-2.5 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                  onClick={() => setSpecialtyFilter("")}
                >
                  {specialtyFilter}
                  <X className="h-3 w-3" />
                </Badge>
              )}
              {sortValue && (
                <Badge
                  variant="secondary"
                  className="gap-1.5 py-1 px-2.5 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                  onClick={() => setSortValue("")}
                >
                  {activeSortGroup?.label}: {activeSortOption?.label}
                  <X className="h-3 w-3" />
                </Badge>
              )}
              {searchQuery && (
                <Badge
                  variant="secondary"
                  className="gap-1.5 py-1 px-2.5 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                  onClick={() => {
                    setSearchInput("");
                    setSearchQuery("");
                  }}
                >
                  &ldquo;{searchQuery}&rdquo;
                  <X className="h-3 w-3" />
                </Badge>
              )}
            </div>
          </div>

          {/* Results count */}
          <Separator />

          {!loading && !error && (
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {doctors.length}
              </span>{" "}
              doctor{doctors.length !== 1 ? "s" : ""}
              {hasActiveFilters ? " matching your filters" : ""}
            </p>
          )}
        </div>

        {/* ── Loading State ── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <DoctorCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* ── Error State ── */}
        {!loading && error && (
          <div className="text-center py-20">
            <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-destructive font-semibold mb-4">{error}</p>
            <Button variant="outline" onClick={fetchDoctors}>
              Try Again
            </Button>
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && !error && doctors.length === 0 && (
          <div className="text-center py-20">
            <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">
              No doctors found
            </h3>
            <p className="text-muted-foreground mb-6">
              {hasActiveFilters
                ? "No doctors match your current filters. Try adjusting your search criteria."
                : "There are no doctors available at the moment."}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            )}
          </div>
        )}

        {/* ── Doctors Grid ── */}
        {!loading && !error && doctors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id || doctor._id}
                doctor={doctor}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


/*
- const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
+ import { getDoctors } from "@/app/actions";

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

-     const params = new URLSearchParams();
-     if (searchQuery.trim()) params.set("search", searchQuery.trim());
-     if (specialtyFilter) params.set("specialty", specialtyFilter);
-     if (sortValue) {
-       const [field, order] = sortValue.split("-");
-       params.set("sort", field);
-       params.set("order", order);
-     }
-
-     const res = await fetch(`${API_URL}/doctors?${params.toString()}`);
-     if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
-
-     const data = await res.json();
-     if (!data.success) throw new Error(data.message || "Failed to load doctors");
+     const query = {};
+     if (searchQuery.trim()) query.search = searchQuery.trim();
+     if (specialtyFilter) query.specialty = specialtyFilter;
+     if (sortValue) {
+       const [field, order] = sortValue.split("-");
+       query.sort = field;
+       query.order = order;
+     }
+
+     const data = await getDoctors(query);
+     if (!data.success) throw new Error(data.message || "Failed to load doctors");

      setDoctors(data.result);
    } catch (err) {
      // ...same error handling
    } finally {
      setLoading(false);
    }
  }, [searchQuery, sortValue, specialtyFilter]);
*/