import "./style.scss";
import { useState } from "react";

const Paginate = ({
  page,
  setPage,
  pagination,
  setFetchStatus, // success | loading | error
}) => {
  const [searchPage, setSearchPage] = useState("");
  const goToPreviousPage = () => {
    goToPage(page - 1);
  };

  const goToNextPage = () => {
    goToPage(page + 1);
  };

  const goToPage = (pageNumber) => {
    pageNumber = Number(pageNumber);
    if (pageNumber > 0 && pageNumber <= pagination.total_pages) {
      setPage(Number(pageNumber));
      setFetchStatus("loading");
    } else {
      alert(`Page number can be from 1 to ${pagination.total_pages}`);
    }
  };

  const renderPaginationButtons = () => {
    const pageNumbers = [
      page - 3,
      page - 2,
      page - 1,
      page,
      page + 1,
      page + 2,
      page + 3,
    ];

    return pageNumbers
      .filter((item) => {
        if (item > 0 && item <= pagination.total_pages) {
          return true;
        }
        return false;
      })
      .map((item) => {
        return (
          <button
            key={item}
            style={item === page ? { backgroundColor: "blue" } : {}}
            className="paginate__btn-pag"
            onClick={() => item !== page && goToPage(item)}
          >
            {item}
          </button>
        );
      });
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setSearchPage(value);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      goToPage(searchPage);
    }
  };

  return (
    <div className="paginate">
      <div className="paginate__container">
        <button
          className="paginate__btn-pre"
          disabled={page <= 1}
          onClick={goToPreviousPage}
        >
          PRE
        </button>
        {renderPaginationButtons()}
        <button
          className="paginate__btn-next"
          disabled={page >= pagination.total_pages}
          onClick={goToNextPage}
        >
          NEXT
        </button>
      </div>
      <div className="paginate__search">
        <input
          className="paginate__input-page"
          type="number"
          min="1"
          max={pagination.total_pages}
          value={searchPage}
          onChange={handleInputChange}
          onKeyDown={handleEnterKeyPress}
          placeholder={`Enter page (1-${pagination.total_pages})`}
        />
        <button disabled={!searchPage} onClick={() => goToPage(searchPage)}>
          Search Page
        </button>
      </div>
    </div>
  );
};

export { Paginate };
