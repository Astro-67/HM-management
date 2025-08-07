import supabase from "./supabase";

export async function getBookings({ page = 1, filter = null, sortBy = null } = {}) {
    // Set page size from environment variables or default to 10
    const pageSize = import.meta.env.VITE_PAGE_SIZE || 10;
    
    // Calculate the range for pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    // First get the total count for pagination
    let countQuery = supabase
        .from("bookings")
        .select("count", { count: "exact" });
    
    // Apply filter to count query if provided
    if (filter && filter.field && filter.value) {
        countQuery = countQuery.eq(filter.field, filter.value);
        
        // If we also need to filter by status (for activity views)
        if (filter.fieldStatus && filter.valueStatus) {
            countQuery = countQuery.eq(filter.fieldStatus, filter.valueStatus);
        }
    }
    
    // Execute the count query
    const { count, error: countError } = await countQuery;
    
    if (countError) {
        console.error(countError);
        throw new Error("Failed to count bookings");
    }
    
    // Build the main data query
    let query = supabase
        .from("bookings")
        .select(`
            id, 
            created_at, 
            startDate, 
            endDate, 
            numNights, 
            numGuests, 
            status, 
            totalPrice, 
            hasBreakfast, 
            extrasPrice,
            isPaid, 
            cabins(name), 
            guests(fullName, email, nationalID)
        `);
    
    // Apply filters if provided
    if (filter && filter.field && filter.value) {
        query = query.eq(filter.field, filter.value);
        
        // If we also need to filter by status (for activity views)
        if (filter.fieldStatus && filter.valueStatus) {
            query = query.eq(filter.fieldStatus, filter.valueStatus);
        }
    }
    
    // Apply sorting if provided
    if (sortBy) {
        const [field, direction] = sortBy.split("-");
        query = query.order(field, { ascending: direction === "asc" });
    }
    
    // Apply pagination
    const { data, error } = await query.range(from, to);
    
    if (error) {
        console.error(error);
        throw new Error("Bookings could not be loaded");
    }
    
    return { data, count };
}

export async function getBooking(id) {
    const { data, error } = await supabase
        .from("bookings")
        .select(`
            id, 
            created_at, 
            startDate, 
            endDate, 
            numNights, 
            numGuests, 
            status, 
            totalPrice, 
            hasBreakfast, 
            extrasPrice, 
            isPaid, 
            cabins(name), 
            guests(fullName, email, nationalID)
        `)
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking not found");
    }
    
    return data;
}

export async function updateBooking(id, obj) {
    const { data, error } = await supabase
        .from("bookings")
        .update(obj)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking could not be updated");
    }
    
    return data;
}

export async function checkInBooking(id, bookingData = {}) {
    // Default to changing status to checked-in if no specific data is provided
    const data = {
        status: "checked-in",
        ...bookingData
    };
    
    return updateBooking(id, data);
}

export async function checkOutBooking(id) {
    return updateBooking(id, { status: "checked-out" });
}

export async function deleteBooking(id) {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    
    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }
}