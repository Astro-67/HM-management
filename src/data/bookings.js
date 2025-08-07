// Helper function to generate dates
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Create sample bookings data using the current date
const today = new Date();

// Sample bookings data
const bookings = [
  {
    // Unconfirmed future booking
    startDate: addDays(today, 7).toISOString().split('T')[0],
    endDate: addDays(today, 11).toISOString().split('T')[0],
    numNights: 4,
    numGuests: 2,
    cabinId: 1, // Assign cabin IDs as needed
    guestId: 1,
    totalPrice: 1600,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: false,
    observations: "Celebrating anniversary, requested champagne."
  },
  {
    // Checked-in current booking
    startDate: addDays(today, -2).toISOString().split('T')[0],
    endDate: addDays(today, 3).toISOString().split('T')[0],
    numNights: 5,
    numGuests: 4,
    cabinId: 2,
    guestId: 2,
    totalPrice: 2400,
    status: "checked-in",
    hasBreakfast: true,
    isPaid: true,
    observations: "Family vacation, asked about hiking trails."
  },
  {
    // Past checked-out booking
    startDate: addDays(today, -15).toISOString().split('T')[0],
    endDate: addDays(today, -10).toISOString().split('T')[0],
    numNights: 5,
    numGuests: 2,
    cabinId: 3,
    guestId: 3,
    totalPrice: 1500,
    status: "checked-out",
    hasBreakfast: false,
    isPaid: true,
    observations: ""
  },
  {
    // Future booking
    startDate: addDays(today, 20).toISOString().split('T')[0],
    endDate: addDays(today, 25).toISOString().split('T')[0],
    numNights: 5,
    numGuests: 6,
    cabinId: 5,
    guestId: 4,
    totalPrice: 3250,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: false,
    observations: "Extended family trip, requested cribs for infants."
  },
  {
    // Current booking
    startDate: addDays(today, -1).toISOString().split('T')[0],
    endDate: addDays(today, 4).toISOString().split('T')[0],
    numNights: 5,
    numGuests: 1,
    cabinId: 1,
    guestId: 5,
    totalPrice: 1200,
    status: "checked-in",
    hasBreakfast: true,
    isPaid: true,
    observations: "Business trip, requires quiet environment for work."
  },
  {
    // Future booking
    startDate: addDays(today, 14).toISOString().split('T')[0],
    endDate: addDays(today, 21).toISOString().split('T')[0],
    numNights: 7,
    numGuests: 2,
    cabinId: 6,
    guestId: 6,
    totalPrice: 2240,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: true,
    observations: "Honeymoon stay, requested romantic setup."
  }
];

export default bookings;