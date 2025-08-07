import styled from 'styled-components';

const StyledLogo = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  padding: 1.6rem 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 20%;
    right: 20%;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      var(--color-brand-200) 50%, 
      transparent 100%
    );
  }

  img {
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
    border: 2px solid var(--color-brand-200);
    padding: 0.4rem;
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    transition: all 0.3s;
    
    &:hover {
      transform: scale(1.05);
      border-color: var(--color-brand-500);
    }
  }

  span {
    font-size: 1.8rem;
    font-weight: 700;
    font-family: "Sono", monospace;
    color: var(--color-brand-700);
    letter-spacing: 1px;
    text-transform: uppercase;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background-color: var(--color-brand-500);
      transition: width 0.3s ease;
    }
    
    &:hover::before {
      width: 100%;
    }
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