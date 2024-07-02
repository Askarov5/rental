"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/app/loading";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertySearchForm from "@/components/PropertySearchForm";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location") || "";
  const propertyType = searchParams.get("propertyType") || "";
  const bedrooms = searchParams.get("bedrooms");
  const bathrooms = searchParams.get("bathrooms");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}&bedrooms=${bedrooms}&bathrooms=${bathrooms}`
        );
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType, bedrooms, bathrooms]);

  if (loading) return <Spinner />;

  return (
    !loading && (
      <>
        <section className="bg-blue-700 py-4">
          <div className="mex-w-7xl mx-auto px-4 flex-flex-col items-start sm:px-6 lg:px-8">
            <PropertySearchForm />
          </div>
        </section>
        {
          <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
              <Link
                href="/properties"
                className="text-blue-500 flex items-center"
              >
                <FaArrowAltCircleLeft className="inline-block mr-2" />
                Back to Properties
              </Link>
              <h1 className="text-3xl mb-4 mt-4 font-semibold">
                Search Results
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.length === 0 ? (
                  <h3>No Properties Found</h3>
                ) : (
                  properties.map((p) => (
                    <PropertyCard property={p} key={p._id} />
                  ))
                )}
              </div>
            </div>
          </section>
        }
      </>
    )
  );
};

export default SearchResultsPage;
