import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  display: flex;
  gap: 0.8rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  padding: 0.4rem;
  box-shadow: var(--shadow-sm);
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;
  cursor: pointer;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  &:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: 1px;
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    
    // Reset to page 1 when changing filters
    if (searchParams.has("page")) {
      searchParams.set("page", 1);
    }
    
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;