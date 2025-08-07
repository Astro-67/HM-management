// filepath: /home/astro/ReactProject/HM-System/src/ui/HeaderMenu.jsx
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import UserAvatar from "../features/authentication/UserAvatar";
import Logout from "../features/authentication/Logout";

const StyledHeaderMenu = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
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