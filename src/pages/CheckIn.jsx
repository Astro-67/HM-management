import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import BookingDataBox from "../features/bookings/BookingDataBox";
import { useBookingDetails } from "../features/bookings/useBookingDetails";
import { useCheckin } from "../features/check-in-out/UseCheckInOut";
import { useSettings } from "../features/settings/useSettings";

const CheckInContainer = styled.div`
  padding: 2.4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 2.4rem;
  justify-content: flex-end;
`;

const InfoText = styled.p`
  color: var(--color-grey-500);
  margin-bottom: 1.6rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  font-size: 1.6rem;
  margin-bottom: 2rem;
  
  & input[type="checkbox"] {
    height: 2rem;
    width: 2rem;
    accent-color: var(--color-brand-600);
    cursor: pointer;
  }
`;

const PaymentStatus = styled.span`
  display: inline-block;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  font-weight: 600;
  font-size: 1.4rem;
  margin-left: 1.2rem;
  background-color: ${props => props.isPaid ? 'var(--color-green-100)' : 'var(--color-red-100)'};
  color: ${props => props.isPaid ? 'var(--color-green-700)' : 'var(--color-red-700)'};
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  padding: 1.6rem 2.4rem;
  margin: 1.6rem 0;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-sm);

  & p:first-child {
    margin-right: auto;
    font-weight: 500;
  }

  & p:last-child {
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

const OptionalBreakfast = styled.div`
  padding-bottom: 1.2rem;
  margin-bottom: 2.4rem;
  border-bottom: 1px solid var(--color-grey-300);
`;

function CheckIn() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { isLoading: isLoadingBooking, booking, error } = useBookingDetails(bookingId);
  const { isLoading: isLoadingSettings, settings } = useSettings();
  const { checkin, isCheckingIn } = useCheckin();
  
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [breakfastPrice, setBreakfastPrice] = useState(0);
  
  // Set initial states when booking data loads
  useEffect(() => {
    if (booking) {
      setConfirmPaid(booking.isPaid || false);
      setAddBreakfast(booking.hasBreakfast || false);
      setOriginalPrice(booking.totalPrice);
      setTotalPrice(booking.totalPrice);
      
      // Initialize breakfast price
      if (settings?.breakfastPrice && booking.numNights && booking.numGuests) {
        const calculatedBreakfastPrice = 
          settings.breakfastPrice * booking.numNights * booking.numGuests;
        setBreakfastPrice(calculatedBreakfastPrice);
      }
    }
  }, [booking, settings]);

  // Recalculate price when breakfast option changes
  useEffect(() => {
    if (addBreakfast && !booking?.hasBreakfast) {
      setTotalPrice(originalPrice + breakfastPrice);
      setConfirmPaid(false); // Reset payment confirmation when adding breakfast
    } else {
      setTotalPrice(originalPrice);
    }
  }, [addBreakfast, originalPrice, breakfastPrice, booking?.hasBreakfast]);

  const isLoading = isLoadingBooking || isLoadingSettings;
  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading booking: {error.message}</div>;

  function handleCheckIn() {
    // Update the booking with payment status, check in, and breakfast info
    const bookingData = {
      isPaid: confirmPaid,
      hasBreakfast: addBreakfast,
      extrasPrice: addBreakfast ? breakfastPrice : 0,
      totalPrice: totalPrice,
    };
    
    checkin({ 
      bookingId, 
      bookingData
    }, {
      onSuccess: () => navigate("/bookings"),
    });
  }

  const hasBreakfastAlready = booking?.hasBreakfast;
  const cabinPrice = booking?.totalPrice - (booking?.extrasPrice || 0);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
      </Row>

      {/* Show booking with updated breakfast and price information for preview */}
      <BookingDataBox 
        booking={{
          ...booking,
          hasBreakfast: hasBreakfastAlready || addBreakfast,
          extrasPrice: (hasBreakfastAlready || addBreakfast) ? breakfastPrice : 0,
          totalPrice: totalPrice
        }}
      />

      <CheckInContainer>
        <InfoText>
          Collect payment and verify guest identity before completing check-in.
        </InfoText>
        
        {/* Breakfast option */}
        {!hasBreakfastAlready && (
          <OptionalBreakfast>
            <CheckboxLabel>
              <input 
                type="checkbox" 
                id="breakfast"
                checked={addBreakfast}
                onChange={() => setAddBreakfast(prev => !prev)}
              />
              <span>
                Add breakfast for ${settings.breakfastPrice} per guest/day?
              </span>
            </CheckboxLabel>
            
            {/* Price breakdown */}
            {addBreakfast && (
              <>
                <Price>
                  <p>Cabin price:</p>
                  <p>${cabinPrice}</p>
                </Price>
                <Price>
                  <p>Breakfast price:</p>
                  <p>${breakfastPrice}</p>
                </Price>
                <Price>
                  <p>Total price:</p>
                  <p>${totalPrice}</p>
                </Price>
              </>
            )}
          </OptionalBreakfast>
        )}
        
        {/* Payment confirmation section */}
        <CheckboxLabel>
          <input 
            type="checkbox" 
            checked={confirmPaid} 
            onChange={() => setConfirmPaid(prev => !prev)} 
            id="confirm-payment"
          />
          <span>I confirm that {booking.guests?.fullName} has paid the total amount of ${totalPrice}</span>
          <PaymentStatus isPaid={confirmPaid}>
            {confirmPaid ? "Paid" : "Not paid"}
          </PaymentStatus>
        </CheckboxLabel>

        <ButtonGroup>
          <Button 
            variation="secondary" 
            onClick={() => navigate(-1)} 
            disabled={isCheckingIn}
          >
            Back
          </Button>
          <Button 
            onClick={handleCheckIn} 
            disabled={isCheckingIn || !confirmPaid}
          >
            {isCheckingIn ? "Processing..." : "Complete check-in"}
          </Button>
        </ButtonGroup>
      </CheckInContainer>
    </>
  );
}

export default CheckIn;