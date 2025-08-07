import styled from "styled-components";

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const Label = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  font-weight: 500;
`;

const Value = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  font-family: "Sono";
  color: var(--color-grey-700);
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border-radius: 50%;
  background-color: var(--color-grey-100);
  color: var(--color-grey-600);

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

const DataItem = ({ icon, label, value }) => {
  return (
    <StyledDataItem>
      <Icon>{icon}</Icon>
      <div>
        <Label>{label}</Label>
        <Value>{value}</Value>
      </div>
    </StyledDataItem>
  );
};

export default DataItem;
