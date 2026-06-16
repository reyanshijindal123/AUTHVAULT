"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import SearchBar from "@/components/SearchBar";
import CalendarView from "@/components/CalendarView";


type User = {
  name: string;
  email: string;
  password: string;
};

type Task = {
  id : number;
  text: string;
  dueDate:string;
  dueTime:string;
  priority: string;
  completed: boolean;
};

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState("Low");

  // Load user + auth check
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      router.push("/login");
      return;
    }

    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [router]);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    const newTask: Task={
      id: Date.now(),
       text: task,
    dueDate,
    dueTime,
    priority,
    completed: false,
  };

  setTasks([...tasks, newTask]);

  setTask("");
  setDueDate("");
  setDueTime("");
  setPriority("Low");
};
 const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks];

    updatedTasks[index].completed = !updatedTasks[index].completed;

    setTasks(updatedTasks);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    router.push("/login");
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = totalTasks - completedTasks;

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Welcome {user?.name}</h1>

              <p>{user?.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-5 py-2 rounded-xl hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl text-white">
            <h2>Total Tasks</h2>

            <p className="text-4xl font-bold">{totalTasks}</p>
          </div>

          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl text-white">
            <h2>Completed</h2>

            <p className="text-4xl font-bold">{completedTasks}</p>
          </div>

          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl text-white">
            <h2>Pending</h2>

            <p className="text-4xl font-bold">{pendingTasks}</p>
          </div>
        </div> 

        {/* Task Manager */}
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 mt-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Task Manager</h2>
         

          <div className="flex gap-3">
            <input
              value={task}
  onChange={(e) => setTask(e.target.value)}
  placeholder="Enter task..."
  className="
    flex-1
    p-4
    rounded-xl
    bg-white
    text-black
    border-2
    border-gray-300
    shadow-md
    outline-none
    focus:border-purple-500
  "
            />

            <button
              onClick={addTask}
              className="bg-white text-purple-600 px-5 rounded-xl font-bold"
            >
              Add
            </button>
          </div>
          <div className="mt-6 space-y-3">
  {tasks
    .filter((item) =>
      item.text.toLowerCase().includes(search.toLowerCase())
    )
    .map((item, index) => (
      <div
        key={item.id}
        className="flex justify-between items-center bg-white/10 p-4 rounded-xl"
      >
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleTask(index)}
            className="w-5 h-5 cursor-pointer"
          />

          <div>
            <p
              className={
                item.completed
                  ? "line-through text-gray-300"
                  : "text-white"
              }
            >
              {item.text}
            </p>

            <p className="text-sm text-gray-300">
              📅 {item.dueDate}
            </p>

            <p className="text-sm text-gray-300">
              ⏰ {item.dueTime}
            </p>

            <p className="text-sm text-yellow-300">
              🔥 {item.priority}
            </p>
          </div>
        </div>

        <button
          onClick={() => deleteTask(index)}
          className="bg-red-500 px-3 py-1 rounded-lg"
        >
          Delete
        </button>
      </div>
    ))}
</div>

        </div>
      </div>
    </main>
  );
}




