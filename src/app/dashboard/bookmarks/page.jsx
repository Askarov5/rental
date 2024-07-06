"use client";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/app/loading";
import { toast } from "react-toastify";

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const response = await fetch("/api/bookmarks");
        if (response.status === 200) {
          const data = await response.json();
          setProperties(data);
        } else {
          console.error(res.statusText);
          toast.error("Failed to fetch saved properties");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch saved properties");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <section className="">
      <div className="">
        <div className="border-b border-gray-200 pb-5  mb-5">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            My Listings
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <h3>No Saved Properties Found</h3>
          ) : (
            properties.map((p) => <PropertyCard property={p} key={p._id} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
