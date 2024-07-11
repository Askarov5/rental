import React from "react";

const DocumentsPage = () => {
  return (
    <section>
      <div className="border-b border-gray-200 pb-5  mb-5 flex flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
        <h1 className="text-base font-semibold leading-7 text-gray-900">
          Documents
        </h1>
        <a
          href="#"
          className="ml-auto flex items-center gap-x-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Upload Document
        </a>
      </div>
    </section>
  );
};

export default DocumentsPage;
