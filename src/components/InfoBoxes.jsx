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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            buttonInfo={{
              link: "/properties",
              backgroundColor: "bg-black",
              text: "Browse Properties",
            }}
          >
            <ul className="flex flex-row py-4 space-x-2">
              <li className="flex basis-1 grow py-1 flex-wrap space-y-2 justify-center items-center text-center ">
                <span>
                  <FaSearch className="text-2xl" />
                </span>
                <span>Search properties and filter by many parameters</span>{" "}
              </li>
              <li className="flex basis-1 grow py-1 flex-wrap space-y-2 justify-center items-center text-center">
                <FaBookmark className="text-2xl" /> Bookmark or share properties
                you like
              </li>
              <li className="flex basis-1 grow py-1 flex-wrap space-y-2 justify-center items-center text-center">
                <FaEnvelope className="text-2xl" /> Contact owner or share with
                friends
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
            <ul className="flex flex-row py-4 space-x-2">
              <li className="flex basis-1 grow py-1 flex-wrap space-y-2 justify-center items-center text-center ">
                <span>
                  <FaListAlt className="text-2xl text-blue-600" />
                </span>
                <span>List your properties and reach potential tenants</span>
              </li>
              <li className="flex basis-1 grow py-1 flex-wrap space-y-2 justify-center items-center text-center">
                <FaCalendarAlt className="text-2xl  text-blue-600" /> Rent as an airbnb or long
                term.
              </li>
              <li className="flex basis-1 grow py-1 flex-wrap space-y-2 justify-center items-center text-center">
                <FaPhone className="text-2xl  text-blue-600" /> Potential tenants will leave
                their contact info
              </li>
            </ul>
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
