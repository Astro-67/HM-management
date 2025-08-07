import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    error,
    data,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  // Since data is an array, get the first item
  const settings = data?.[0] || {};

  return { isLoading, error, settings };
}