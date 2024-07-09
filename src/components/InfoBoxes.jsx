import {
  FaBookmark,
  FaCalendarAlt,
  FaEnvelope,
  FaListAlt,
  FaPhone,
  FaSearch,
} from "react-icons/fa";
import InfoBox from "./InfoBox";
const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-md">
          <InfoBox
            heading="For Renters"
            buttonInfo={{
              link: "/properties",
              backgroundColor: "bg-black",
              text: "Browse Properties",
            }}
          >
            <ul className="flex flex-row items-start py-4 space-x-2">
              <li className="flex basis-1 grow py-1 flex-wrap space-y-2 justify-center items-center text-center">
                <span>
                  <FaSearch className="text-2xl" />
                </span>
                <span>Search properties and filter by many parameters</span>{" "}
              </li>
              <li className="flex basis-1 grow py-1 flex-wrap space-y-2 justify-center items-center text-center">
                <span>
                  <FaBookmark className="text-2xl" />
                </span>
                <span>Bookmark or share properties you like</span>
              </li>
              <li className="flex basis-1 grow py-1 flex-wrap space-y-2 justify-center items-center text-center">
                <span>
                  <FaEnvelope className="text-2xl" />
                </span>
                <span>Reach out to the property owner directly</span>
              </li>
            </ul>
          </InfoBox>

          <InfoBox
            heading="For Property Owners"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              link: "/properties/add",
              backgroundColor: "bg-blue-500",
              text: "Add Property",
            }}
          >
            <ul className="flex flex-row items-start py-4 space-x-2">
              <li className="flex basis-1 grow py-1 flex-wrap space-y-2 justify-center items-center text-center ">
                <span>
                  <FaListAlt className="text-2xl text-blue-600" />
                </span>
                <span>List your properties and reach potential tenants</span>
              </li>
              <li className="flex basis-1 grow py-1 flex-wrap space-y-2 justify-center items-center text-center">
                <span>
                  <FaCalendarAlt className="text-2xl  text-blue-600" />
                </span>
                <span>Rent as an airbnb or long term</span>
              </li>
              <li className="flex basis-1 grow py-1 flex-wrap space-y-2 justify-center items-center text-center">
                <span><FaPhone className="text-2xl  text-blue-600" /></span>
                <span>Potential tenants will leave their contact info</span>
              </li>
            </ul>
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
