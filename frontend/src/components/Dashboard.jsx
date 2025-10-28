/* eslint-disable no-unused-vars */
import { motion } from "motion/react";

const StatCard = ({ title, value, unit }) => (
  <div className="rounded-lg bg-slate-800 p-6">
    <p className="text-sm font-medium text-slate-400">{title}</p>
    <p className="mt-2 text-4xl font-bold text-slate-100">
      {value}{" "}
      <span className="text-2xl font-medium text-slate-300">{unit}</span>
    </p>
  </div>
);

const TaskItem = ({ title, date }) => (
  <div className="flex items-center justify-between rounded-lg bg-slate-700/50 p-4">
    <div className="flex items-center">
      <div className="mr-4 h-5 w-5 rounded-sm border-2 border-slate-500"></div>
      <p className="text-slate-200">{title}</p>
    </div>
    <p className="text-sm text-slate-400">{date}</p>
  </div>
);

const ChartBar = ({ day, hours, maxHours, percentage }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="text-xs text-slate-400">
      {hours.toFixed(1)} / {maxHours}h
    </div>
    <div className="flex h-40 w-full items-end overflow-hidden rounded-md bg-slate-700">
      <div
        className="w-full bg-cyan-500"
        style={{ height: `${percentage}%` }}
      ></div>
    </div>
    <p className="font-medium text-slate-300">{day}</p>
  </div>
);

const Dashboard = () => {
  const weeklyData = [
    { day: "Mon", hours: 12.5, maxHours: 24 },
    { day: "Tue", hours: 5.2, maxHours: 24 },
    { day: "Wed", hours: 10, maxHours: 24 },
    { day: "Thu", hours: 3, maxHours: 24 },
    { day: "Fri", hours: 8, maxHours: 24 },
    { day: "Sat", hours: 8.24, maxHours: 24 },
    { day: "Sun", hours: 9, maxHours: 24 },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6 text-white md:p-10">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      <motion.div
        className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StatCard title="Tasks Due Today" value="0" />
        <StatCard title="Current Streak" value="5" unit="Days" />
        <div className="flex flex-col justify-between rounded-lg bg-slate-800 p-6">
          <p className="font-semibold text-slate-200">Focus Sessions</p>
          <button className="mt-4 self-start rounded-lg bg-cyan-500 px-4 py-2 font-bold text-white transition-colors hover:bg-cyan-600">
            Start Focus Session
          </button>
        </div>
      </motion.div>

      <motion.div
        className="mb-8 rounded-lg bg-slate-800 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
          <p className="text-sm text-slate-400">Dates</p>
        </div>
        <div className="space-y-3">
          <TaskItem title="Complete math homework" date="2025-11-15" />
          <TaskItem title="Research history project" date="2025-10-20" />
        </div>
        <button className="mt-6 w-full rounded-lg bg-slate-700 px-6 py-3 font-bold text-slate-300 transition-colors hover:bg-slate-600">
          View All Tasks
        </button>
      </motion.div>

      <motion.div
        className="rounded-lg bg-slate-800 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="mb-6 text-xl font-semibold">Weekly Focus Hours</h2>
        <div className="grid grid-cols-7 gap-4">
          {weeklyData.map((d) => (
            <ChartBar
              key={d.day}
              day={d.day}
              hours={d.hours}
              maxHours={d.maxHours}
              percentage={(d.hours / d.maxHours) * 100}
            />
          ))}
        </div>
      </motion.div>
    </main>
  );
};

export default Dashboard;
