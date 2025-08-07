// filepath: /home/astro/ReactProject/HM-System/src/ui/ButtonIcon.jsx
import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.8rem;
  border-radius: var(--border-radius-md);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--border-radius-md);
    background: var(--color-grey-100);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-1px);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(0);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-600);
    transition: all 0.3s;
    position: relative;
    z-index: 1;
  }
  
  &:hover svg {
    color: var(--color-brand-600);
    transform: scale(1.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    transform: none;
    
    &:hover {
      transform: none;
      
      &::before {
        opacity: 0;
      }
      
      svg {
        transform: none;
        color: var(--color-grey-400);
      }
    }
  }
`;

export default ButtonIcon;