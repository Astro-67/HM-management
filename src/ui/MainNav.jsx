import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineCalendarDays, HiOutlineCog6Tooth, HiOutlineHome, HiOutlineHomeModern, HiOutlineUser } from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.4rem 2rem;
    transition: all 0.3s;
    border-radius: var(--border-radius-sm);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background-color: var(--color-brand-600);
      transform: scaleY(0);
      transition: transform 0.3s ease;
    }
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
    transform: translateX(4px);
    
    &::before {
      transform: scaleY(1);
    }
  }
  
  &.active:link,
  &.active:visited {
    background-color: var(--color-brand-50);
    color: var(--color-brand-700);
    font-weight: 600;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &.active svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <NavList>
      <li>
        <StyledNavLink to="/dashboard"><HiOutlineHome/> <span>Home</span></StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/bookings"> <HiOutlineCalendarDays/><span>Bookings</span></StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/cabins"><HiOutlineHomeModern/> <span> Cabins</span></StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/users"><HiOutlineUser/> <span>Users</span></StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/settings"><HiOutlineCog6Tooth/><span>Settings</span></StyledNavLink>
      </li>
    </NavList>
  );
}

export default MainNav;
