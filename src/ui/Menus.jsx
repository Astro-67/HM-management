import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
`;

const StyledList = styled.ul`
  position: absolute;
  z-index: 1000;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1.6rem;
  
  &:hover:not(:disabled) {
    background-color: var(--color-grey-50);
  }

  &:disabled {
    color: var(--color-grey-400);
    cursor: not-allowed;
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-600);
  }

  &:disabled svg {
    color: var(--color-grey-400);
  }
`;

// Create context
const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, close, open, position, setPosition }}>
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    
    openId === id ? close() : open(id);
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <>
      <MenuOverlay onClick={close} />
      <StyledList position={position} ref={ref}>
        {children}
      </StyledList>
    </>,
    document.body
  );
}

function Button({ children, icon, onClick, disabled }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    if (disabled) return;
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton 
        onClick={handleClick} 
        disabled={disabled}
        aria-disabled={disabled}
      >
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;