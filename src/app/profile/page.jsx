"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import profileImageDefault from "@/assets/images/profile.png";
import propertyImageDefault from "@/assets/images/property-placeholder.jpg";
import Spinner from "@/app/loading";
import { toast } from "react-toastify";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const ProfilePage = () => {
  const { data: session } = useSession();

  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

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
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-10 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={profileImage || profileImageDefault}
                  alt="User Profile Picture"
                />
              </div>
              <h2 className="text-xl mb-4">
                <span className="font-bold block">Name: </span>{" "}
                <span>{profileName}</span>
              </h2>
              <h2 className="text-xl">
                <span className="font-bold block">Email: </span>{" "}
                <span>{profileEmail}</span>
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>

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
                      <p className="text-lg font-semibold">{property.name}</p>
                      <address className="text-gray-600">
                        {`${property.location.street}, ${property.location.city}, ${property.location.state}`}
                      </address>
                    </div>
                    <div className="w-full flex justify-end items-center gap-2">
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
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
