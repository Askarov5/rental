"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import propertyImageDefault from "@/assets/images/property-placeholder.jpg";
import Spinner from "@/app/loading";
import { toast } from "react-toastify";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const MyProperties = () => {
  const { data: session } = useSession();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) {
        return;
      }

      try {
        const result = await fetch(`/api/properties/user/${userId}`);

        if (result.ok) {
          const data = await result.json();
          setProperties(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch user properties when session is available
    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  // Handle delete property
  const handleDeleteProperty = async (propertyId) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmDelete) return;

    if (!propertyId) return;

    try {
      const result = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (result.ok) {
        // remove property from the state
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        );
        setProperties(updatedProperties);

        toast.success("Property Deleted Successfully");
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete property", error.message);
    }
  };

  return (
    <section className="">
      <div className="container m-auto">
          <div className="border-b border-gray-200 pb-5  mb-5 flex flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              My Listings
            </h3>
            <a
          href="/dashboard/add-property"
          className="ml-auto flex items-center gap-x-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add New Property
        </a>
          </div>
          <div className="">
            {!loading && properties.length === 0 && (
              <p>You have no property listings</p>
            )}

            {loading ? (
              <Spinner loading={loading} />
            ) : (
              properties.map((property, index) => (
                <div
                  className="mb-4 flex gap-4 justify-between p-2 shadow items-center"
                  key={index}
                >
                  <div>
                    <Link
                      href={`/properties/${property._id}`}
                      className="relative"
                    >
                      <Image
                        className="rounded-md w-[200px] h-auto"
                        src={property.images[0] || propertyImageDefault}
                        alt={property.name}
                        width="0"
                        height="0"
                        sizes="100vw"
                        priority={true}
                      />
                    </Link>
                  </div>

                  <div className="w-full">
                    <Link
                      href={`/properties/${property._id}`}
                      className="relative"
                    >
                      <p className="text-lg font-semibold">{property.name}</p>
                    </Link>
                    <address className="text-gray-600">
                      {`${property.location.street}, ${property.location.city}, ${property.location.state}`}
                    </address>
                  </div>
                  <div className="flex-1 flex flex-col justify-end items-center gap-2">
                    <Link
                      href={`/properties/${property._id}/edit`}
                      className="bg-blue-500 text-white p-2 px-3 rounded-md hover:bg-blue-600 inline-block"
                    >
                      <FaPencilAlt />
                    </Link>
                    <button
                      onClick={() => handleDeleteProperty(property._id)}
                      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                      type="button"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
      </div>
    </section>
  );
};

export default MyProperties;
