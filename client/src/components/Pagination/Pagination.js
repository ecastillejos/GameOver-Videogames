import React from "react";
import "./Pagination.css";

export default function Pagination ({ vgPerPage, totalVideogames, paginate }) {
  const nums = [];

  for (let i = 1; i <= Math.ceil(totalVideogames / vgPerPage); i++) {
    nums.push(i);
  }

  return (
    <nav className="navPag">
      <ul className="pagination">
        {nums.map((num) => (
          <li key={num} className="page-item">
            <button
              onClick={(e) => paginate(e, num)}
              className="page-link"
            >
              {num}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};