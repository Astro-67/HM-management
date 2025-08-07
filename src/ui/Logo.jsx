import styled from 'styled-components';

const StyledLogo = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;

  img {
    height: 10rem;  /* Increased from 5.2rem */
    width: 10rem;
    border-radius: 50%;
    border: 1px solid;    /* Removed border */
    padding: 0.4rem;
    background-color: var(--color-grey-0);
  }

  span {
    font-size: 2.2rem;
    font-weight: var(--font-weight-700);
    font-family: "Sono";
    color: var(--color-grey-600);  /* Changed from brand color to grey */
    letter-spacing: 0.3px;
  }
`;

function Logo() {
  return (
    <StyledLogo>
      <img src="logo.png" alt="Hotel Management Logo" />
      <span>HM SYSTEM</span>
    </StyledLogo>
  );
}

export default Logo;