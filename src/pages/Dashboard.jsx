import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import TodayActivity from "../features/check-in-out/TodayActivity";

const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

// Activity column takes the entire height
const StyledTodayActivity = styled.div`
  grid-column: 2;
  grid-row: 1 / -1;
`;

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
      </Row>

      <StyledDashboard>
        {/* Left side - Will be for stats/charts later */}
        <div>
          {/* Placeholder for future dashboard data */}
          <Heading as="h2">Statistics</Heading>
          <p>Coming soon...</p>
        </div>

        {/* Right side */}
        <StyledTodayActivity>
          <TodayActivity />
        </StyledTodayActivity>
      </StyledDashboard>
    </>
  );
}

export default Dashboard;
