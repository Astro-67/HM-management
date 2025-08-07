import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkInBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckIn() {
  const queryClient = useQueryClient();

  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, bookingData }) => checkInBooking(bookingId, bookingData),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkIn, isCheckingIn };
}