import { useTranslations } from "next-intl";
import React from "react";

const RateOfPropertyCard = ({ rates }) => {
  const t = useTranslations("PropertyCard");

  let rateOfPropertyCard;
  if (rates.monthly) {
    rateOfPropertyCard = (
      <span>
        $ {" "} {rates.monthly.toLocaleString()}
        <small>/{t('month')}</small>
      </span>
    );
  } else if (rates.nightly) {
    rateOfPropertyCard = (
      <span>
        $ {" "}
        {rates.nightly.toLocaleString()}
        <small>/{t('night')}</small>
      </span>
    );
  }

  return <>{rateOfPropertyCard}</>;
};

export default RateOfPropertyCard;
