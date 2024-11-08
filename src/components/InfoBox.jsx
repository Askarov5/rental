import Link from "next/link";

const InfoBox = ({
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
  children,
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-md shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold text-center`}>{heading}</h2>
      <div className={`${textColor} mt-2 mb-4`}>{children}</div>
      <Link
        href={buttonInfo?.link}
        className={`block ${buttonInfo?.backgroundColor} text-white text-center rounded-md px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo?.text}
      </Link>
    </div>
  );
};

export default InfoBox;
