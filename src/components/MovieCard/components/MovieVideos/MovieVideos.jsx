import { useState, useMemo } from "react";
import "./style.scss";

const MovieVideos = ({ videos: movieVideos }) => {
  const [videosConfig, setVideosConfig] = useState({
    openCategories: [],
    visibleCount: 4,
  });
  const groupedVideos = useMemo(() => {
    let result = {};
    if (
      movieVideos?.results &&
      Array.isArray(movieVideos.results) &&
      movieVideos.results.length > 0
    ) {
      movieVideos.results.forEach((item) => {
        if (item.site === "YouTube") {
          result[item.type] = result[item.type] || [];
          result[item.type].push(item);
        }
      });
    }
    return result;
  }, [movieVideos]);

  const clickShowAll = (category) => {
    category &&
      setVideosConfig((prev) => ({
        ...prev,
        openCategories: prev.openCategories.includes(category)
          ? prev.openCategories.filter((item) => item !== category)
          : [...prev.openCategories, category],
      }));
  };

  return (
    <div className="videos-container">
      {Object.entries(groupedVideos).map(([category, videos]) => (
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
                <div key={item.key} className="videos-container__video-item">
                  <iframe
                    title={item.name || "YouTube video player"}
                    src={`https://www.youtube.com/embed/${item.key}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ))}
          </div>
          {videos.length > videosConfig.visibleCount && (
            <button
              className="videos-container__showAllBtn"
              onClick={() => clickShowAll(category)}
            >
              {!videosConfig.openCategories.includes(category)
                ? `Show All ( ${videos.length} )`
                : "Close"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
export { MovieVideos };
