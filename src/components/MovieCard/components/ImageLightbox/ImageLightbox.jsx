import { useEffect } from "react";
import "./style.scss";

const ImageLightbox = ({ selectedImageIndex, setSelectedImageIndex, groupedImages }) => {
  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };
  const nextImage = () => {
    selectedImageIndex < groupedImages.length - 1 &&
      setSelectedImageIndex(selectedImageIndex + 1);
  };
  const previousImage = () => {
    selectedImageIndex > 0 && setSelectedImageIndex(selectedImageIndex - 1);
  };

  useEffect(() => {
    document.body.style.overflow = selectedImageIndex !== null ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImageIndex]);

  return (
    selectedImageIndex !== null &&
    groupedImages[selectedImageIndex] && (
      <div className="image-fullSize-container">
        <div className="image-fullSize-container__black-wrapper">
          <div className="image-fullSize-container__content">
            <div className="image-fullSize-container__btn-container">
              <button
                type="button"
                className="image-fullSize-container__btn-pre"
                onClick={previousImage}
                disabled={selectedImageIndex === 0}
              >
                PRE
              </button>
              <button
                type="button"
                className="image-fullSize-container__btn-next"
                onClick={nextImage}
                disabled={selectedImageIndex === groupedImages.length - 1}
              >
                NEXT
              </button>
              <button
                type="button"
                className="image-fullSize-container__btn-close"
                onClick={closeLightbox}
              >
                Close
              </button>
            </div>
            <img
              className="image-fullSize-container__image"
              src={`https://image.tmdb.org/t/p/original${groupedImages[selectedImageIndex].file_path}`}
              alt="Full size"
            />
          </div>
        </div>
      </div>
    )
  );
};

export { ImageLightbox };
