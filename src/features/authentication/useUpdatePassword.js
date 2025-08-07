import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updatePassword as updatePasswordApi } from "../../services/apiAuth";

export function useUpdatePassword() {
  const { mutate: updatePassword, isPending: isUpdating } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      toast.success("Password successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updatePassword, isUpdating };
}
