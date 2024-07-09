import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarkerAlt,
} from "react-icons/fa";
import PropertyMap from "./PropertyMap";

const PropertyDetails = ({ property }) => {
  return (
    <main>
      <div className="bg-white p-6 rounded-md shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4 text-end">{property.type}</div>
        <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          {<FaMapMarkerAlt className="text-lg text-orange-700 mr-2" />}
          <p className="text-orange-700">{`${property.location.street} ${property.location.city} ${property.location.state}`}</p>
        </div>

        <h3 className="text-lg font-bold my-6 p-2 border-b">
          Rates & Options
        </h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Nightly</div>
            {property.rates.nightly ? (
              <div className="text-2xl font-bold text-blue-500">
                $ {property.rates.nightly.toLocaleString()}
              </div>
            ) : (
              <div className="text-2xl font-bold">
                {<FaTimes className="text-red-700" />}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Monthly</div>
            {property.rates.monthly ? (
              <div className="text-2xl font-bold text-blue-500">
                $ {property.rates.monthly.toLocaleString()}
              </div>
            ) : (
              <div className="text-2xl font-bold">
                {<FaTimes className="text-red-700" />}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-md shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6 border-b">Description & Details</h3>
        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
          <p>
            <span>
              <FaBed className="inline" /> {property.beds}{" "}
            </span>
            <span className="hidden sm:inline"> Beds</span>
          </p>
          <p>
            {<FaBath className="inline" />} {property.baths}
            <span className="hidden sm:inline"> Baths</span>
          </p>
          <p>
            {<FaRulerCombined className="inline" />} {property.square_feet}{" "}
            <span className="hidden sm:inline"> sqft</span>
          </p>
        </div>
        <p className="text-gray-500 mb-4 text-center">{property.description}</p>
      </div>

      <div className="bg-white p-6 rounded-md shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6 border-b">Amenities</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
          {property.amenities.length > 0
            ? property.amenities.map((amenity) => (
                <li className="mt-2" key={amenity}>
                  <FaCheck className="text-green-600 mr-2 inline" /> {amenity}
                </li>
              ))
            : ""}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-md shadow-md mt-6">
        <PropertyMap property={property}/>
      </div>
    </main>
  );
};

export default PropertyDetails;
