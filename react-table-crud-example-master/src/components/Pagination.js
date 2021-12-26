import React, { useState } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const [state, setState] = useState(1);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li class="page-item">
          <a class="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only" onClick={pageNumbers - 1}>
              Previous
            </span>
          </a>
        </li>
        {pageNumbers.map((number) => (
          <>
            <li key={number} className="page-item">
              <a
                onClick={() => {
                  paginate(number);
                  setState(number);
                }}
                className="page-link"
              >
                {number}
              </a>
            </li>
          </>
        ))}
        <li class="page-item">
          <a class="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
