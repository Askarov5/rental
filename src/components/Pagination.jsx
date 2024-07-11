import { useTranslations } from "next-intl";
import React from "react";

const Pagination = ({ page, pageSize, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage) => {
    if(newPage < 1 || newPage > totalPages) return;

    onPageChange(newPage);
  }

  // translation
  const t = useTranslations("Pagination");

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
        disabled={page === 1}
        onClick={() => handlePageChange(page-1)}
      >
        {t('previous')}
      </button>
      <span className="mx-2">
        {t('page')} {page} {t('of')} {totalPages}
      </span>
      <button
        className="ml-2 px-2 py-1 border border-gray-300 rounded"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page+1)}
      >
        {t('next')}
      </button>
    </section>
  );
};

export default Pagination;
