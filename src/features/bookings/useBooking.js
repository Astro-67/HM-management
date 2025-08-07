import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const [searchParams] = useSearchParams();
  
  // Get current page from URL or default to 1
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  
  // Get filter from URL
  const filterValue = searchParams.get("status");
  const filter = filterValue && filterValue !== "all" 
    ? { field: "status", value: filterValue } 
    : null;
  
  // Get sort from URL
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  
  // Fetch data with pagination, filtering, and sorting
  const {
    isLoading,
    data: { data: bookings, count } = { data: [], count: 0 },
    error,
  } = useQuery({
    queryKey: ["bookings", page, filter, sortBy],
    queryFn: () => getBookings({ page, filter, sortBy }),
  });

  return { isLoading, bookings, count, error };
}