import styled from "styled-components";

const TagColors = {
  blue: {
    backgroundColor: "var(--color-blue-100)",
    color: "var(--color-blue-700)",
  },
  green: {
    backgroundColor: "var(--color-green-100)",
    color: "var(--color-green-700)",
  },
  silver: {
    backgroundColor: "var(--color-grey-100)",
    color: "var(--color-grey-700)",
  },
  red: {
    backgroundColor: "var(--color-red-100)",
    color: "var(--color-red-700)",
  },
};

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  
  /* Default styles if type is not specified */
  background-color: var(--color-grey-100);
  color: var(--color-grey-700);

  /* Apply styles based on tag type */
  ${(props) => props.type && TagColors[props.type] && `
    background-color: ${TagColors[props.type].backgroundColor};
    color: ${TagColors[props.type].color};
  `}
`;

export default Tag;
