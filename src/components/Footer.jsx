import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("Footer");
  return (
    <footer className="bg-gray-200 py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <Link href="/">
            <div className="rounded-full p-2 border-2 border-blue-600">
              <FaHome className="text-blue-600 text-2xl font-bold" />
            </div>
          </Link>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
          <ul className="flex space-x-4">
          </ul>
        </div>
        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {currentYear} Rental.KG - {t("rightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
