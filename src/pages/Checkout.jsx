import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import BookingDataBox from "../features/bookings/BookingDataBox";
import { useBookingDetails } from "../features/bookings/useBookingDetails";
import { useCheckout } from "../features/check-in-out/UseCheckInOut";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function Checkout() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { isLoading, booking, error } = useBookingDetails(bookingId);
  const { checkout, isCheckingOut } = useCheckout();
  
  useEffect(() => {
    // Redirect if the booking is not in checked-in status
    if (booking && booking.status !== "checked-in") {
      navigate("/bookings");
    }
  }, [booking, navigate]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading booking: {error.message}</div>;
  if (!booking) return <div>No booking found</div>;

  function handleCheckout() {
    checkout(bookingId, {
      onSuccess: () => {
        navigate("/bookings");
      },
    });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check out booking #{bookingId}</Heading>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'flex-end', marginTop: '1.6rem' }}>
          <Button variation="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button onClick={handleCheckout} disabled={isCheckingOut}>
            {isCheckingOut ? "Processing..." : "Confirm check out"}
          </Button>
        </div>
      </Box>
    </>
  );
}

export default Checkout;
