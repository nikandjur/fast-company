import _ from "lodash";
import PropTypes from "prop-types";

export const Pagination = ({ count, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(count / pageSize);

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1); // _.range() - это lodash функция, создает массив чисел в указанном диапазоне.

  // const pages = [];
  // for (let p = 1; p <= pageCount; p++) {
  //   pages.push(p);
  // }
  // for (let p = 1; p <= pageCount; pages.push(p), p++);
  // Array(5).fill().map((_, index) => index+1)
  // [...Array(5).keys()].map(i => i+1)

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="page-link"
          >
            Previous
          </button>
        </li>
        {pages.map((page, index) => (
          <li
            key={index}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <button className="page-link">{page}</button>
          </li>
        ))}
        <li className="page-item">
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="page-link"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
