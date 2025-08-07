import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 4.8rem 0;
`;

const StyledSpinner = styled.div`
  width: 6.4rem;
  height: 6.4rem;
  border: 5px solid var(--color-grey-100);
  border-top: 5px solid var(--color-brand-600);
  border-radius: 50%;
  animation: ${rotate} 1.5s infinite linear;
`;

function Spinner() {
  return (
    <SpinnerContainer>
      <StyledSpinner />
    </SpinnerContainer>
  );
}

export default Spinner;