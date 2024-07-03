import Image from "next/image";
import {
    FaBed,
    FaBath,
    FaRulerCombined,
    FaMoneyBill,
    FaMapMarker,
  } from "react-icons/fa";
import PropertyPlaceHolderImage from "@/assets/images/property-placeholder.jpg";
import Link from "next/link";

const FeaturedPropertyCard = ({ property }) => {
  const { rates } = property;
  const getRateDisplay = () => {
    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row">
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
          <div className="flex justify-end text-green-900 text-sm">
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
          <div className="text-gray-600 text-end">{property.type}</div>
        </div>
        
        <div className="w-full">
          <h3 className="text-xl font-bold mb-2">{property.name}</h3>

          <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
            $ {getRateDisplay()}
          </h3>
          <div className="flex justify-around gap-3 text-gray-500 mb-4">
            <p>
              <FaBed className="inline mr-1"/> {property.beds}{" "}
              <span className="md:hidden lg:inline">Beds</span>
            </p>
            <p>
              <FaBath className="inline mr-1"/> {property.baths}{" "}
              <span className="md:hidden lg:inline">Baths</span>
            </p>
            <p>
              <FaRulerCombined className="inline mr-1"/>
              {property.square_feet}{" "}
              <span className="md:hidden lg:inline">sqft</span>
            </p>
          </div>
          
          <div className="border border-gray-200 mb-5"></div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between w-full">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className=" text-lg text-orange-700"></FaMapMarker>
            <span className="text-orange-700">
              {" "}
              {property.location.city + ", " + property.location.state}{" "}
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

export default FeaturedPropertyCard;
