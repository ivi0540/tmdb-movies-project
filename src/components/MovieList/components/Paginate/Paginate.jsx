import { useState, useEffect } from "react";
import "./style.scss";

const Paginate = ({
  page,
  setPage,
  pagination: pageInfo,
  // setPagination,
  // setFetchStatus,
}) => {
  const [inputPage, setInputPage] = useState(page);

  let minPage = 1;
  let maxPage = pageInfo?.total_pages <= 500 ? pageInfo?.total_pages : 500;

  const getValidPages = (pageNumbers = []) => {
    return pageNumbers?.filter((pageNum) => {
      return pageNum >= minPage && pageNum <= maxPage;
    });
  };

  let previousPages = getValidPages([page - 3, page - 2, page - 1]);
  let nextPages = getValidPages([page + 1, page + 2, page + 3]);

  const goToPage = (newPage) => {
    if (newPage !== page && newPage >= minPage && newPage <= maxPage) {
      setPage(newPage);
    }
  };

  const handleInputChange = (e) => {
    const newPage = Number(e.target.value);
    if (newPage >= minPage && newPage <= maxPage) {
      setInputPage(newPage);
    }
  };

  const handleKeyEnterPress = (e) => {
    if (e.key === "Enter") {
      goToPage(inputPage);
    }
  };

  useEffect(() => {
    setInputPage(page);
  }, [page]);

  return (
    <div className="paginate">
      <div className="paginate__container">
        <button onClick={() => goToPage(minPage)}>First page</button>
        <button onClick={() => goToPage(page - 1)} disabled={page === minPage}>
          Prev page
        </button>
        <div>
          {previousPages.map((pageNumber) => (
            <button
              key={`prev-${pageNumber}`}
              onClick={() => {
                goToPage(pageNumber);
              }}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <div className="paginate__page-input">
          <input
            type="number"
            min={minPage}
            max={maxPage}
            value={inputPage}
            onChange={handleInputChange}
            onKeyDown={handleKeyEnterPress}
          />
          <button
            onClick={() => {
              goToPage(inputPage);
            }}
          >
            Go to page
          </button>
        </div>
        <div>
          {nextPages.map((pageNumber) => (
            <button
              key={`next-${pageNumber}`}
              onClick={() => {
                goToPage(pageNumber);
              }}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button onClick={() => goToPage(page + 1)} disabled={page === maxPage}>
          Next page
        </button>
        <button onClick={() => goToPage(maxPage)}>Last page</button>
      </div>
    </div>
  );
};

export { Paginate };
