import { useState, useMemo } from "react";
import { ImageLightbox } from "../ImageLightbox/ImageLightbox";

import "./style.scss";

const MoviePosters = ({ images: moviePosters }) => {
  const groupedPosters = useMemo(() => {
    return moviePosters?.posters || [];
  }, [moviePosters]);

  const [postersConfig, setPostersConfig] = useState({
    showAll: false,
    visibleCount: 4,
  });

  const [selectedPosterIndex, setSelectedPosterIndex] = useState(null);

  const displayedPosters = useMemo(() => {
    return postersConfig.showAll
      ? groupedPosters
      : groupedPosters.slice(0, postersConfig.visibleCount);
  }, [groupedPosters, postersConfig.showAll, postersConfig.visibleCount]);

  const openLightbox = (indexImage) => {
    setSelectedPosterIndex(indexImage);
  };

  const clickShowAll = () => {
    setPostersConfig((prev) => ({ ...prev, showAll: !prev.showAll }));
  };

  return displayedPosters.length === 0 ? null : (
    <div className="posters-container">
      <h2 className="posters-container__category">Posters</h2>
      <div className="posters-container__posters">
        {displayedPosters.map((item, index) => {
          return (
            <div
              key={`${item.file_path}-${index}`}
              className="posters-container__wrapper-item"
              onClick={() => openLightbox(index)}
            >
              <img
                className="posters-container__image-item"
                src={`https://image.tmdb.org/t/p/w780${item.file_path}`}
                alt={`Movie poster ${index + 1}`}
              />
            </div>
          );
        })}
      </div>
      {groupedPosters.length > postersConfig.visibleCount && (
        <button
          className="posters-container__showAllBtn"
          onClick={clickShowAll}
        >
          {postersConfig.showAll
            ? "Close"
            : `Show All (${groupedPosters.length})`}
        </button>
      )}
      <ImageLightbox
        selectedImageIndex={selectedPosterIndex}
        setSelectedImageIndex={setSelectedPosterIndex}
        groupedImages={groupedPosters}
      />
    </div>
  );
};

export { MoviePosters };
