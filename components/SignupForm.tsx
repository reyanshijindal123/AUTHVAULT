"use client";

import { FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type {User} from "@/app/types/user";


export default function SignupForm() {
    const router = useRouter();
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword,setconfirmPassword]=useState("");
    const[error,setError] = useState("");

    const handleSignup = (e: React.FormEvent) => {
  e.preventDefault(); 

    setError("");

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const user: User = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    alert("Signup Successful");

    router.push("/login");
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
          Sign Up
        </h1>

        <p className="text-sm mt-2 text-gray-200">
          Create Your Account
        </p>
      </div>

      <form 
      onSubmit={handleSignup}
      className="mt-8 space-y-4">
        
    {
        error && (
            <p className ="text-red-300 text-center">
                {error}
            </p>
        )
    }   

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e)=> setName(e.target.value)}
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
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
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
          onChange={(e)=> setPassword(e.target.value)}
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
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}  
          
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
          Sign Up
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

      <p className="text-center mt-6 text-sm">
        Already have an account?
        <span className="font-bold cursor-pointer ml-2">
          Login
        </span>
      </p>
    </div>
  );
}