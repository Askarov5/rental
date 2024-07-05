"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";

const PropertySearchForm = () => {
  const [isAdvancedSearchActive, setIsAdvancedSearchActive] = useState(false);

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [bedrooms, setBedrooms] = useState("Any");
  const [bathrooms, setBathrooms] = useState("Any");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (location === "" && propertyType === "All") {
      router.push("/properties");
    } else {
      let query = `?location=${location}&propertyType=${propertyType}&bedrooms=${bedrooms}&bathrooms=${bathrooms}`;

      router.push("/properties/search-results" + query);
    }

    // Fetch properties based on the search criteria
    fetch("/api/properties", {});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto max-w-2xl flex flex-col space-y-2 items-center min-h-[100px]"
    >
      <div className="w-full flex flex-wrap items-center justify-between gap-2 sm:flex-row">
        <div className="w-full space-y-2 items-stretch sm:flex sm:space-y-0 sm:space-x-2">
          <div className="w-full">
            <label htmlFor="location" className="sr-only">
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Enter Keywords or Location"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="w-full flex gap-2">
            <label htmlFor="property-type" className="sr-only">
              Property Type
            </label>
            <select
              id="property-type"
              className="w-full h-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Apartment">Apartment</option>
              <option value="Studio">Studio</option>
              <option value="Condo">Condo</option>
              <option value="House">House</option>
              <option value="Cabin Or Cottage">Cabin or Cottage</option>
              <option value="Loft">Loft</option>
              <option value="Room">Room</option>
              <option value="Other">Other</option>
            </select>
            
            <button
            type="button"
            className=" flex items-center px-4 py-3 rounded-lg bg-white text-black hover:bg-blue-500 hover:text-white focus:outline-none focus:ring focus:ring-blue-500"
            onClick={() => setIsAdvancedSearchActive(!isAdvancedSearchActive)}
          >
            {isAdvancedSearchActive ? <FaSearchMinus /> : <FaSearchPlus />}
          </button>
          </div>
          
        </div>
      </div>

      <div
        className={`advanced-search flex w-full items-center space-x-2  ${
          isAdvancedSearchActive
            ? "h-10 opacity-100"
            : "h-0 opacity-0 overflow-hidden"
        } transition-all duration-500`}
      >
        <div className="flex-1">
          <label htmlFor="property-type" className="sr-only">
            Bedrooms
          </label>
          <select
            id="property-type"
            className="w-full h-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          >
            <option value="Any">Bedrooms</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="property-type" className="sr-only">
            Bathrooms
          </label>
          <select
            id="property-type"
            className="w-full h-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          >
            <option value="Any">Bathrooms</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>
      <div className="w-full">
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Search
          </button>
          
        </div>
    </form>
  );
};

export default PropertySearchForm;
