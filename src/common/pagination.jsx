import React, { useState } from 'react';  

const Pagination = ({  
  totalItems,  
  itemsPerPage,  
  currentPage,  
  onPageChange,  
}) => {  
  const totalPages = Math.ceil(totalItems / itemsPerPage);  

  const getPageNumbers = () => {  
    const pages = [];  
    const maxPagesToShow = 5;  
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);  

    if (totalPages <= maxPagesToShow) {  
      for (let i = 1; i <= totalPages; i++) {  
        pages.push(i);  
      }  
    } else {  
      let startPage = Math.max(currentPage - halfMaxPagesToShow, 1);   
      let endPage = Math.min(currentPage + halfMaxPagesToShow, totalPages);   

      if (startPage === 1) {  
        endPage = maxPagesToShow;  
      } else if (endPage === totalPages) {  
        startPage = totalPages - maxPagesToShow + 1;  
      }  

      for (let i = startPage; i <= endPage; i++) {  
        pages.push(i);  
      }  

      if (startPage > 1) {  
        pages.unshift('...');  
        pages.unshift(1);  
      }  

      if (endPage < totalPages) {  
        pages.push('...');  
        pages.push(totalPages);  
      }  
    }  

    return pages;  
  };  

  return (  
    <div className="w-full m-4 flex items-center justify-center ">  
      <button  
        className="px-3 py-1 border rounded"  
        onClick={() => onPageChange(currentPage - 1)}  
        disabled={currentPage === 1}  
      >  
        قبلی  
      </button>  

      {getPageNumbers().map((page) => (  
        <button  
          className={`px-3 py-1 border rounded ${  
            currentPage === page ? 'bg-blue-300' : ''  
          }`}  
          key={page}  
          onClick={() => typeof page === 'number' && onPageChange(page)}  
          disabled={typeof page !== 'number'}  
        >  
          {page}  
        </button>  
      ))}  

      <button  
        className="px-3 py-1 border rounded"  
        onClick={() => onPageChange(currentPage + 1)}  
        disabled={currentPage === totalPages}  
      >  
        بعدی  
      </button>  
    </div>  
  );  
};  

export default Pagination;