"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect } from "react";
export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
  if (localStorage.getItem("isLoggedIn") === "true") {
    router.push("/dashboard");
  }
}, [router]);
  
const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setError("");
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u: any) => u.email === email && u.password === password,
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Login Successful");

    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20 bg-white/20 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        {error && <p className="text-yellow-400 text-center">{error}</p>}

        <input
          name="email"
          type="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/20 border border-white/30 outline-none placeholder:text-gray-200"
        />

        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/20 border border-white/30 outline-none placeholder:text-gray-200"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-purple-600 font-bold py-3 rounded-xl hover:scale-105 transition-all duration-300"
  >
          Login
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-200">
        Don't have an account?
        <Link
          href="/signup"
          className="ml-2 font-bold text-white hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
