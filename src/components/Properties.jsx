"use client";

import { useState, useEffect } from "react";
import Spinner from "@/app/loading";
import PropertyCard from "./PropertyCard";
import Pagination from "./Pagination";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );
        if (response.status === 200) {
          const data = await response.json();
          setProperties(data.properties);
          setTotalItems(data.total);
        } else {
          throw new Error("Failed to fetch properties");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  return loading ? (
    <Spinner />
  ) : (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.length === 0 ? (
              <h3>No Properties Found</h3>
            ) : (
              properties.map((p) => <PropertyCard property={p} key={p._id} />)
            )}
          </div>
        </div>
      </section>
      <Pagination page={page} pageSize={pageSize} totalItems={totalItems} onPageChange={handlePageChange}/>
    </>
  );
};

export default Properties;
