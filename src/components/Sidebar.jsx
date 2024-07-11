"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import { usePathname } from "next/navigation";
import {
  FaFileAlt,
  FaUserAlt,
  FaFolderOpen,
  FaEnvelopeOpen,
  FaBookmark,
  FaPlusSquare,
} from "react-icons/fa";


const navigation = [
  {
    
    name: "Dashboard",
    href: "/dashboard",
    icon: FaUserAlt,
    current: true,
    tProp: "dashboard",
  },
  {
    name: "Add Property",
    href: "/dashboard/add-property",
    icon: FaPlusSquare,
    current: false,
    tProp: "addProperty"
  },
  {
    name: "My Listings",
    href: "/dashboard/properties",
    icon: FaFolderOpen,
    current: false,
    tProp: "myListings"
  },
  {
    name: "Saved Properties",
    href: "/dashboard/bookmarks",
    icon: FaBookmark,
    current: false,
    tProp: "bookmarks"
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: FaEnvelopeOpen,
    count: "0",
    current: false,
    tProp: "messages"
  },
  {
    name: "Documents",
    href: "/dashboard/documents",
    icon: FaFileAlt,
    current: false,
    tProp: "documents"
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  // set the unread count for the Messages navigation item
  const { unreadCount } = useGlobalContext();
  navigation.filter((item) => item.name === "Messages")[0].count = unreadCount;

  // update the current navigation item based on the current route
    const currentPath = usePathname();
    navigation.forEach((item) => {
        item.current = currentPath === item.href;
    });

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white h-full">
      <nav className="flex flex-1 flex-col">
        <ul role="list" className=" space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                  "group flex gap-x-3 items-center rounded-md p-2 text-sm font-semibold leading-6 px-6"
                )}
              >
                <item.icon
                  aria-hidden="true"
                  className={classNames(
                    item.current
                      ? "text-blue-600"
                      : "text-gray-400 group-hover:text-blue-600",
                    "h-5 w-5 shrink-0"
                  )}
                />
                {item.name}
                {item.count ? (
                  <span
                    aria-hidden="true"
                    className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
                  >
                    {item.count}
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
