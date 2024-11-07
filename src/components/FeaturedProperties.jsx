import { fetchProperties } from "@/utils/request";
import FeaturedPropertyCard from "./FeaturedPropertyCard";
import { getTranslations } from "next-intl/server";
import geoCoder from "@/utils/geoCoder";

const FeaturedProperties = async () => {
  const data = await fetchProperties({ showFeatured: true });
  const properties = data?.properties;

  const t = await getTranslations("FeaturedProperties");

  const geoCode = geoCoder('Асаналиева, 28 , ​Ленинский район Бишкек​ Бишкек​')

  return (
    properties ? (
    <section className="bg-blue-50 px-4 py-12">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {properties &&
            properties.map((property, index) => (
              <FeaturedPropertyCard property={property} key={index} />
            ))}
        </div>
      </div>
    </section>) : (
      <p>{t('notFound')}</p>
    )
  );
};

export default FeaturedProperties;
