import { useState } from "react";
import ReactPaginate from "react-paginate";
import SingleTemplate from "../singleTemplate/SingleTemplate";
import "./paginate.css";

function Paginate({ templates }) {
  const [pageNumber, setPageNumber] = useState(0);

  const templatePerPage = 8;
  const pagesVisited = pageNumber * templatePerPage;

  const Displaytemplate = templates
    .reverse()
    .slice(pagesVisited, pagesVisited + templatePerPage)
    .map((temp) => {
      return <SingleTemplate key={temp._id} temp={temp} />;
    });

  const pageCount = Math.ceil(templates.length / templatePerPage);
  const pageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      {Displaytemplate}
      <ReactPaginate
        previousLabel='prev'
        nextLabel='next'
        pageCount={pageCount}
        onPageChange={pageChange}
        containerClassName='paginationBtn'
        previousLinkClassName='prevBtn btn'
        nextLinkClassName='nextBtn btn'
        disableClassName='paginationDisabled'
        activeClassName='paginationActive'
      />
    </>
  );
}

export default Paginate;
