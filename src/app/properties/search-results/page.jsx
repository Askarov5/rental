"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/app/loading";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertySearchForm from "@/components/PropertySearchForm";
import Pagination from "@/components/Pagination";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalItems, setTotalItems] = useState(0);

  const location = searchParams.get("location") || "";
  const propertyType = searchParams.get("propertyType") || "Any";
  const bedrooms = searchParams.get("bedrooms") || "Any";
  const bathrooms = searchParams.get("bathrooms") || "Any";
  const rateMax = searchParams.get("rateMax") || "10000";
  const rateType = searchParams.get("rateType") || "Any";
  const page = searchParams.get("page") || 1;
  const pageSize = searchParams.get("pageSize") || 6;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&rateMax=${rateMax}&rateType=${rateType}&page=${page}&pageSize=${pageSize}`
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
    fetchSearchResults();
  }, [location, propertyType, bedrooms, bathrooms, rateMax, rateType, page, pageSize]);
  
  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  if (loading) return <Spinner />;

  return (
    !loading && (
      <>
        <section className="bg-blue-50 py-4">
          <div className="mex-w-7xl mx-auto px-4 flex-flex-col items-start sm:px-6 lg:px-8">
            <PropertySearchForm />
          </div>
        </section>
        {
          <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
              <div>
                <Link
                  href="/properties"
                  className="text-blue-500 flex items-center"
                >
                  <FaArrowAltCircleLeft className="inline-block mr-2" />
                  Back to Properties
                </Link>
              </div>

              <h1 className="text-3xl mb-4 mt-4 font-semibold">
                Search Results
              </h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.length === 0 ? (
                  <h3>No Properties Found</h3>
                ) : (
                  properties.map((p) => (
                    <PropertyCard property={p} key={p._id} />
                  ))
                )}
              </div>
            </div>
            <Pagination page={page} pageSize={pageSize} totalItems={totalItems} onPageChange={handlePageChange}/>
          </section>
        }
      </>
    )
  );
};

export default SearchResultsPage;
