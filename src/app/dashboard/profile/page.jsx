"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, UserCircle, Pencil, ShieldCheck, CalendarClock } from "lucide-react";
import UpdateProfileModal from "@/components/dashboard/profile/UpdateProfileModal";

export default function MyProfile() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isPending) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-24 w-24 rounded-full bg-muted"></div>
          <div className="h-4 w-32 bg-muted rounded"></div>
          <div className="h-3 w-48 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <p className="text-center text-muted-foreground py-20">No user data found.</p>;
  }

  const profileInitial = user.name?.charAt(0).toUpperCase() || "U";

  // Handle UI update after modal save
  const handleUpdateSuccess = (updatedData) => {
    setIsModalOpen(false);
    // Trigger a refetch of the session to update Navbar and Profile UI instantly
    refetch(); 
  };

  return (
    <>
      <div className="max-w-3xl mx-auto w-full space-y-8">
        
        {/* Header Card with Avatar */}
        <Card className="border-border overflow-hidden shadow-sm">
          <div className="h-28 bg-gradient-to-r from-primary/80 to-accent/80" />
          <CardContent className="p-6 pt-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16">
              <Avatar className="h-32 w-32 border-4 border-card shadow-lg">
                <AvatarImage src={user.image || ""} alt={user.name} />
                <AvatarFallback className="text-4xl font-black bg-primary/10 text-primary">
                  {profileInitial}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left pb-2">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 justify-center sm:justify-start">
                  {user.name}
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-none gap-1">
                    <ShieldCheck className="h-3 w-3" /> Verified
                  </Badge>
                </h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <Button onClick={() => setIsModalOpen(true)} className="gap-2 w-full sm:w-auto">
                <Pencil className="h-4 w-4" /> Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UserCircle className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Full Name</span>
                <span className="text-sm font-semibold text-foreground">{user.name}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Email Address</span>
                <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> {user.email}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Account Type</span>
                <span className="text-sm font-semibold text-foreground capitalize">
                  {user.emailVerified ? "Standard" : "Guest"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-primary" />
                Activity Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="text-sm font-semibold text-foreground">
                  {new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Profile Completeness</span>
                <span className="text-sm font-semibold text-foreground">
                  {user.image ? "100%" : "80%"}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Update Profile Modal */}
      {isModalOpen && (
        <UpdateProfileModal
          user={user}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </>
  );
}