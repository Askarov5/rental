import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaSquare,
  FaHome,
  FaColumns,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";

import PropertyPlaceHolderImage from "@/assets/images/property-placeholder.jpg";

const PropertyCard = ({ property }) => {
  const { street, city, state, zipcode } = property.location;
  const address = ` ${street}, ${city}, ${state} ${zipcode}`;
  const { rates } = property;
  const getRateDisplay = () => {
    if (rates.monthly) {
      return (
        <span>
          {rates.monthly.toLocaleString()}
          <small>/MO</small>
        </span>
      );
    } else if (rates.nightly) {
      return (
        <span>
          {rates.nightly.toLocaleString()}
          <small>/NIGHT</small>
        </span>
      );
    }
  };

  const getTypeDisplay = (type) => {
    switch (type) {
      case "Studio":
        return (
          <>
            <FaSquare className="inline mr-1 text-blue-600" /> Studio
          </>
        );
      case "Room":
        return (
          <>
            <FaColumns className="inline mr-1 text-blue-600" /> Room
          </>
        );
      case "Apartment":
        return (
          <>
            <FaBuilding className="inline mr-1 text-blue-600" /> Apartment
          </>
        );
      case "Condo":
        return (
          <>
            <FaBuilding className="inline mr-1 text-blue-600" /> Condo
          </>
        );
      case "Home":
        return (
          <>
            <FaBuilding className="inline mr-1 text-blue-600" /> Home
          </>
        );
      default:
        return (
          <>
            <FaHome className="inline mr-1 text-blue-600" /> {type}
          </>
        );
    }
  };

  return (
    <Link
      href={`/properties/${property._id}`}
      className="rounded-xl shadow-md hover:shadow-xl transition-shadow relative"
    >
      <Image
        src={property.images[0] || PropertyPlaceHolderImage}
        alt=""
        height={0}
        width={0}
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <div className="w-full flex justify-between items-center mb-4">
          <div className="flex justify-start gap-1 items-center text-green-700 text-sm">
            <FaMoneyBill className="inline mr-1" />
            {rates.nightly > 0 ? (
              <span
                title={`$ ${property.rates.nightly}`}
                className="cursor-help"
              >
                Nightly
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
                Monthly
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className="text-gray-600 text-sm p-1 rounded-md bg-blue-50 flex items-center">
            {getTypeDisplay(property.type)}
          </div>
        </div>
        <div className="text-left md:text-center lg:text-left mb-4">
          <h3 className="text-xl font-bold mb-1">{property.name}</h3>
          <address className="text-gray-500 text-sm">{address}</address>
        </div>

        <div className="flex justify-around gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline mr-1 text-blue-600" /> {property.beds}{" "}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline mr-1 text-blue-600" /> {property.baths}{" "}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline mr-1 text-blue-600" />
            {property.square_feet}{" "}
            <span className="md:hidden lg:inline">
              ft<sup>2</sup>
            </span>
          </p>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarkerAlt className=" text-orange-700 mt-1" />
            <span className="text-orange-700">
              {" "}
              {property.location.city}, {property.location.state}
            </span>
          </div>
          <h3 className=" px-4 py-2 rounded-lg text-blue-500 text-2xl font-bold text-right md:text-center lg:text-right">
            ${getRateDisplay()}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
