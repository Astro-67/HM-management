import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSettings as updateSettingApi } from "../../services/apiSettings";

 export function useUpdateSetting(){
      const queryClient = useQueryClient();

  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Cabin successfully Edited");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
     
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSetting, isUpdating};
 }

