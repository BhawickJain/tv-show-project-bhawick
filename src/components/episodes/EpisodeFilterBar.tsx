import { useEffect, useState } from "react";
import Episode from "../../types/Episode";
import generateEpisodeCode from "../../utils/episodes/generateEpisodeCode";

interface EpisodeSelectorProps {
  itemType: string;
  itemDisplay: number[];
  setItemDisplay: (ids: number[]) => void;
  itemList: Episode[];
  itemSearchFunction: (searchTerm: string, itemList: Episode[]) => number[];
  selectedItem: number | null;
  setSelectedItem: (id: number | null) => void;
}

const EpisodeFilterBar = ({
  itemType,
  itemDisplay,
  setItemDisplay,
  itemList,
  itemSearchFunction,
  selectedItem,
  setSelectedItem,
}: EpisodeSelectorProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownSelection, setDropdownSelection] = useState("");

  useEffect(() => {
    if (selectedItem !== null) {
      setDropdownSelection(selectedItem.toString());
    }
  }, [selectedItem]);
  function dropdownEpisodeName(el: Episode) {
    return `${generateEpisodeCode(el)} - ${el.name}`;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemDisplay(itemSearchFunction(e.target.value, itemList));
    setSearchTerm(e.target.value);
    setDropdownSelection("");
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(`${e.target.value} << DropDown Menu Selected`);
    if (e.target.value === "") {
      setItemDisplay(itemList.map((item) => item.id));
      setDropdownSelection("");
      setSelectedItem(null);
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
    setDropdownSelection("");
    setSearchTerm("");
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
        name="episode"
        id="episode-select"
        onChange={handleSelect}
        value={dropdownSelection}
      >
        <option value="">Select All</option>
        {itemList.map((el) => (
          <option key={el.id} value={el.id}>
            {dropdownEpisodeName(el)}
          </option>
        ))}
      </select>
    </section>
  );
};

export default EpisodeFilterBar;
