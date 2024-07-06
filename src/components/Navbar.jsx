"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import profileDefault from "@/assets/images/profile.png";
import { FaGoogle, FaHome } from "react-icons/fa";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import UnreadMessageCount from "./UnreadMessageCount";

const Navbar = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);

  const pathname = usePathname();

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();
  }, []);

  return (
    <nav className="bg-white border-b border-blue-50 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-blue-600 hover:bg-gray-300 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* <!-- Logo --> */}
            <Link className="flex overflow-hidden rounded flex-shrink-0 items-center group justify-center relative cursor-pointer" href="/">
              <div className="rounded-full p-2 border-2 border-blue-600">
                <FaHome className="text-blue-600 text-2xl font-bold" />
              </div>
              

              <span className="hidden md:block text-blue-600 text-2xl font-bold ml-2">
                Rental.KG{" "}
              </span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
            </Link>
            {/* <!-- Desktop Menu Hidden below md screens --> */}
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-4 text-blue-600 font-semibold">
                <Link
                  href="/"
                  className={`${
                    pathname === "/" ? "after:scale-x-100" : ""
                  }  rounded-md py-2 relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-blue-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
                >
                  Home
                </Link>
                <Link
                  href="/properties"
                  className={`${
                    pathname === "/properties" ? "after:scale-x-100" : ""
                  } rounded-md py-2 relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-blue-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
                >
                  Properties
                </Link>
                {session && (
                  <Link
                    href="/dashboard/add-property"
                    className={`${
                      pathname === "/dashboard/add-property" ? "after:scale-x-100" : ""
                    } rounded-md py-2 relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-blue-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
                  >
                    List a Property
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
          {!session && (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                {providers &&
                  Object.values(providers).map((provider, index) => (
                    <button
                      onClick={() => signIn(provider.id)}
                      key={index}
                      className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    >
                      <FaGoogle className="text-white mr-2"></FaGoogle>
                      <span>Login or Register</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* <!-- Right Side Menu (Logged In) --> */}
          {session && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <Link href="/dashboard/messages" className="relative group">
                <button
                  type="button"
                  className="relative rounded-full border border-blue-600 p-1 text-blue-600 hover:text-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:text-blue-300 focus:ring-offset-2 focus:ring-offset-blue-500"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                <UnreadMessageCount session={session}/>
              </Link>
              {/* <!-- Profile dropdown button --> */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={profileImage || profileDefault}
                      alt=""
                      width={40}
                      height={40}
                    />
                  </button>
                </div>

                {/* <!-- Profile dropdown --> */}
                {isProfileMenuOpen && (
                  <div
                    id="user-menu"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      href="/dashboard"
                      className={`${
                        pathname === "/dashboard" ? "after:scale-x-100" : ""
                      } px-4 py-2 text-sm text-blue-700 relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-blue-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/dashboard/messages"
                      className={ `${
                        pathname === "/dashboard/messages" ? "after:scale-x-100" : ""
                      }  px-4 py-2 text-sm text-blue-700 relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-blue-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-1"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Messages
                    </Link>
                    <Link
                      href="/dashboard/properties"
                      className={`${
                        pathname === "/dashboard/properties" ? "after:scale-x-100" : ""
                      } px-4 py-2 text-sm text-blue-700 relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-blue-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      My Listings
                    </Link>
                    <Link
                      href="/dashboard/bookmarks"
                      className={`${
                        pathname === "/dashboard/bookmarks" ? "after:scale-x-100" : ""
                      } px-4 py-2 text-sm text-blue-700 relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-blue-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Saved Properties
                    </Link>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        signOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {isMobileMenuOpen && (
        <div className="" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/"
              className={`${
                pathname === "/" ? "after:scale-x-100" : ""
              } rounded-md px-3 py-2 text-base font-medium text-blue-700 relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-blue-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
            >
              Home
            </Link>
            <Link
              href="/properties"
              className={`${
                pathname === "/properties" ? "after:scale-x-100": ""
              } rounded-md px-3 py-2 text-base font-medium text-blue-700 relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-blue-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
            >
              Properties
            </Link>
            {session && (
              <Link
                href="/properties/add"
                className={`${
                  pathname === "/properties/add" ? "after:scale-x-100" : ""
                } rounded-md px-3 py-2 text-base font-medium text-blue-700 relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-blue-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
              >
                Add Property
              </Link>
            )}

            {!session &&
              providers &&
              Object.values(providers).map((provider, index) => (
                <button
                  onClick={() => signIn(provider.id)}
                  key={index}
                  className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                >
                  <FaGoogle className="text-white mr-2"></FaGoogle>
                  <span>Login or Register</span>
                </button>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
