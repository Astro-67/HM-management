import styled from 'styled-components'
import MainNav from './MainNav'
import Logo from './Logo'
import DataUploader from '../data/DataUploader'

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 2.4rem 1.6rem;
  border-right: 1px solid var(--color-grey-200);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  height: 100%;
  box-shadow: var(--shadow-sm);
  position: relative;
  z-index: 50;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -1px;
    bottom: 0;
    width: 1px;
    background: linear-gradient(180deg, 
      var(--color-brand-200) 0%, 
      var(--color-brand-100) 30%, 
      transparent  50%, 
      var(--color-brand-100) 70%, 
      var(--color-brand-200) 100%
    );
  }
`

function Sidebar() {
  return (
    <StyledSidebar>
        <Logo/>
      <MainNav />
    </StyledSidebar>
  )
}

export default Sidebar