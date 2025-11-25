import { useEffect, useCallback } from "react";
import "./style.scss";

const ImageLightbox = ({
  selectedImageIndex,
  setSelectedImageIndex,
  groupedImages,
}) => {
  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
  }, [setSelectedImageIndex]);

  const nextImage = useCallback(() => {
    if (selectedImageIndex < groupedImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  }, [selectedImageIndex, setSelectedImageIndex, groupedImages.length]);

  const previousImage = useCallback(() => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  }, [selectedImageIndex, setSelectedImageIndex]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
      if (e.key === "ArrowLeft") {
        previousImage();
      }
      if (e.key === "ArrowRight") {
        nextImage();
      }
    };
    if (selectedImageIndex !== null) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [
    selectedImageIndex,
    groupedImages,
    closeLightbox,
    nextImage,
    previousImage,
  ]);

  if (selectedImageIndex === null) {
    return null;
  }
  const currentImage = groupedImages[selectedImageIndex];

  if (!currentImage) {
    return null;
  }

  const widthImage = currentImage.aspect_ratio > 1 ? "70%" : "28%";

  return (
    <div className="image-fullSize-container">
      <div className="image-fullSize-container__black-wrapper">
        <div className="image-fullSize-container__content">
          <div
            className="image-fullSize-container__btn-container"
            style={{
              width: widthImage,
            }}
          >
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
            style={{
              width: widthImage,
              aspectRatio: currentImage.aspect_ratio,
            }}
            src={`https://image.tmdb.org/t/p/original${currentImage.file_path}`}
            alt="Full size"
          />
        </div>
      </div>
    </div>
  );
};

export { ImageLightbox };