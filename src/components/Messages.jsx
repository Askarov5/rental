"use client";
import { useState, useEffect } from "react";
import React from "react";
import Spinner from "@/app/loading";
import { toast } from "react-toastify";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages");
        if (response.status === 200) {
          const data = await response.json();
          setMessages(data);
        } else {
          toast.error("Unable to fetch messages. Please try again.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Unable to fetch messages. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <Spinner />;

  return (
    !loading && (
      <section className="">
        <div className="border-b border-gray-200 pb-5">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Your Messages
          </h3>
        </div>
        <div className="mt-5">
          {messages.length === 0 ? (
            <div className="text-center">
              <h2 className="text-xl mb-4">No Messages Found</h2>
              <p className="text-gray-700">
                You have not received any messages yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <Message message={message} key={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    )
  );
};

export default Messages;
