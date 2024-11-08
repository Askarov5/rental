import Image from "next/image";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarkerAlt,
} from "react-icons/fa";
import PropertyPlaceHolderImage from "@/assets/images/property-placeholder.jpg";
import Link from "next/link";
import PropertyTypeLabel from "./PropertyTypeLabel";
import RateOfPropertyCard from "./RateOfPropertyCard";
import { useTranslations } from "next-intl";

const FeaturedPropertyCard = ({ property }) => {
  const t = useTranslations("PropertyCard");

  return (
    <Link
      href={`/properties/${property._id}`}
      className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg flex flex-col md:flex-row"
    >
      <Image
        src={property.images[0] || PropertyPlaceHolderImage}
        alt={property.type}
        height={0}
        width={0}
        sizes="100vw"
        className="object-cover rounded-t-lg md:rounded-tr-none md:rounded-l-lg w-full md:w-2/5"
        priority
      />
      <div className="p-5 w-full flex flex-wrap items-stretch">
        <div className="flex justify-between items-center mb-3 w-full">
          <div className="flex justify-end text-green-700 text-sm">
            {property.rates.nightly ? (
              <p className="flex items-center gap-1 mr-2">
                <FaMoneyBill /> <span>{t("nightly")}</span>
              </p>
            ) : (
              <p></p>
            )}

            {property.rates.monthly ? (
              <p className="flex items-center gap-1">
                <FaMoneyBill /> <span>{t("monthly")}</span>
              </p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="text-gray-600 text-sm p-1 rounded-md bg-blue-50 text-end flex items-center">
            <PropertyTypeLabel type={property.type} />
          </div>
        </div>

        <div className="w-full">
          <h3 className="text-xl font-bold mb-2">{property.name}</h3>
          <div className="flex justify-around gap-3 text-gray-500 mb-4">
            <p>
              <FaBed className="inline mr-1 text-blue-600" />
              {property.beds === 0 ? (
                <small>{t("studio")}</small>
              ) : (
                <small className="md:hidden lg:inline">
                  {property.beds} {t("bedrooms")}
                </small>
              )}
            </p>
            <p>
              <FaBath className="inline mr-1 text-blue-600" /> {property.baths}{" "}
              <small className="md:hidden lg:inline">{t("bathrooms")}</small>
            </p>
            <p>
              <FaRulerCombined className="inline mr-1 text-blue-600" />
              {property.square_meter}{" "}
              <small className="md:hidden lg:inline">м<sup>2</sup></small>
            </p>
          </div>

          <div className="border border-gray-200 mb-5"></div>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex align-middle gap-2">
            <FaMapMarkerAlt className="text-lg text-orange-700"></FaMapMarkerAlt>
            <span className="text-orange-700">
              {" "}
              {property.location.city + ", " + property.location.state}{" "}
            </span>
          </div>
          <h3 className="px-4 py-2 rounded-md text-blue-500 text-xl md:text-2xl font-bold text-right md:text-center lg:text-right">
            <RateOfPropertyCard rates={property.rates} />
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedPropertyCard;
