import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { fetchProperties } from "@/utils/request";
import { getTranslations } from "next-intl/server";

const RecentProperties = async () => {
  const data = await fetchProperties();
  const recentProperties = data?.properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  const t = await getTranslations("RecentProperties");

  return (
    <>
      <section className="px-4 py-12">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            {t("title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties && recentProperties.length === 0 ? (
              <p>{t("notFound")}</p>
            ) : (
              recentProperties && recentProperties.map((p) => (
                <PropertyCard key={p._id} property={p} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          {t("viewAll")}
        </Link>
      </section>
    </>
  );
};

export default RecentProperties;