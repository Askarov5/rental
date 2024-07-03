import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";

import PropertyPlaceHolderImage from "@/assets/images/property-placeholder.jpg";

const PropertyCard = ({ property }) => {
  const { street, city, state, zipcode } = property.location;
  const address = ` ${street}, ${city}, ${state} ${zipcode}`;
  const { rates } = property;
  const getRateDisplay = () => {
    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
  };

  return (
    <div className="rounded-xl shadow-md relative">
      <Image
        src={property.images[0] || PropertyPlaceHolderImage}
        alt=""
        height={0}
        width={0}
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          ${getRateDisplay()}
        </h3>
        <div className="w-full flex justify-between items-center mb-4">
          <div className="flex justify-start gap-5 text-green-900 text-sm">
            {rates.nightly > 0 ? (
              <p title={`$ ${property.rates.nightly}`} className="cursor-help">
                <FaMoneyBill className="inline mr-1" /> Nightly
              </p>
            ) : (
              <></>
            )}

            {rates.monthly > 0 ? (
              <p title={`$ ${property.rates.monthly}`} className="cursor-help">
                <FaMoneyBill className="inline mr-1" /> Monthly
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="text-gray-600">{property.type}</div>
        </div>
        <div className="text-left md:text-center lg:text-left mb-4">
          <h3 className="text-xl font-bold mb-1">{property.name}</h3>
          <address className="text-gray-500 text-sm">{address}</address>
        </div>

        <div className="flex justify-around gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline mr-1" /> {property.beds}{" "}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline mr-1" /> {property.baths}{" "}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline mr-1" />
            {property.square_feet}{" "}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className=" text-orange-700 mt-1" />
            <span className="text-orange-700">
              {" "}
              {property.location.city} {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
