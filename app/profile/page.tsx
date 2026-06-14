"use client";

import { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
};

export default function ProfilePage() {
  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">
        Profile
      </h1>

      <div className="bg-white shadow-xl rounded-3xl p-6 max-w-lg">
        <p>
          <strong>Name:</strong>{" "}
          {user?.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user?.email}
        </p>
      </div>
    </main>
  );
}