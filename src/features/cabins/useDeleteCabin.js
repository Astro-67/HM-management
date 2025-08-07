import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabinMutate } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  // Create a wrapper function that accepts options and passes them to mutate
  function deleteCabin(id, options = {}) {
    // Ensure options is an object
    const enhancedOptions = { ...options };
    
    // If original onSuccess exists, chain it with our base success handler
    if (enhancedOptions.onSuccess) {
      const originalOnSuccess = enhancedOptions.onSuccess;
      enhancedOptions.onSuccess = () => {
        originalOnSuccess();
      };
    }
    
    deleteCabinMutate(id, enhancedOptions);
  }

  return { isDeleting, deleteCabin };
}
