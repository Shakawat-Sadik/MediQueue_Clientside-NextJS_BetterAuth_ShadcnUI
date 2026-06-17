import Loading from "@/app/loading";
import MyProfile from "@/components/dashboard/MyProfile";
import { Suspense } from "react";

export const metadata = {
  title: "My Profile | MediQueue",
  description: "View and update your personal information.",
};

export default function ProfilePage() {
  return (<Suspense fallback={<Loading/>}>
    <MyProfile />
  </Suspense>)
}