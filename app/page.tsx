import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4">
      <div className="max-w-2xl w-full text-center bg-white/20 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10 text-white">

        <h1 className="text-5xl font-bold mb-4">
          AuthVault
        </h1>

        <p className="text-lg mb-8">
          Modern Authentication Dashboard
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}