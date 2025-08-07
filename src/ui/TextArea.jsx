import styled from "styled-components";

const TextArea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 8rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--color-grey-600);
  }

  &:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }
`;

export default TextArea;