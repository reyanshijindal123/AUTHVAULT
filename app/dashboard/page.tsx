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
  id: number;
  text: string;
  dueDate: string;
  dueTime: string;
  priority: string;
  completed: boolean;
};

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
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
    const newTask: Task = {
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
  const deleteTask = (id: number): any => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (isConfirmed) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };
  const editTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)),
    );
  };
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold">Welcome {user?.name}</h1>

              <p>{user?.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full sm:w-auto bg-red-500 px-5 py-2 rounded-xl hover:bg-red-600"
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
        <form>
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 mt-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Task Manager</h2>

          <div className="flex flex-col  gap-3">
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e)=>{
                if(e.key==="Enter"){
                  e.preventDefault();
                  addTask();
                }
              }}
              placeholder="Enter task..."
              rows={3}
              className=" w-full min-h-[100px] p-4 rounded-xl bg-white text-black border-2 border-gray-300 shadow-md outline-none focus:border-purple-500 resize-y overflow-auto"
              />
            <button
              type="button"
              onClick={addTask}
              className="self-end bg-white text-purple-600 px-5 py-3 rounded-xl font-bold"
              >
                Add
            </button>
          </div>
          <div className="mt-6 space-y-3">
            {tasks
              .filter((item) =>
                item.text.toLowerCase().includes(search.toLowerCase()),
              ) 
              .map((item) => (
                
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-white/10 p-4 rounded-xl">
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* CHECKBOX */}
                    {editingId !== item.id && (
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleTask(item.id)}
                        className="w-5 h-5 cursor-pointer"
                      />
                    )}

                    {/* TEXT / EDIT INPUT */}
                    {editingId === item.id ? (
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="p-2 text-black rounded bg-white outline-none"
                      />
                    ) : (
                      <span
                        className={`break-words ${
                          item.completed
                            ? "line-through text-gray-300"
                            : "text-white"
                        }`}
                      >
                        {item.text}
                      </span>
                    )}
                  </div>

                  {/* RIGHT SIDE BUTTONS */}
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    {editingId === item.id ? (
                      <>
                        <button
                          onClick={() => {
                            if (!editText.trim()) return;

                            editTask(item.id, editText);
                          }}
                          className="flex-1 sm:flex-none bg-green-500 px-4 py-2 rounded-lg"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditText("");
                          }}
                          className="flex-1 sm:flex-none bg-gray-500 px-4 py-2 rounded-lg"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(item.id);
                            setEditText(item.text);
                          }}
                          className="flex-1 sm:flex-none bg-yellow-500 px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteTask(item.id)}
                          className="flex-1 sm:flex-none bg-red-500 px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button> 
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
        </form>
      </div>
    </main>
  );

}

