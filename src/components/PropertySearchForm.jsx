"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import { useGlobalContext } from "@/context/GlobalContext";
import { useTranslations } from "next-intl";

const PropertySearchForm = () => {
  const [isAdvancedSearchActive, setIsAdvancedSearchActive] = useState(false);

  const {searchCriteria, setSearchCriteria} = useGlobalContext();

  const { location, propertyType, bedrooms, bathrooms, rateMax, rateType } = searchCriteria;
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (location === "" && propertyType === "Any" && bedrooms === "Any" && bathrooms === "Any" && rateMax === "Any" && rateType === "Any") {
      router.push("/properties");
    } else {
      let query = `?location=${location}&propertyType=${propertyType}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&rateMax=${rateMax}&rateType=${rateType}&page=${page}&pageSize=${pageSize}`;

      router.push("/properties/search-results" + query);
    }

    // Fetch properties based on the search criteria
    fetch("/api/properties", {});
  };

  // translation
  const t = useTranslations("SearchBox");
  const tPropType = useTranslations("PropertyTypes");

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto max-w-2xl flex flex-col space-y-2 items-center min-h-[100px]"
    >
      <div className="w-full flex flex-wrap items-center justify-between gap-2 sm:flex-row">
        <div className="w-full space-y-2 items-stretch sm:flex sm:space-y-0 sm:space-x-2">
          <div className="w-full">
            <label htmlFor="location" className="sr-only">
              {t("location")}
            </label>
            <input
              type="text"
              id="location"
              placeholder={t("searchInputPlaceholder")}
              className="w-full p-2 md:px-4 md:py-3 rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
              value={location}
              onChange={(e) => setSearchCriteria({...searchCriteria, location: e.target.value})}
            />
          </div>
          <div className="w-full flex gap-2">
            <label htmlFor="property-type" className="sr-only">
            {t("propertyType")}
            </label>
            <select
              id="property-type"
              className="w-full h-full p-2 md:px-4 md:py-3 rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
              style={{ WebkitAppearance: "none", appearance: "none" }}
              value={propertyType}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, propertyType: e.target.value })}
            >
              <option value="Any">{t("propertyType")}</option>
              <option value="Apartment">{tPropType('apartment')}</option>
              <option value="House">{tPropType('house')}</option>
              <option value="Townhouse">{tPropType('townhouse')}</option>
              <option value="Cabin Or Cottage">{tPropType('cabinOrCatage')}</option>
              <option value="Room">{tPropType('room')}</option>
            </select>

            <button
              type="button"
              className=" flex items-center px-3 p-2 md:px-4 md:py-3 rounded-md bg-white text-black hover:bg-blue-500 hover:text-white focus:outline-none focus:ring focus:ring-blue-500"
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
          <label htmlFor="property-bedrooms" className="sr-only">
            {t("bedrooms")}
          </label>
          <select
            id="property-bedrooms"
            className="w-full h-full p-2 md:px-4 md:py-3 rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            style={{ WebkitAppearance: "none", appearance: "none" }}
            value={bedrooms}
            onChange={(e) => setSearchCriteria({...searchCriteria, bedrooms: e.target.value})}
          >
            <option value="Any">{t('bedrooms')}</option>
            <option value="0">{t('studio')}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="property-bathrooms" className="sr-only">
            {t("bathrooms")}
          </label>
          <select
            id="property-bathrooms"
            className="w-full h-full p-2 md:px-4 md:py-3 rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            style={{ WebkitAppearance: "none", appearance: "none"}}
            value={bathrooms}
            onChange={(e) => setSearchCriteria({...searchCriteria, bathrooms: e.target.value})}
          >
            <option value="Any">{t("bathrooms")}</option>
            <option value="0">{t('sharedBathroom')}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="property-rate-max"></label>
          <select
            name=""
            id="property-rate-max"
            className="w-full h-full p-2 md:px-4 md:py-3 rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            style={{ WebkitAppearance: "none", appearance: "none" }}
            value={rateMax}
            onChange={(e) => setSearchCriteria({...searchCriteria, rateMax: e.target.value})}
          >
            <option value="Any">{t("maxRate")}</option>
            <option value="100">100</option>
            <option value="120">120</option>
            <option value="140">140</option>
            <option value="160">160</option>
            <option value="180">180</option>
            <option value="200">200</option>
            <option value="200">250</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
            <option value="1000">1000</option>
            <option value="1100">1100</option>
            <option value="1200">1200</option>
            <option value="1300">1300</option>
            <option value="1400">1400</option>
            <option value="1500">1500</option>
            <option value="1600">1600</option>
            <option value="1700">1700</option>
            <option value="1800">1800</option>
            <option value="1900">1900</option>
            <option value="2000">2000</option>
            <option value="3000">3000</option>
            <option value="4000">4000</option>
            <option value="5000">5000</option>
            <option value="6000">6000</option>
            <option value="7000">7000</option>
            <option value="8000">8000</option>
            <option value="9000">9000</option>
            <option value="10000">10000</option>
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="property-rate-type"></label>
          <select
            name=""
            id="property-rate-type"
            className="w-full h-full p-2 md:px-4 md:py-3 rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            style={{ WebkitAppearance: "none", appearance: "none" }}
            value={rateType}
            onChange={(e) => setSearchCriteria({...searchCriteria, rateType: e.target.value})}
          >
            <option value="Any">{t('lengthOfStay')}</option>
            <option value="Nightly">{t('nightly')}</option>
            <option value="Monthly">{t('monthly')}</option>
          </select>
        </div>
      </div>
      <div className="w-full">
        <button
          type="submit"
          className="w-full p-2 md:px-6 md:py-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
        >
          {t("searchButton")}
        </button>
      </div>
    </form>
  );
};

export default PropertySearchForm;
