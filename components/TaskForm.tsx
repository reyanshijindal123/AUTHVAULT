"use client";

type Props = {
  task: string;
  setTask: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
  dueTime: string;
  setDueTime: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  addTask: () => void;
};

export default function TaskForm({
  task,
  setTask,
  dueDate,
  setDueDate,
  dueTime,
  setDueTime,
  priority,
  setPriority,
  addTask,
}: Props) {
  return (
    <div className="bg-white/20 p-6 rounded-3xl mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Add Task
      </h2>

      <div className="grid md:grid-cols-4 gap-3">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Task Name"
          className="p-3 rounded-xl text-black"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
          className="p-3 rounded-xl text-black"
        />

        <input
          type="time"
          value={dueTime}
          onChange={(e) =>
            setDueTime(e.target.value)
          }
          className="p-3 rounded-xl text-black"
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          className="p-3 rounded-xl text-black"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <button
        onClick={addTask}
        className="mt-4 bg-white text-purple-600 px-5 py-3 rounded-xl font-bold"
      >
        Add Task
      </button>
    </div>
  );
}