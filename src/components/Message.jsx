"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { set } from "mongoose";

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  const handleReadToggle = async () => {
    try {
      const response = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (response.status === 200) {
        const body = await response.json();
        // Update the read status in the local state
        setIsRead(body.read);
        // Update unread count in the global context
        setUnreadCount((prevCount) => (body.read ? prevCount - 1 : prevCount + 1));
        // Show a success message
        body.read
          ? toast.success("Message marked as read")
          : toast.success("Message marked as unread");
      } else {
        console.error("Unable to update message");
        toast.error("Unable to update message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to update message. Please try again.");
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });
      const body = await response.json();

      if (response.status === 200) {
        // Update unread count in the global context if the message was unread
        if (!isRead) {
          setUnreadCount((prevCount) => prevCount - 1);
        }
        
        setIsDeleted(true);
        toast.success(body.message);
      } else {
        console.error("Unable to delete message");
        toast.error(body.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete message. Please try again.");
    }
  };

  if (isDeleted) return null;

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-3 bg-yellow-500 text-white py-1 px-3 rounded-md">
          New
        </div>
      )}

      <div>
        <h2 className="text-xl mb-2">
          <span className="font-bold">Property Inquiry: </span>
          <Link
            href={`${process.env.NEXT_PUBLIC_DOMAIN}/properties/${message.property._id}`}
            className="text-blue-500"
          >
            {message.property.name}
          </Link>
        </h2>
        <p className="text-gray-700">{message.body}</p>
      </div>

      <div className="text-sm">
        <h5 className="text-gray-700 font-semibold mt-2">Sender Information</h5>
        <ul className="flex flex-wrap gap-3">
          <li>
            <strong>Name: </strong> {message.name}
          </li>
          <li>
            <strong>Email: </strong>
            <Link href={`mailto:${message.email}`} className="text-blue-500">
              {message.email}
            </Link>
          </li>
          <li>
            <strong>Phone: </strong>
            <Link href={`tel:${message.phone}`} className="text-blue-500">
              {message.phone}
            </Link>
          </li>
          <li>
            <strong>Received: </strong>{" "}
            {new Date(message.createdAt).toLocaleString("en-US")}
          </li>
        </ul>
      </div>
      <div className="buttons">
        <button
          className={`mt-4 mr-3 ${
            isRead ? "bg-gray-300" : "bg-blue-500 text-white"
          } py-1 px-3 rounded-md`}
          onClick={handleReadToggle}
        >
          {isRead ? "Mark As Unread" : "Mark As Read"}
        </button>
        <button
          className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Message;
