import Show from "../../types/Show";
import stripHtmlTags from "../../utils/stripHtmlTags";

interface ShowCardProp {
  item: Show;
  id: number;
  name: string;
  summary: string;
  onClick: (id: number | null) => void;
}

function ShowCard({
  item,
  id,
  name,
  summary,
  onClick,
}: ShowCardProp): JSX.Element {
  return (
    <article id={id.toString()}>
      <h3 className="card-header">{name}</h3>
      <div className="card-main">
        <div className="image-container">
          <img src={item.image.medium} alt={`${item.name}`} />
        </div>
        <div className="summary-pick">
          <button onClick={() => onClick(id)}>Pick</button>
          <p>{stripHtmlTags(summary)}</p>
        </div>
      </div>
    </article>
  );
}

export default ShowCard;