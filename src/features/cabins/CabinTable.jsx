import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

export default function CabinTable() {
  const { isLoading, error, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  
  // 1. Filter cabins based on discount filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins = cabins;
  if (filterValue === "with-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
  }
  if (filterValue === "no-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  }

  // 2. Sort cabins based on selected sort criteria
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  
  const sortedCabins = filteredCabins?.sort((a, b) => {
    let comparison = 0;
    
    if (field === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (field === "price") {
      comparison = a.regularPrice - b.regularPrice;
    } else if (field === "capacity") {
      comparison = a.maxCapacity - b.maxCapacity;
    }
    
    return direction === "asc" ? comparison : -comparison;
  });

  if (isLoading) return <Spinner />;

  if (error) return <div>Error loading cabins...</div>;

  const columns = "0.6fr 1.6fr 2.2fr 1fr 1fr 0.2fr";

  return (
    <Menus>
      <Table columns={columns}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
         
        </Table.Header>
        <Table.Body 
          data={sortedCabins} 
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
