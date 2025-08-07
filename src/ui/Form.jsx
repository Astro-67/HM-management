import styled, { css } from "styled-components";

const Form = styled.form`
  font-size: 1.4rem;
  overflow: hidden;

  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      @media (max-width: 768px) {
        padding: 1.6rem 2rem;
      }
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
      max-width: 95vw;

      @media (max-width: 768px) {
        width: 100%;
        margin: 0 auto;
      }
    `}

  ${(props) =>
    props.type === "default" &&
    css`
      padding: 2.4rem 4rem;

      @media (max-width: 768px) {
        padding: 1.6rem 2rem;
      }
    `}

  /* Global responsive adjustments */
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

Form.defaultProps = {
  type: "regular"
};

export default Form;