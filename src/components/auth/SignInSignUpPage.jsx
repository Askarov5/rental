// src/app/auth/page.jsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";

const SignInSignUpPage = () => {
  const [activeTab, setActiveTab] = useState("login"); // Toggle between login and register
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/"); // Redirect after sign-in or sign-up
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {activeTab === "login" ? "Sign In" : "Register"}
        </h2>

        <div className="flex justify-around mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`p-2 ${activeTab === "login" ? "border-b-2 border-blue-500" : ""}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`p-2 ${activeTab === "register" ? "border-b-2 border-blue-500" : ""}`}
          >
            Register
          </button>
        </div>

        {activeTab === "login" ? (
          <SignInForm onSignInSuccess={handleRedirect} />
        ) : (
          <SignUpForm onSignUpSuccess={handleRedirect} />
        )}
      </div>
    </div>
  );
};

export default SignInSignUpPage;
