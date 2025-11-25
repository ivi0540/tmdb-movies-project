import { useState, useMemo } from "react";
import "./style.scss";

const MovieVideos = ({ videos: movieVideos = {} }) => {
  const [videosConfig, setVideosConfig] = useState({
    openCategories: [],
    visibleCount: 4,
  });

  const groupedVideos = useMemo(() => {
    if (!movieVideos?.results?.length) {
      return {};
    }
    return movieVideos.results.reduce((result, item) => {
      if (item.site === "YouTube" && item.type) {
        result[item.type] = result[item.type] || [];
        result[item.type].push(item);
      }
      return result;
    }, {});
  }, [movieVideos]);

  const clickShowAll = (category) => {
    if (typeof category !== "string") {
      return;
    }
    setVideosConfig((prev) => ({
      ...prev,
      openCategories: prev.openCategories.includes(category)
        ? prev.openCategories.filter((item) => item !== category)
        : [...prev.openCategories, category],
    }));
  };

  return (
    <div className="videos-container">
      {Object.keys(groupedVideos).length === 0
        ? null
        : Object.entries(groupedVideos).map(([category, videos]) => (
            <div key={category}>
              <h2 className="videos-container__category">{category}</h2>
              <div className="videos-container__videos">
                {videos
                  .slice(
                    0,
                    videosConfig.openCategories.includes(category)
                      ? videos.length
                      : videosConfig.visibleCount
                  )
                  .map((item) => (
                    <div
                      key={item.key}
                      className="videos-container__video-item"
                    >
                      <iframe
                        title={item.name || "YouTube video player"}
                        src={`https://www.youtube.com/embed/${item.key}?rel=0&modestbranding=1`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
                        referrerPolicy="strict-origin-when-cross-origin"
                        loading="lazy"
                        aria-label={`Video: ${item.name || "YouTube video"}`}
                      />
                    </div>
                  ))}
              </div>
              {videos.length > videosConfig.visibleCount && (
                <button
                  className="videos-container__showAllBtn"
                  onClick={() => clickShowAll(category)}
                  aria-label={
                    !videosConfig.openCategories.includes(category)
                      ? `Show All ${category} videos`
                      : `Close ${category} category`
                  }
                >
                  {!videosConfig.openCategories.includes(category)
                    ? `Show All (${videos.length})`
                    : "Close"}
                </button>
              )}
            </div>
          ))}
    </div>
  );
};
export { MovieVideos };
