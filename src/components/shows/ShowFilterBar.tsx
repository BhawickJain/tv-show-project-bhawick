import { useEffect, useState } from "react";
import Show from "../../types/Show";
import searchShow from "../../utils/shows/searchShows";

interface ShowFilterBarProps {
  itemType: string;
  itemDisplay: number[];
  setItemDisplay: (ids: number[]) => void;
  itemList: Show[];
  selectedItem: number | null;
  setSelectedItem: (id: number | null) => void;
}

const ShowFilterBar = ({
  itemType,
  itemDisplay,
  setItemDisplay,
  itemList,
  selectedItem,
  setSelectedItem,
}: ShowFilterBarProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownSelection, setDropdownSelection] = useState("");

  useEffect(() => {
    if (selectedItem !== null) {
      setDropdownSelection(selectedItem.toString());
    }
  }, [selectedItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemDisplay(searchShow(e.target.value, itemList));
    setSearchTerm(e.target.value);
    setDropdownSelection("");
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(`${e.target.value} << DropDown Menu Selected`);
    if (e.target.value === "") {
      setItemDisplay(itemList.map((item) => item.id));
      setSelectedItem(null);
      setDropdownSelection("");
    } else {
      const id = parseInt(e.target.value);
      setItemDisplay([id]);
      setDropdownSelection(id.toString());
      setSelectedItem(id);
    }
  };

  const handleReset = () => {
    setItemDisplay(itemList.map((item) => item.id));
    setSelectedItem(null);
    setSearchTerm("");
    setDropdownSelection("");
  };

  return (
    <section className={`${itemType.toLowerCase()} filter-bar`}>
      <button onClick={handleReset}>reset search</button>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={`search ${itemType.toLowerCase()}s...`}
      />
      <select
        name="show"
        id="show-select"
        onChange={handleSelect}
        value={dropdownSelection}
      >
        <option value="">Select All</option>
        {itemList.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
    </section>
  );
};

export default ShowFilterBar;
