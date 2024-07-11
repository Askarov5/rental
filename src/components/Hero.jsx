import React from "react";
import PropertySearchForm from "./PropertySearchForm";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <section className=" bg-hero bg-cover bg-center ">
      <div className="bg-opacity-50 bg-black py-20 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              {t('header')}
            </h1>
            <p className="my-4 text-xl text-white">
              {t('subheader')}
            </p>
          </div>
          <PropertySearchForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;
