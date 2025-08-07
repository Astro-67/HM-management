// filepath: /home/astro/ReactProject/HM-System/src/ui/HeaderMenu.jsx
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import UserAvatar from "../features/authentication/UserAvatar";
import Logout from "../features/authentication/Logout";

const StyledHeaderMenu = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  padding: 0.8rem 1.2rem;
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-200);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s;
  
  &:hover {
    background-color: var(--color-grey-100);
    box-shadow: var(--shadow-md);
  }
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <UserAvatar />
      <ButtonIcon onClick={() => navigate("/account")} >
        <HiOutlineUser />
      </ButtonIcon>
      <Logout />
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;