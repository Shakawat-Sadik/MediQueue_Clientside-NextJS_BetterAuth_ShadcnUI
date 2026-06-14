export const statusConfig = {
  available: {
    label: "Available Today",
    className:
      "bg-emerald-500 hover:bg-emerald-500 text-white border-emerald-500",
  },
  few_slots: {
    label: "Few Slots Left",
    className: "bg-amber-500 hover:bg-amber-500 text-white border-amber-500",
  },
  fully_booked: {
    label: "Fully Booked",
    className: "bg-red-500 hover:bg-red-500 text-white border-red-500",
  },
};

export const sortOptions = [
  { value: "rating-desc", label: "Rating: High to Low" },
  { value: "rating-asc", label: "Rating: Low to High" },
  { value: "fee-asc", label: "Fee: Low to High" },
  { value: "fee-desc", label: "Fee: High to Low" },
  { value: "experience-desc", label: "Experience: Most First" },
  { value: "experience-asc", label: "Experience: Least First" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

export const specialtyOptions = [
  "Cardiologist",
  "Neurologist",
  "Dermatologist",
  "Orthopedic Surgeon",
  "Pediatrician",
  "Psychiatrist",
  "Gynecologist",
  "ENT Specialist",
  "Oncologist",
  "Urologist",
  "Ophthalmologist",
  "Gastroenterologist",
  "Endocrinologist",
  "Pulmonologist",
  "Rheumatologist",
];