import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";
import styled from "styled-components";

const StyledToggle = styled(ButtonIcon)`
  padding: 0.5rem;
  
  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-600);
    transition: all 0.3s;
  }

  &:hover svg {
    color: var(--color-brand-600);
  }
`;

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <StyledToggle onClick={toggleDarkMode} title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </StyledToggle>
  );
}

export default DarkModeToggle;
