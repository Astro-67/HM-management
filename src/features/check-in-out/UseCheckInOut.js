import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings, checkOutBooking, checkInBooking } from "../../services/apiBookings";
import { format } from "date-fns";
import toast from "react-hot-toast";

// Hook for fetching today's activities (check-ins and check-outs)
export function useTodayActivity() {
  const today = format(new Date(), "yyyy-MM-dd");
  
  const { data: activities, isLoading } = useQuery({
    queryKey: ["bookings", "today-activity"],
    queryFn: () => getActivitiesForToday(today),
  });

  return { activities, isLoading };
}

// Helper function to fetch check-ins and check-outs for today
async function getActivitiesForToday(today) {
  try {
    // First get today's check-ins (bookings starting today with status "unconfirmed")
    const { data: checkIns = [] } = await getBookings({
      filter: { 
        field: "startDate", 
        value: today,
        fieldStatus: "status",
        valueStatus: "unconfirmed"
      }
    });

    // Then get today's check-outs (bookings ending today with status "checked-in")
    const { data: checkOuts = [] } = await getBookings({
      filter: { 
        field: "endDate", 
        value: today,
        fieldStatus: "status",
        valueStatus: "checked-in"
      }
    });

    return { 
      checkIns: Array.isArray(checkIns) ? checkIns : [], 
      checkOuts: Array.isArray(checkOuts) ? checkOuts : [] 
    };
  } catch (error) {
    console.error("Error fetching today's activities:", error);
    return { checkIns: [], checkOuts: [] };
  }
}

// Hook for checking in a booking
export function useCheckin() {
  const queryClient = useQueryClient();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, bookingData = {} }) => 
      checkInBooking(bookingId, bookingData),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      // Also invalidate the specific booking to update the details view
      queryClient.invalidateQueries({ queryKey: ["booking", data.id.toString()] });
      // Invalidate today's activity
      queryClient.invalidateQueries({ queryKey: ["bookings", "today-activity"] });
    },
    onError: (error) => {
      console.error("Check-in error:", error);
      toast.error("There was an error while checking in. Please verify payment.");
    },
  });

  return { checkin, isCheckingIn };
}

// Hook for checking out a booking
export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) => 
      checkOutBooking(bookingId),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      // Also invalidate the specific booking to update the details view
      queryClient.invalidateQueries({ queryKey: ["booking", data.id.toString()] });
      // Invalidate today's activity
      queryClient.invalidateQueries({ queryKey: ["bookings", "today-activity"] });
    },
    onError: (error) => {
      console.error("Check-out error:", error);
      toast.error("There was an error while checking out");
    },
  });

  return { checkout, isCheckingOut };
}
