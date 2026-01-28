import { useState, useEffect } from "react";
import { Preloader } from "../Preloader/Preloader";
import { ErrorPreloader } from "../ErrorPreloader/ErrorPreloader";
import { getNowPlayingMovies, getGenres } from "../../api";
import { getGenreNames } from "../../utils/getGenreNames";
import { RatingBadge } from "../../components/RatingBadge/RatingBadge";
import { Link } from "react-router-dom";
import "./style.scss";

const NewMoviesSlider = () => {
  const [newestMovies, setNewestMovies] = useState(null);
  const [sliderState, setSliderState] = useState({
    status: "loading", // success || loading || error || empty
    currentSlideIndex: 0,
    minSliderIndex: 0,
    maxSliderIndex: 0,
    lastSlideIndex: 4, // 0, 1 , 2, 3, 4 total: 5 items
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const slideTransitionDuration = 2; //2 sek
  const autoSlideInterval = 10; //10 sek

  const [genresMap, setGenresMap] = useState([]);

  const getImageUrl = (path = "", size = "original") => {
    // size =  w300 || w780 || w1280 || original
    if (!path) return "";
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSlideImageStyle = (slideIndex = 0) => {
    if (sliderState.status !== "success") {
      return { backgroundColor: "gray" };
    }
    if (
      sliderState.status === "success" &&
      newestMovies[slideIndex]?.poster_path
    ) {
      return {
        backgroundImage: `url(${getImageUrl(
          newestMovies[slideIndex]?.poster_path,
        )})`,
      };
    }
    return { backgroundColor: "gray" };
  };
  const goToSlideIndex = (
    index,
    currentIndex,
    maxIndex,
    minIndex,
    isCurrentlyAnimating,
  ) => {
    if (index === currentIndex) return;
    if (isCurrentlyAnimating) return;

    let newIndex = index;
    if (index > maxIndex) {
      newIndex = minIndex;
    }
    if (index < minIndex) {
      newIndex = maxIndex;
    }

    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, slideTransitionDuration * 1000);

    setSliderState((prev) => ({ ...prev, currentSlideIndex: newIndex }));
  };

  const renderPagination = () => {
    return (
      <>
        {[...Array(sliderState.lastSlideIndex + 1)].map((_, index) => {
          const isActive = index === sliderState.currentSlideIndex;
          return (
            <button
              key={`pagination-${index}`}
              className={
                isActive
                  ? "movies-slider__pagination-item-active"
                  : "movies-slider__pagination-item"
              }
              style={{
                transition: `width ${slideTransitionDuration}s, background-color ${slideTransitionDuration}s`,
              }}
              disabled={isActive}
              onClick={() =>
                goToSlideIndex(
                  index,
                  sliderState.currentSlideIndex,
                  sliderState.maxSliderIndex,
                  sliderState.minSliderIndex,
                  isAnimating,
                )
              }
            ></button>
          );
        })}
      </>
    );
  };

  const renderSliderItems = () => {
    if (sliderState.status !== "success") return;
    return newestMovies
      .slice(0, sliderState.maxSliderIndex + 1)
      .map((movie, index) => (
        <Link to={`/movie/${movie.id}`} key={`link-${movie.id}`}>
          <div key={movie.id} className="movies-slider__slide">
            <div
              className="movies-slider__image"
              style={getSlideImageStyle(index)}
            >
              <RatingBadge rating={movie?.vote_average} />
            </div>

            <div className="movies-slider__text-container">
              <h2 className="movies-slider__movie-title">{movie?.title}</h2>
              <div className="movies-slider__overview">{movie?.overview}</div>
              <div className="movies-slider__genres">
                {getGenreNames(genresMap, movie?.genre_ids).map(
                  (item, index) => (
                    <p key={`${item}-${index}`}>{item}</p>
                  ),
                )}
              </div>
            </div>
          </div>
        </Link>
      ));
  };

  useEffect(() => {
    let isMount = true;
    (async () => {
      try {
        const data = await getNowPlayingMovies();
        const dataGenres = await getGenres();
        if (!isMount) return;
        setGenresMap(dataGenres);

        if (data?.results?.length > 0) {
          setSliderState((prev) => ({
            ...prev,
            status: "success",
            maxSliderIndex: Math.min(data.results.length - 1, prev.lastSlideIndex),
          }));
          setNewestMovies(data.results);
        }
        if (data?.results?.length === 0) {
          setSliderState((prev) => ({ ...prev, status: "empty" }));
          setNewestMovies([]);
        }
      } catch (error) {
        if (!isMount) return;
        setSliderState((prev) => ({ ...prev, status: "error" }));
        console.log(error);
      }
    })();
    return () => {
      isMount = false;
    };
  }, []);

  useEffect(() => {
    if (sliderState.status !== "success") return;
    if (isAutoPlayPaused) return;
    if (isAnimating) return;

    const intervalId = setInterval(() => {
      goToSlideIndex(
        sliderState.currentSlideIndex + 1,
        sliderState.currentSlideIndex,
        sliderState.maxSliderIndex,
        sliderState.minSliderIndex,
        isAnimating,
      );
    }, autoSlideInterval * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    sliderState.status,
    isAutoPlayPaused,
    sliderState.currentSlideIndex,
    sliderState.maxSliderIndex,
    sliderState.minSliderIndex,
    isAnimating,
  ]);

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
          <h1 className="movies-slider__title">{`Top ${
            sliderState.lastSlideIndex + 1
          } according to TMDB rating`}</h1>

          <div
            className="movies-slider__main-container"
            onMouseEnter={() => {
              setIsAutoPlayPaused(true);
            }}
            onMouseLeave={() => {
              setIsAutoPlayPaused(false);
            }}
          >
            <button
              className="movies-slider__btn-prev"
              onClick={() => {
                goToSlideIndex(
                  sliderState.currentSlideIndex - 1,
                  sliderState.currentSlideIndex,
                  sliderState.maxSliderIndex,
                  sliderState.minSliderIndex,
                  isAnimating,
                );
              }}
            >
              Prev Slide
            </button>
            <div className="movies-slider__container">
              <div className="movies-slider__slide-track-wrapper">
                <div
                  className="movies-slider__slide-track"
                  style={{
                    transform: `translateX(-${
                      sliderState.currentSlideIndex * 100
                    }%)`,
                    transition: `transform ${slideTransitionDuration}s ease-out`,
                  }}
                >
                  {renderSliderItems()}
                </div>
              </div>
              <nav className="movies-slider__pagination">
                {renderPagination()}
              </nav>
            </div>
            <button
              className="movies-slider__btn-next"
              onClick={() =>
                goToSlideIndex(
                  sliderState.currentSlideIndex + 1,
                  sliderState.currentSlideIndex,
                  sliderState.maxSliderIndex,
                  sliderState.minSliderIndex,
                  isAnimating,
                )
              }
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

// AbortController изучить на будущее
