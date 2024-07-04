import Image from "next/image";
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
import Link from "next/link";

const FeaturedPropertyCard = ({ property }) => {
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
      className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-xl flex flex-col md:flex-row"
    >
      <Image
        src={property.images[0] || PropertyPlaceHolderImage}
        alt={property.type}
        height={0}
        width={0}
        sizes="100vw"
        className="object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
      />
      <div className="p-5 w-full flex flex-wrap items-stretch">
        <div className="flex justify-between items-center mb-3 w-full">
          <div className="flex justify-end text-green-700 text-sm">
            {property.rates.nightly ? (
              <p className="flex items-center gap-1 mr-2">
                <FaMoneyBill /> <span>Nightly</span>
              </p>
            ) : (
              <p></p>
            )}

            {property.rates.monthly ? (
              <p className="flex items-center gap-1">
                <FaMoneyBill /> <span>Monthly</span>
              </p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="text-gray-600 text-sm p-1 rounded-md bg-blue-50 text-end flex items-center">
            {getTypeDisplay(property.type)}
          </div>
        </div>

        <div className="w-full">
          <h3 className="text-xl font-bold mb-2">{property.name}</h3>
          <div className="flex justify-around gap-3 text-gray-500 mb-4">
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

          <div className="border border-gray-200 mb-5"></div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center w-full">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarkerAlt className=" text-lg text-orange-700"></FaMapMarkerAlt>
            <span className="text-orange-700">
              {" "}
              {property.location.city + ", " + property.location.state}{" "}
            </span>
          </div>
          <h3 className="px-4 py-2 rounded-lg text-blue-500 text-2xl font-bold text-right md:text-center lg:text-right">
            $ {getRateDisplay()}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedPropertyCard;
