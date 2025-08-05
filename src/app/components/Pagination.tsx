'use client';

import React from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  return (
    <div className="mt-8 flex justify-center items-center space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={prevDisabled}
        className={`px-4 py-2 rounded bg-blue-500 text-white ${
          prevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
      >
        <FaAngleLeft fontSize={10}/>
      </button>

      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={nextDisabled}
        className={`px-4 py-2 rounded bg-blue-500 text-white ${
          nextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
      >
        <FaAngleRight fontSize={10}/>
      </button>
    </div>
  );
};

export default Pagination;
