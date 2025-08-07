import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: var(--color-grey-0);
  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
