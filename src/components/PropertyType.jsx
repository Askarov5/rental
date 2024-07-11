import { useTranslations } from "next-intl";
import {
  FaBuilding,
  FaColumns,
  FaHome,
  FaWarehouse,
} from "react-icons/fa";

const PropertyType = ({ type }) => {
  const t = useTranslations("PropertyTypes");
  
  let propertyTypeComponent;
  
  if (type === "Room") {
    propertyTypeComponent = (
      <>
        <FaColumns className="inline mr-1 text-blue-600" /> {t("room")}
      </>
    );
  } else if (type === "Apartment") {
    propertyTypeComponent = (
      <>
        <FaBuilding className="inline mr-1 text-blue-600" /> {t("apartment")}
      </>
    );
  } else if (type === "Studio") {
    propertyTypeComponent = (
      <>
        <FaBuilding className="inline mr-1 text-blue-600" /> {t("studio")}
      </>
    );
  } else if (type === "House") {
    propertyTypeComponent = (
      <>
        <FaHome className="inline mr-1 text-blue-600" /> {t("house")}
      </>
    );
  } else if (type === "Townhouse") {
    propertyTypeComponent = (
      <>
        <span className="text-blue-600 mr-1"><FaWarehouse className="inline" /><FaWarehouse className="inline"/></span> {t("townhouse")}
      </>
    );
  } else if (type === "CabinOrCatage") {
    propertyTypeComponent = (
      <>
        <FaWarehouse className="inline mr-1 text-blue-600" /> {t("cabinOrCatage")}
      </>
    );
  } else {
    propertyTypeComponent = (
      <>
        <FaHome className="inline mr-1 text-blue-600" /> {type}
      </>
    );
  }

  return propertyTypeComponent;
};

export default PropertyType;
