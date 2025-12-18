import { useState, useEffect } from "react";
import { Preloader } from "../Preloader/Preloader";
import { ErrorPreloader } from "../ErrorPreloader/ErrorPreloader";
import { getNowPlayingMovies, getGenres } from "../../api";
import { getGenreNames } from "../../utils/getGenreNames";
import "./style.scss";

const NewMoviesSlider = () => {
  const [newestMovies, setNewestMovies] = useState(null);
  const [sliderState, setSliderState] = useState({
    status: "loading", // success || loading || error || empty
    currentSlideIndex: 0,
    minSliderIndex: 0,
    maxSliderIndex: 0,
    slidesCount: 4, // 0, 1 , 2, 3, 4
  });
  const [genresMap, setGenresMap] = useState([]);
  const getImageUrl = (path = "", size = "original") => {
    // size =  w300 || w780 || w1280 || original
    if (!path) {
      return "";
    }
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  const getSliderImageStyle = () => {
    if (sliderState.status !== "success") {
      return { backgroundColor: "gray" };
    }
    if (
      sliderState.status === "success" &&
      newestMovies[sliderState.currentSlideIndex]?.poster_path
    ) {
      return {
        backgroundImage: `url(${getImageUrl(
          newestMovies[sliderState.currentSlideIndex].poster_path
        )})`,
      };
    }
    return { backgroundColor: "gray" };
  };

  const goToSlideIndex = (index) => {
    if (
      sliderState.status === "success" &&
      index !== sliderState.currentSlideIndex
    ) {
      let newIndex = index;
      if (index > sliderState.maxSliderIndex) {
        newIndex = sliderState.minSliderIndex;
      }
      if (index < sliderState.minSliderIndex) {
        newIndex = sliderState.maxSliderIndex;
      }
      setSliderState((prev) => ({ ...prev, currentSlideIndex: newIndex }));
    }
  };

  const renderPaginationItem = () => {
    return (
      <>
        {[...Array(sliderState.slidesCount + 1)].map((_, index) => {
          const isActive = index === sliderState.currentSlideIndex;
          return (
            <button
              key={index}
              className={
                isActive
                  ? "movies-slider__pagination-item-active"
                  : "movies-slider__pagination-item"
              }
              disabled={isActive}
              onClick={() => goToSlideIndex(index)}
            ></button>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    let isMount = true;
    (async () => {
      try {
        const data = await getNowPlayingMovies();
        const dataGenres = await getGenres();
        setGenresMap(dataGenres);
        if (!isMount) {
          return;
        }
        if (data?.results?.length > 0) {
          setSliderState((prev) => ({
            ...prev,
            status: "success",
            maxSliderIndex: Math.min(data.results.length - 1, prev.slidesCount),
          }));
          setNewestMovies(data.results);
        }
        if (data?.results?.length === 0) {
          setSliderState((prev) => ({ ...prev, status: "empty" }));
          setNewestMovies([]);
        }
      } catch (error) {
        if (!isMount) {
          return;
        }
        setSliderState((prev) => ({ ...prev, status: "error" }));
        console.log(error);
      }
    })();
    return () => {
      isMount = false;
    };
  }, []);

  if (sliderState.status === "loading") {
    return <Preloader />;
  }
  if (sliderState.status === "error") {
    return <ErrorPreloader />;
  }
  if (sliderState.status === "empty") {
    return <div>Component not found</div>;
  }
  if (sliderState.status === "success") {
    return (
      <div className="movies-slider-wrapper">
        <div className="movies-slider-background"></div>
        <div className="movies-slider">
          <h1 className="movies-slider__slider-title">{`Top ${
            sliderState.slidesCount + 1
          } according to TMDB rating`}</h1>

          <div className="movies-slider__container-01">
            <button
              className="movies-slider__prev-slide"
              onClick={() => {
                goToSlideIndex(sliderState.currentSlideIndex - 1);
              }}
            >
              Prev Slide
            </button>
            <div className="movies-slider__container">
              <div className="movies-slider__slide-track">
                <div
                  className="movies-slider__slider-image"
                  style={getSliderImageStyle()}
                >
                  <div className="movies-slider__vote-average">
                    {newestMovies[
                      sliderState.currentSlideIndex
                    ].vote_average.toFixed(2)}
                  </div>
                </div>

                <div className="movies-slider__text-container">
                  <label className="movies-slider__title">
                    {newestMovies[sliderState.currentSlideIndex]?.title}
                  </label>
                  <div className="movies-slider__slider-overflow">
                    {newestMovies[sliderState.currentSlideIndex]?.overview}
                  </div>
                  <div className="movies-slider__slider-genres">
                    {getGenreNames(
                      genresMap,
                      newestMovies[sliderState.currentSlideIndex]?.genre_ids
                    ).map((item, index) => (
                      <p key={`${item}-${index}`}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
              <nav className="movies-slider__pagination">
                {renderPaginationItem()}
              </nav>
            </div>
            <button
              className="movies-slider__next-slide"
              onClick={() => goToSlideIndex(sliderState.currentSlideIndex + 1)}
            >
              Next Slide
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export { NewMoviesSlider };

// <div key={`${genreId}-${index}`}>{genreId}</div>

/*
title
backdrop_path
genre_ids
overview
poster_path
release_date
vote_average
*/

// {
//   /* <div className="movies-slider__slider-navigation">
//   {newestMovies
//     .slice(0, sliderState.slidesCount + 1)
//     .map((movie, index) => {
//       return (
//         <div key={`${movie.title}-${index}`}>{movie.title}</div>
//       );
//     })}
// </div> */
// }
