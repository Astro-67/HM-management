import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import HeaderMenu from './HeaderMenu';
import DarkModeToggle from './DarkModeToggle';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.6rem 3.2rem;
  border-bottom: 1px solid var(--color-grey-200);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.6rem;
  box-shadow: var(--shadow-sm);
  position: relative;
  z-index: 100;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      var(--color-brand-200) 20%, 
      var(--color-brand-300) 50%, 
      var(--color-brand-200) 80%, 
      transparent 100%
    );
  }
`;

export default function Header() {
  const { user } = useUser();
  
  return (
    <StyledHeader>
     
      {user && <HeaderMenu />}
       <DarkModeToggle />
    </StyledHeader>
  );
}
