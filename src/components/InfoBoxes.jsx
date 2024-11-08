import {
  FaBookmark,
  FaCalendarAlt,
  FaEnvelope,
  FaListAlt,
  FaPhone,
  FaSearch,
} from "react-icons/fa";
import InfoBox from "./InfoBox";
import { useTranslations } from "next-intl";

const InfoBoxes = () => {
  const t = useTranslations("InfoBoxes");
  const renterBtnTxt = t("buttonRenterTxt");
  const ownerBtnTxt = t("buttonOwnerTxt");

  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-md">
          <InfoBox
            heading={t("forRenters")}
            buttonInfo={{
              link: "/properties",
              backgroundColor: "bg-black",
              text: renterBtnTxt,
              ariaLabel: "Browse properties for renters", // Improve accessibility
            }}
          >
            <ul className=" font-light flex flex-row gap-1 items-start py-4 space-x-2">
              <li className="flex basis-1 grow gap-2 flex-wrap justify-center items-center text-center">
                <span aria-hidden="true">
                  <FaSearch className="text-3xl" />{" "}
                  {/* Increase icon size for better visibility */}
                </span>
                <span>{t('searchTxt')}</span>{" "}
                {/* Make the action clearer */}
              </li>
              <li className="flex basis-1 grow gap-2 flex-wrap justify-center items-center text-center">
                <span aria-hidden="true">
                  <FaBookmark className="text-3xl" />
                </span>
                <span>{t('saveTxt')}</span>{" "}
                {/* Clarify the benefit */}
              </li>
              <li className="flex basis-1 grow gap-2 flex-wrap justify-center items-center text-center">
                <span aria-hidden="true">
                  <FaEnvelope className="text-3xl" />
                </span>
                <span>{t('messageTxt')}</span>{" "}
                {/* Simplify the message */}
              </li>
            </ul>
          </InfoBox>

          <InfoBox
            heading={t("forOwners")}
            backgroundColor="bg-blue-100"
            buttonInfo={{
              link: "/properties/add",
              backgroundColor: "bg-blue-500",
              text: ownerBtnTxt,
            }}
          >
            <ul className="font-light flex gap-1 flex-row items-start py-4 space-x-2">
              <li className="flex basis-1 grow gap-2 flex-wrap justify-center items-center text-center ">
                <span>
                  <FaListAlt className="text-2xl text-blue-600" />
                </span>
                <span>{t('listTxt')}</span>
              </li>
              <li className="flex basis-1 grow  gap-2   flex-wrap justify-center items-center text-center">
                <span>
                  <FaCalendarAlt className="text-2xl  text-blue-600" />
                </span>
                <span>{t('termsTxt')}</span>
              </li>
              <li className="flex basis-1 grow gap-2   flex-wrap justify-center items-center text-center">
                <span>
                  <FaPhone className="text-2xl  text-blue-600" />
                </span>
                <span>{t('contactTxt')}</span>
              </li>
            </ul>
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
