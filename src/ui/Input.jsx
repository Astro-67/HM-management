import styled from 'styled-components'

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  
  &[type="number"] {
    width: 100%;
    padding-right: 1rem;
    
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: auto;
      margin: 0;
      opacity: 1;
    }
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }
`;

export default Input;