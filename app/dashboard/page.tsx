"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  password: string;
};

type Task = {
  text: string;
  completed: boolean;
};

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedTasks =
      localStorage.getItem("tasks");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [router]);

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;

    setTasks([
      ...tasks,
      {
        text: task,
        completed: false,
      },
    ]);

    setTask("");
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTask = (index: number) => {
    const updated = [...tasks];

    updated[index].completed =
      !updated[index].completed;

    setTasks(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks =
    totalTasks - completedTasks;

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 text-white">

          <div className="flex justify-between items-center">

            <div>
              <h1 className="text-4xl font-bold">
                Welcome {user?.name}
              </h1>

              <p>{user?.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-5 py-2 rounded-xl"
            >
              
              Logout
            </button>

          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl text-white">
            <h2>Total Tasks</h2>
            <p className="text-4xl font-bold">
              {totalTasks}
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl text-white">
            <h2>Completed</h2>
            <p className="text-4xl font-bold">
              {completedTasks}
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl text-white">
            <h2>Pending</h2>
            <p className="text-4xl font-bold">
              {pendingTasks}
            </p>
          </div>

        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 mt-6 text-white">

          <h2 className="text-2xl font-bold mb-4">
            Task Manager
          </h2>

          <div className="flex gap-3">

            <input
              value={task}
              onChange={(e) =>
                setTask(e.target.value)
              }
              placeholder="Enter task"
              className="flex-1 p-3 rounded-xl text-black"
            />

            <button
              onClick={addTask}
              className="bg-white text-purple-600 px-5 rounded-xl font-bold"
            >
              Add
            </button>

          </div>

          <div className="mt-6 space-y-3">

            {tasks.map((task, index) => (
              <div
                key={index}
                className="bg-white/10 p-4 rounded-xl flex justify-between items-center"
              >
                <span
                  className={
                    task.completed
                      ? "line-through"
                      : ""
                  }
                >
                  {task.text}
                </span>

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      toggleTask(index)
                    }
                    className="bg-green-500 px-3 py-1 rounded"
                  >
                    ✓
                  </button>

                  <button
                    onClick={() =>
                      deleteTask(index)
                    }
                    className="bg-red-500 px-3 py-1 rounded"
                  >
                    X
                  </button>

                </div>
              </div>
            ))}

          </div>

        </div>

      </div>

    </main>
  );
}