"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import profileImageDefault from "@/assets/images/profile.png";

const ProfilePage = () => {
  const { data: session } = useSession();

  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  return (
    <section className="">
      <div className="border-b border-gray-200 pb-5">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              My Profile
            </h3>
          </div>
      <div className="flex flex-col md:flex-row mt-5">
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
          {/*<h2 className="text-xl font-semibold mb-4">Public Details</h2>*/}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
