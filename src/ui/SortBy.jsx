import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || options[0].value;

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    
    // Reset to page 1 when changing sort order
    if (searchParams.has("page")) {
      searchParams.set("page", 1);
    }
    
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={sortBy}
      onChange={handleChange}
      type="white"
    />
  );
}

export default SortBy;