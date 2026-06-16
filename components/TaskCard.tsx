type Props = {
  item: any;
  index: number;
  toggleTask: (index: number) => void;
  deleteTask: (index: number) => void;
};

export default function TaskCard({
  item,
  index,
  toggleTask,
  deleteTask,
}: Props) {
  return (
    <div className="flex justify-between items-center bg-white/10 p-4 rounded-xl">
      <div className="flex gap-3 items-center">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() =>
            toggleTask(index)
          }
        />

        <div>
          <p
            className={
              item.completed
                ? "line-through text-gray-300"
                : ""
            }
          >
            {item.text}
          </p>

          <p>📅 {item.dueDate}</p>

          <p>⏰ {item.dueTime}</p>

          <p>🔥 {item.priority}</p>
        </div>
      </div>

      <button
        onClick={() =>
          deleteTask(index)
        }
        className="bg-red-500 px-3 py-1 rounded-lg"
      >
        Delete
      </button>
    </div>
  );
}