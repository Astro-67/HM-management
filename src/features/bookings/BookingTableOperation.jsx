import styled from "styled-components";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

function BookingTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-in", label: "Checked in" },
          { value: "checked-out", label: "Checked out" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (oldest first)" },
          { value: "totalPrice-desc", label: "Sort by amount (high first)" },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperation;