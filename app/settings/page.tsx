"use client";

export default function SettingsPage() {

  const clearTasks = () => {
    localStorage.removeItem("tasks");

    alert("Tasks Cleared");
  };

  return (
    <main className="min-h-screen p-10">

      <h1 className="text-4xl font-bold mb-6">
        Settings
      </h1>

      <button
        onClick={clearTasks}
        className="bg-red-500 text-white px-6 py-3 rounded-xl"
      >
        Clear All Tasks
      </button>

    </main>
  );
}