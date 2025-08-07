import styled from "styled-components";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import { useTodayActivity } from "./UseCheckInOut";
import CheckinBooking from "./CheckinBooking";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { HiArrowRightOnRectangle, HiArrowLeftOnRectangle } from "react-icons/hi2";
import { format } from "date-fns";
import CheckoutButton from "./CheckoutButton";

const StyledToday = styled.div`
  /* Basic styles for the component */
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  gap: 2.4rem;
  height: 100%;
  overflow: auto;
`;

const TodaySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const SectionHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  & h3 {
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

const BookingList = styled.ul`
  overflow: auto;
  overflow-x: hidden;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const NoActivities = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  margin-top: 1.6rem;
  color: var(--color-grey-500);
`;

const TodayDate = styled.time`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
`;

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();
  const navigate = useNavigate();
  const today = format(new Date(), "EEEE, MMMM do yyyy");

  if (isLoading) return <Spinner />;

  const { checkIns = [], checkOuts = [] } = activities || {};
  
  // Calculate counts
  const numCheckIns = checkIns.length;
  const numCheckOuts = checkOuts.length;
  
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today's Activity</Heading>
        <TodayDate>{today}</TodayDate>
      </Row>

      <Row type="vertical">
        {/* CHECK IN SECTION */}
        <TodaySection>
          <SectionHeading>
            <h3>Check-ins {numCheckIns > 0 && `(${numCheckIns})`}</h3>
          </SectionHeading>
          
          {numCheckIns > 0 ? (
            <BookingList>
              {checkIns.map(booking => (
                <CheckinBooking
                  key={booking.id}
                  booking={booking}
                  type="check-in"
                >
                  <Button
                    size="small"
                    variation="primary"
                    onClick={() => navigate(`/checkin/${booking.id}`)}
                  >
                    <HiArrowRightOnRectangle /> Check in
                  </Button>
                </CheckinBooking>
              ))}
            </BookingList>
          ) : (
            <NoActivities>No check-ins today</NoActivities>
          )}
        </TodaySection>

        {/* CHECK OUT SECTION */}
        <TodaySection>
          <SectionHeading>
            <h3>Check-outs {numCheckOuts > 0 && `(${numCheckOuts})`}</h3>
          </SectionHeading>
          
          {numCheckOuts > 0 ? (
            <BookingList>
              {checkOuts.map(booking => (
                <CheckinBooking
                  key={booking.id}
                  booking={booking}
                  type="check-out"
                >
                  <CheckoutButton bookingId={booking.id} />
                </CheckinBooking>
              ))}
            </BookingList>
          ) : (
            <NoActivities>No check-outs today</NoActivities>
          )}
        </TodaySection>
      </Row>
    </StyledToday>
  );
}

export default TodayActivity;
