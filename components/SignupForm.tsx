"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

import type { User } from "@/app/types/user";

export default function SignupForm() {
  const router = useRouter();
  useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    router.push("/dashboard");
  }
}, [router]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = (e: React.FormEvent) => {
    console.log("Submit button click")
    
    e.preventDefault();

    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Required field validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }
    

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    }

    setErrors(newErrors);

    // Stop if any required field is missing
    if (
      newErrors.name ||
      newErrors.email ||
      newErrors.password ||
      newErrors.confirmPassword
    ) {
      return;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email",
      }));
      return;
    }
    

    // Password Match Validation
    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }
    
  // Get Existing Users
    const storedUsers = localStorage.getItem("users");

    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    // Check Duplicate Email
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      setErrors((prev) => ({
        ...prev,
        email: "Account already exists with this email",
      }));
      return;
    }

    // Create New User
    const newUser: User = {
      name,
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("isLoggedIn", "true");

    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert("Signup Successful");

    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/20 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8 text-white">
      {/* Header */}
      <div className="flex flex-col items-center">
        <FaUserCircle size={80} />

        <h1 className="text-3xl font-bold mt-4">Sign Up</h1>

        <p className="text-sm mt-2 text-gray-200 text-center">
          Create your Task Vault account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSignup} className="mt-8 space-y-4">
        {/* Error Messages (safe fallback) */}

        <div className="space-y-2">
        {/* Name */}
        <input
          type="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/20 border border-white/30 outline-none placeholder:text-gray-200"
        />
        {errors?.name && (
          <span className="text-yellow-400 text-sm ">{errors?.name}</span>
        )}
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/20 border border-white/30 outline-none placeholder:text-gray-200"
        />
        {errors?.email && (
          <span className="text-yellow-400 text-sm">{errors?.email}</span>
        )}

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           
            className="w-full p-4 pr-12 rounded-xl bg-white/20 border border-white/30 outline-none placeholder:text-gray-200"
          />
          

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && (
            <p className="text-yellow-400 text-sm mt-1 mb-2 whitespace-pre-line">{errors.password}</p>
          )}
          {(
  password.length > 0 ||
  confirmPassword.length > 0
) &&
!(
  password === confirmPassword &&
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /[0-9]/.test(password) &&
  /[!@#$%^&*]/.test(password)
) && (
  <p className="text-sm text-gray-200 mt-2">
    Example: TaskVault@123 (minimum 8 characters with uppercase, lowercase, number and special character)
  </p>
)}
            
          

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/20 border border-white/30 outline-none placeholder:text-gray-200"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-yellow-400 text-sm">{errors.confirmPassword}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          // type="button"
          className="w-full bg-white text-purple-600 font-bold py-3 rounded-xl hover:scale-105 transition-all duration-300 active:scale-95"
        >
          Sign Up
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center mt-6 text-sm text-gray-200">
        Already have an account?
        <Link
          href="/login"
          className="ml-2 font-bold text-white hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
