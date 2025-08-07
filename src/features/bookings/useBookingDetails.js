import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

export function useBookingDetails(id) {
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    enabled: Boolean(id),
  });

  return { isLoading, booking, error };
}