"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { sonnerFunctionality } from "@/lib/sonnerFunctionality";
import { eliteDateFormat } from "@/lib/utils";

const UpdateProfileModal = ({ user, onClose, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const newName = formData.get("name");
    const newImage = formData.get("image");

    const res = await authClient.updateUser({
      name: newName,
      image: newImage || undefined,
    });

    if (res.error) {
      toast.error("Failed to update profile.", {
        description: eliteDateFormat(),
      });
    } else {
      toast.success("Profile updated successfully!", sonnerFunctionality({ IconParam: Pencil }));
      onSuccess({ name: newName, image: newImage });
    }
    setSubmitting(false);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal details and profile picture.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Read-only Email */}
          <div className="space-y-1.5">
            <Label>Email Address</Label>
            <Input 
              value={user.email} 
              readOnly 
              disabled 
              className="bg-muted cursor-not-allowed" 
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              required 
              defaultValue={user.name} 
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="image">Photo URL</Label>
            <Input 
              id="image" 
              name="image" 
              type="url"
              defaultValue={user.image || ""} 
              placeholder="https://example.com/photo.jpg"
            />
            <p className="text-xs text-muted-foreground">
              Paste a direct link to your profile picture.
            </p>
          </div>

          <DialogFooter className="gap-2 pt-4">
            <DialogClose asChild>
              <Button type="button" variant="ghost">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProfileModal;