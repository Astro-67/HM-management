import styled from "styled-components";
import Tag from "../../ui/Tag";
import { format } from "date-fns";

const StyledBookingItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 1fr 12rem;
  gap: 1.2rem;
  align-items: center;
  
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  padding: 1.2rem 1.6rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const GuestInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Guest = styled.span`
  font-weight: 500;
`;

const BookingId = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-500);
`;

const NightInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Nights = styled.span`
  font-weight: 500;
`;

const Dates = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-500);
`;

const StyledButton = styled.div`
  width: 100%;
  text-align: right;
`;

function CheckinBooking({ booking, type = "check-in", children }) {
  if (!booking) return null;

  const {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    guests: guestsData,
    totalPrice,
    cabins: cabinsData
  } = booking;

  // Format dates
  const formattedStartDate = format(new Date(startDate), "MMM dd");
  const formattedEndDate = format(new Date(endDate), "MMM dd, yyyy");

  // Extract guest and cabin info
  const guestName = guestsData?.fullName || "Unknown guest";
  const cabinName = cabinsData?.name || "Unknown cabin";

  return (
    <StyledBookingItem>
      {/* Tag showing cabin name */}
      <Tag type={type === "check-in" ? "blue" : "green"}>
        {type === "check-in" ? "Check in" : "Check out"}
      </Tag>

      {/* Guest information */}
      <GuestInfo>
        <Guest>{guestName}</Guest>
        <BookingId>Booking #{bookingId} • {cabinName}</BookingId>
      </GuestInfo>

      {/* Stay information and buttons */}
      <NightInfo>
        <Nights>{numNights} nights • ${totalPrice}</Nights>
        <Dates>
          {formattedStartDate} &mdash; {formattedEndDate}
        </Dates>
      </NightInfo>

      {/* Action button (passed as children) */}
      {children}
    </StyledBookingItem>
  );
}

export default CheckinBooking;
