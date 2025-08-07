import styled from "styled-components";
import { format } from "date-fns";
import {
  HiOutlineCalendarDays,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
  HiOutlineMoon,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineEnvelope,
  HiOutlineIdentification,
  HiOutlineCake
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.4rem;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
`;

const Status = styled.span`
  background-color: var(--color-${(props) => props.type}-100);
  color: var(--color-${(props) => props.type}-700);
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  font-weight: 600;
  font-size: 1.4rem;
  text-transform: uppercase;
`;

const DataBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2.4rem 2.4rem;
`;

// We want to receive the booking data here directly
function BookingDataBox({ booking }) {
  // Early return if booking data is not available
  if (!booking) return null;

  const {
    // Remove the id since it's not used
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    isPaid,
    cabins,
    guests,
    hasBreakfast = false,
    extrasPrice = 0,
  } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  // Calculate cabin price (total price minus extras)
  const cabinPrice = totalPrice - extrasPrice;

  return (
    <StyledBookingDataBox>
      <Header>
        <Title>Stay details</Title>
        <Status type={statusToTagName[status]}>
          {status.replace("-", " ")}
        </Status>
      </Header>

      <DataBox>
        {/* Stay information */}
        <DataItem
          icon={<HiOutlineCalendarDays />}
          label="Check-in"
          value={startDate ? format(new Date(startDate), "EEE, MMM dd yyyy") : "N/A"}
        />
        <DataItem
          icon={<HiOutlineCalendarDays />}
          label="Check-out"
          value={endDate ? format(new Date(endDate), "EEE, MMM dd yyyy") : "N/A"}
        />
        <DataItem 
          icon={<HiOutlineMoon />} 
          label="Nights"
          value={numNights} 
        />
        <DataItem
          icon={<HiOutlineHomeModern />}
          label="Cabin"
          value={cabins?.name || "Unknown cabin"}
        />

        {/* Guest information */}
        <DataItem
          icon={<HiOutlineUser />}
          label="Guest name"
          value={guests?.fullName || "Unknown guest"}
        />
        <DataItem
          icon={<HiOutlineUsers />}
          label="Number of guests"
          value={numGuests}
        />
        <DataItem
          icon={<HiOutlineEnvelope />}
          label="Email"
          value={guests?.email || "No email provided"}
        />
        <DataItem
          icon={<HiOutlineIdentification />}
          label="National ID"
          value={guests?.nationalID || "Not provided"}
        />

        {/* Breakfast information */}
        <DataItem
          icon={<HiOutlineCake />}
          label="Breakfast included"
          value={hasBreakfast ? "Yes" : "No"}
        />
        
        {/* Payment information */}
        <DataItem
          icon={<HiOutlineCurrencyDollar />}
          label="Cabin price"
          value={`$${cabinPrice}`}
        />
        {hasBreakfast && (
          <DataItem
            icon={<HiOutlineCurrencyDollar />}
            label="Breakfast price"
            value={`$${extrasPrice}`}
          />
        )}
        <DataItem
          icon={<HiOutlineCurrencyDollar />}
          label="Total price"
          value={`$${totalPrice} ${hasBreakfast ? `(Cabin: $${cabinPrice} + Breakfast: $${extrasPrice})` : ''}`}
        />
        <DataItem
          icon={<HiOutlineCurrencyDollar />}
          label="Payment status"
          value={
            <Status type={isPaid ? "green" : "red"}>
              {isPaid ? "Paid" : "Not paid"}
            </Status>
          }
        />
      </DataBox>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;