import styled from "styled-components";
import { useParams } from "react-router-dom";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import BookingDataBox from "./BookingDataBox";
import { useBookingDetails } from "./useBookingDetails";
import { useCheckout } from "../check-in-out/UseCheckInOut";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 2.4rem;
`;

function BookingDetails() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { isLoading, booking, error } = useBookingDetails(bookingId);
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading booking details: {error.message}</div>;

  function handleCheckout() {
    checkout(bookingId, {
      onSuccess: () => navigate("/bookings")
    });
  }

  return (
    <Modal>
      <Row type="horizontal">
        <Heading as="h1">Booking #{bookingId}</Heading>
        <ButtonGroup>
          <Button
            variation="secondary"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>

          {booking.status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
          )}

          {booking.status === "checked-in" && (
            <Button onClick={handleCheckout} disabled={isCheckingOut}>
              {isCheckingOut ? "Checking out..." : "Check out"}
            </Button>
          )}

          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
        </ButtonGroup>
      </Row>

      <BookingDataBox booking={booking} />
      
      <Modal.Window name="delete">
        <ConfirmDelete
          resourceName="booking"
          onConfirm={() => {
            deleteBooking(bookingId, {
              onSuccess: () => navigate("/bookings")
            });
          }}
          disabled={isDeleting}
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingDetails;