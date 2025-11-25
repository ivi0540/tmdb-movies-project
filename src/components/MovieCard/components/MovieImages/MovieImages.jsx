import { useState, useMemo } from "react";
import { ImageLightbox } from "../ImageLightbox/ImageLightbox";
import "./style.scss";

const MovieImages = ({ images: movieImages }) => {
  const groupedImages = useMemo(
    () => movieImages?.backdrops || [],
    [movieImages]
  );

  const [imagesConfig, setImagesConfig] = useState({
    showAll: false,
    visibleCount: 4,
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const displayedImages = useMemo(() => {
    return imagesConfig.showAll
      ? groupedImages
      : groupedImages.slice(0, imagesConfig.visibleCount);
  }, [groupedImages, imagesConfig.showAll, imagesConfig.visibleCount]);

  const openLightbox = (indexImage) => {
    setSelectedImageIndex(indexImage);
  };

  const clickShowAll = () => {
    setImagesConfig((prev) => ({ ...prev, showAll: !prev.showAll }));
  };

  return displayedImages.length === 0 ? null : (
    <div className="images-container">
      <h2 className="images-container__category">Images</h2>
      <div className="images-container__images">
        {displayedImages.map((item, index) => {
          return (
            <div
              key={`${item.file_path}-${index}`}
              className="images-container__wrapper-item"
              onClick={() => openLightbox(index)}
            >
              <img
                className="images-container__image-item"
                src={`https://image.tmdb.org/t/p/w780${item.file_path}`}
                alt={`Movie scene ${index + 1} of ${displayedImages.length}`}
              />
            </div>
          );
        })}
      </div>
      {groupedImages.length > imagesConfig.visibleCount && (
        <button className="images-container__showAllBtn" onClick={clickShowAll}>
          {!imagesConfig.showAll
            ? `Show All (${groupedImages.length}) `
            : "Close"}
        </button>
      )}

      <ImageLightbox
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
        groupedImages={groupedImages}
      />
    </div>
  );
};

export { MovieImages };
