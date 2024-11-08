"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/request";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/app/loading";
import PropertyImages from "@/components/PropertyImages";
import BookMarkButton from "@/components/BookMarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";
import { useTranslations } from "next-intl";

const PropertyPage = () => {
  const { id } = useParams();

  const t = useTranslations('Breadcrumbs')

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;

      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error("Error on fetching property", error);
      } finally {
        setLoading(false);
      }
    };

    if (property == null) fetchPropertyData();
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        {t('notFound')}
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />

          {/* <!-- Go Back --> */}
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> {t('backToProps')}
              </Link>
            </div>
          </section>

          {/* <!-- Property Info --> */}
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                {<PropertyDetails property={property} />}

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  <BookMarkButton property={property}/>
                  <ShareButtons  property={property}/>
                  <PropertyContactForm property={property}/>
                  
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
