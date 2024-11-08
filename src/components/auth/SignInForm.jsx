// src/components/auth/SignInForm.jsx

import { useState } from "react";
import { signIn } from "next-auth/react";

const SignInForm = ({ onSignInSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      alert("Invalid email or password");
    } else {
      onSignInSuccess();
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/" });
    setLoading(false);
  };

  return (
    <div>
      {/* Google Sign In */}
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full p-2 bg-blue-500 text-white rounded-md mb-4 flex items-center justify-center"
      >
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>

      <div className="my-4 text-center">OR</div>

      {/* Email/Password Sign In */}
      <form onSubmit={handleEmailPasswordSignIn} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button type="submit" disabled={loading} className="w-full p-2 bg-green-500 text-white rounded-md">
          {loading ? "Signing in..." : "Sign in with Email"}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
