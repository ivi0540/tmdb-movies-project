import "./style.scss";

const RatingBadge = ({ rating = 0 }) => {
  const numRating = Number(rating);
  let color = `hsl(0, 100%, 40%)`;
  if (!isNaN(numRating) && numRating > 0 && numRating <= 10) {
    color = `hsl(${(numRating / 10) * 120}, 100%, 50%)`;
  }
  return (
    <div
      className="rating-badge"
      title={`Rating: ${numRating.toFixed(2)} / 10`}
      style={{
        backgroundColor: color,
      }}
    >
      {numRating.toFixed(2)}
    </div>
  );
};

export { RatingBadge };
