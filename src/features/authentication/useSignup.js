import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) => 
      signupApi({ fullName, email, password }),
    onSuccess: (data) => {
      // We don't change the currently logged-in user
      // Just show success message for admin
      toast.success(`New user account for ${data.user.email} created successfully! Confirm the email address .`);
      
      // Stay on the users page as we're creating users as an admin
      // This allows creating multiple users without navigating away
    },
    onError: (err) => {
      console.error("Signup error:", err);
      toast.error(err.message || "Could not create account. Please try again.");
    }
  });

  return { signup, isLoading };
}
