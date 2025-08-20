import "./style.scss";

const Paginate = ({
  page,
  setPage,
  pagination,
  searchPage,
  setSearchPage,
  setFetchStatus, // success | loading | error
}) => {
  const goToPreviousPage = () => {
    goToPage(page - 1);
  };

  const goToNextPage = () => {
    goToPage(page + 1);
  };

  const goToPage = (pageNumber) => {
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
            style={item === pagination.page ? { backgroundColor: "red" } : {}}
            className="paginate__btn-pag"
            onClick={() => {
              setPage(item);
              setFetchStatus("loading");
            }}
          >
            {item}
          </button>
        );
      });
  };

  const handleInputChange = (e) => {
    setSearchPage(e.target.value);
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
          disabled={page - 1 < 1}
          onClick={goToPreviousPage}
        >
          PRE
        </button>
        {renderPaginationButtons()}
        <button
          className="paginate__btn-next"
          disabled={page + 1 > pagination.total_pages}
          onClick={goToNextPage}
        >
          NEXT
        </button>
      </div>
      <div className="paginate__search">
        <input
          type="search"
          value={searchPage}
          onChange={handleInputChange}
          onKeyDown={handleEnterKeyPress}
          placeholder="Enter search page"
        />
        <button disabled={!searchPage} onClick={() => goToPage(searchPage)}>
          Search Page
        </button>
      </div>
    </div>
  );
};

export { Paginate };
