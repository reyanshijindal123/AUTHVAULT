"use client";

import { getUser } from "@/utils/cookie";
export default function ProfileCard() {
<div className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-3xl p-6 mt-8 text-white shadow-2xl">

  <h2 className="text-2xl font-bold mb-4">
    My Tasks
  </h2>

  <div className="flex gap-3 mb-4">

    <input
      type="text"
      placeholder="Add a task..."
      value={task}
      onChange={(e) =>
        setTask(e.target.value)
      }
      className="
      flex-1
      p-3
      rounded-xl
      bg-white/20
      border
      border-white/30
      outline-none
      "
    />

    <button
      onClick={addTask}
      className="
      bg-green-500
      px-5
      rounded-xl
      font-bold
      "
    >
      Add
    </button>

  </div>

  <div className="space-y-3">

    {tasks.map((item, index) => (

      <div
        key={index}
        className="
        flex
        justify-between
        items-center
        bg-white/10
        p-3
        rounded-xl
        "
      >

        <div className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={item.completed}
            onChange={() =>
              toggleTask(index)
            }
          />

          <span
            className={
              item.completed
                ? "line-through text-gray-300"
                : ""
            }
          >
            {item.text}
          </span>

        </div>

        <button
          onClick={() =>
            deleteTask(index)
          }
          className="
          bg-red-500
          px-3
          py-1
          rounded-lg
          "
        >
          Delete
        </button>

      </div>

    ))}

  </div>

</div>
}