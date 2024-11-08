import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarkerAlt,
} from "react-icons/fa";

import PropertyPlaceHolderImage from "@/assets/images/property-placeholder.jpg";
import PropertyTypeLabel from "./PropertyTypeLabel";
import RateOfPropertyCard from "./RateOfPropertyCard";
import { useTranslations } from "next-intl";

const PropertyCard = ({ property }) => {
  const t = useTranslations("PropertyCard");

  const { street, city, state, zipcode } = property.location;
  const address = ` ${street}, ${city}, ${state} ${zipcode}`;
  const { rates } = property;

  return (
    <Link
      href={`/properties/${property._id}`}
      className="rounded-lg shadow-md hover:shadow-xl transition-shadow relative"
    >
      <div className="w-full max-h-[200px] overflow-hidden object-center flex items-center">
        <Image
          src={property.images[0] || PropertyPlaceHolderImage}
          alt=""
          height={0}
          width={0}
          sizes="100vw"
          className="w-full h-auto rounded-t-lg"
          priority={true}
        />
      </div>

      <div className="p-4">
        <div className="w-full flex justify-between items-center mb-4">
          <div className="flex justify-start gap-1 items-center text-green-700 text-sm">
            <FaMoneyBill className="inline mr-1" />
            {rates.nightly > 0 ? (
              <span
                title={`$ ${property.rates.nightly}`}
                className="cursor-help"
              >
                {t("nightly")}
              </span>
            ) : (
              <></>
            )}
            {rates.nightly > 0 && rates.monthly > 0 ? " | " : ""}
            {rates.monthly > 0 ? (
              <span
                title={`$ ${property.rates.monthly}`}
                className="cursor-help"
              >
                {t("monthly")}
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className="text-gray-600 text-sm p-1 rounded-md bg-blue-50 flex items-center">
            <PropertyTypeLabel type={property.type} />
          </div>
        </div>
        <div className="text-left md:text-center lg:text-left mb-4">
          <h3 className="text-xl font-bold mb-1">{property.name}</h3>
          <address className="text-gray-500 text-sm">{address}</address>
        </div>

        <div className="flex justify-around gap-4 text-gray-500 mb-4">
          <p className="text-lg">
            <FaBed className="inline mr-1 text-blue-600" /> {property.beds}{" "}
            <small className="md:hidden lg:inline">{t("bedrooms")}</small>
          </p>
          <p className="text-lg">
            <FaBath className="inline mr-1 text-blue-600" /> {property.baths}{" "}
            <small className="md:hidden lg:inline">{t("bathrooms")}</small>
          </p>
          <p className="text-lg">
            <FaRulerCombined className="inline mr-1 text-blue-600" />
            {property.square_meter}{" "}
            <small className="md:hidden lg:inline">м<sup>2</sup></small>
          </p>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex justify-between items-center">
          <div className="flex align-middle gap-2 lg:mb-0">
            <FaMapMarkerAlt className=" text-orange-700 mt-1" />
            <span className="text-orange-700">
              {" "}
              {property.location.city}, {property.location.state}
            </span>
          </div>
          <h3 className=" px-4 py-2 rounded-md text-blue-500 text-xl lg:text-2xl font-bold text-right md:text-center lg:text-right">
            <RateOfPropertyCard rates={property.rates} />
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
