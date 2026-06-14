"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setError("No user found. Please signup first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (
      email === user.email &&
      password === user.password
    ) {
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      router.push("/dashboard");
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <div
      className="
      w-full
      max-w-md
      bg-white/20
      backdrop-blur-lg
      border
      border-white/20
      shadow-2xl
      rounded-3xl
      p-8
      text-white
      "
    >
      <div className="flex flex-col items-center">
        <FaUserCircle size={80} />

        <h1 className="text-3xl font-bold mt-4">
          Login
        </h1>

        <p className="text-sm mt-2 text-gray-200">
          Welcome Back
        </p>
      </div>

      <form
        onSubmit={handleLogin}
        className="mt-8 space-y-4"
      >
        {error && (
          <p className="text-red-300 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
          w-full
          p-3
          rounded-xl
          bg-white/20
          outline-none
          border
          border-white/30
          placeholder:text-gray-200
          "
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
          w-full
          p-3
          rounded-xl
          bg-white/20
          outline-none
          border
          border-white/30
          placeholder:text-gray-200
          "
        />

        <button
          type="submit"
          className="
          w-full
          bg-white
          text-purple-600
          font-bold
          py-3
          rounded-xl
          hover:scale-105
          transition-all
          duration-300
          "
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm">
          Or continue with
        </p>

        <button
          className="
          mt-4
          flex
          items-center
          justify-center
          gap-2
          w-full
          bg-white
          text-black
          p-3
          rounded-xl
          "
        >
          <FcGoogle size={24} />
          Google
        </button>
      </div>
    </div>
  );
}