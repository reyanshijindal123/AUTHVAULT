type Props = {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
};

export default function StatsCard({
  totalTasks,
  completedTasks,
  pendingTasks,
}: Props) {
  return (
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
  );
}