import Episode from "../types/Episode";
import Show from "../types/Show";
import filterEpisodes from "../utils/filterEpisodes";
import generateEpisodeCode from "../utils/generateEpisodeCode";
import EpisodeCard from "./EpisodeCard";
import EpisodeSelector from "./EpisodeSelector";

interface Props {
  searchTerm: string;
  setSearchTerm: (str: string) => void;
  episodeList: Episode[];
  setEpisodeList: (ep: Episode[]) => void;
  showList: Show[];
  setShowList: (shows: Show[]) => void;
  selectedShow?: Show;
  setSelectedShow: (show: Show) => void;
}

const PageMain = ({
  searchTerm,
  setSearchTerm,
  episodeList,
  setEpisodeList,
  showList,
  setShowList,
  selectedShow,
  setSelectedShow,
}: Props): JSX.Element => {
  const handleShowSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const selectedShows = showList.filter(
      (show) => show.id.toString() === e.target.value
    );
    setSelectedShow(selectedShows[0]);
  };

  return (
    <main>
      <select
        name="show"
        id="show-select"
        onChange={handleShowSelect}
        value={selectedShow?.id}
      >
        <option value="">Select a Show</option>
        {showList.map((show) => (
          <option key={show.id} value={show.id}>{`${show.name}`}</option>
        ))}
      </select>

      <EpisodeSelector
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        episodeList={episodeList}
        setEpisodeList={setEpisodeList}
        showList={showList}
        setShowList={setShowList}
        selectedShow={selectedShow}
        setSelectedShow={setSelectedShow}
      />
    </main>
  );
};

export default PageMain;