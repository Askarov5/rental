import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import { fetchProperties } from "@/utils/request";

const PropertiesPage = async () => {
  const properties = await fetchProperties();

  return (
    <>
        <section className="bg-blue-700 py-4">
          <div className="mex-w-7xl mx-auto px-4 flex-flex-col items-start sm:px-6 lg:px-8">
            <PropertySearchForm />
          </div>
        </section>
        {
          <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.length === 0 ? (
                  <h3>No Properties Found</h3>
                ) : (
                  properties.map((p) => (
                    <PropertyCard property={p} key={p._id} />
                  ))
                )}
              </div>
            </div>
          </section>
        }
      </>
  );
};

export default PropertiesPage;
