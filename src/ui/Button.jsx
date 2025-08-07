import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.6rem 1.2rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.6rem 3.2rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: white;
    background-color: var(--color-brand-600);
    font-weight: 500;

    &:hover:not(:disabled) {
      background-color: var(--color-brand-700);
      transform: translateY(-1px);
      box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
    }

    &:disabled {
      background-color: var(--color-grey-400);
      color: var(--color-grey-100);
    }
  `,
  secondary: css`
    color: var(--color-grey-700);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-300);
    font-weight: 500;

    &:hover:not(:disabled) {
      background-color: var(--color-grey-50);
      transform: translateY(-1px);
      box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.05);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.05);
    }

    &:disabled {
      background-color: var(--color-grey-200);
      color: var(--color-grey-500);
      border-color: var(--color-grey-200);
    }
  `,
  danger: css`
    color: #fff;
    background-color: #e53935;
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.15);
    transition: all 0.3s;
    font-weight: 600;
    border: 1px solid #c62828;

    &:hover:not(:disabled) {
      background-color: #c62828;
      box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
      color: #fff;
      transform: translateY(-1px);
      border-color: #b71c1c;
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      background-color: #b71c1c;
      box-shadow: 0 0.2rem 0.3rem rgba(0, 0, 0, 0.15);
    }

    &:focus:not(:disabled) {
      outline: 2px solid rgba(198, 40, 40, 0.5);
      outline-offset: 2px;
    }

    &:disabled {
      background-color: var(--color-grey-400);
      color: var(--color-grey-100);
      box-shadow: none;
      border-color: var(--color-grey-400);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  
  /* Base styles */
  font-size: 1.4rem;
  padding: 1.2rem 2.4rem;
  font-weight: 500;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  /* Default styles (primary) */
  color: var(--color-grey-0);
  background-color: var(--color-brand-600);
  
  &:hover:not(:disabled) {
    background-color: var(--color-brand-700);
  }

  /* Disabled state */
  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-grey-300);
    color: var(--color-grey-100);
  }

  /* Apply variations and sizes */
  ${(props) => props.size && sizes[props.size]}
  ${(props) => props.variation && variations[props.variation]}
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;