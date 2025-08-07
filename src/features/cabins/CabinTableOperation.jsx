import styled from "styled-components";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const FilterLabel = styled.div`
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With discount" },
          { value: "no-discount", label: "No discount" },
        ]}
      />
      <SortBy 
        options={[
          { value: "name-asc", label: "Name (A-Z)" },
          { value: "name-desc", label: "Name (Z-A)" },
          { value: "price-asc", label: "Price (low first)" },
          { value: "price-desc", label: "Price (high first)" },
          { value: "capacity-asc", label: "Capacity (low first)" },
          { value: "capacity-desc", label: "Capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;