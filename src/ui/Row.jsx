import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  
  ${(props) =>
    (props.type === "horizontal" || !props.type) &&
    css`
      justify-content: space-between;
      align-items: center;
      gap: 2.4rem;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical"
};

export default Row;