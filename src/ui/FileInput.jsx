import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--color-brand-600);
    color: var(--color-grey-0);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
      color: var(--color-grey-0);
    }
  }

  /* Disabled state styling */
  &:disabled {
    cursor: not-allowed;
    
    &::file-selector-button {
      cursor: not-allowed;
      background-color: var(--color-grey-300);
      border: 1px solid var(--color-grey-300);
      color: var(--color-grey-100);
    }
  }
`;

export default FileInput;