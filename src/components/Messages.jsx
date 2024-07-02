"use client";
import { useState, useEffect } from "react";
import React from "react";
import Spinner from "@/app/loading";
import { toast } from "react-toastify";
import Link from "next/link";
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
      <section className="bg-blue-50">
        <div className="container m-auto py-24 max-w-6xl">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

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
        </div>
      </section>
    )
  );
};

export default Messages;
