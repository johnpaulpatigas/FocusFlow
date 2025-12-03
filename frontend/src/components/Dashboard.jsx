// src/components/Dashboard.jsx
/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";

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

const ChartBar = ({ day, hours, dailyGoalHours }) => {
  const percentage = dailyGoalHours > 0 ? (hours / dailyGoalHours) * 100 : 0;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-slate-400">
        {hours.toFixed(1)} / {dailyGoalHours.toFixed(1)}h
      </div>
      <div className="flex h-40 w-full items-end overflow-hidden rounded-md bg-slate-700">
        <motion.div
          className="w-full bg-cyan-500"
          initial={{ height: 0 }}
          animate={{ height: `${Math.min(percentage, 100)}%` }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </div>
      <p className="font-medium text-slate-300">{day}</p>
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await apiClient.get("/dashboard-stats");
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="flex-1 p-10 text-center text-white">
        {isLoading ? "Loading dashboard..." : "Could not load dashboard data."}
      </div>
    );
  }

  const dailyGoalHours = (stats.dailyGoalMinutes || 0) / 60;

  return (
    <main className="flex-1 overflow-y-auto p-6 text-white md:p-10">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      <motion.div
        className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StatCard title="Tasks Due Today" value={stats.tasksDueToday} />
        <StatCard
          title="Current Streak"
          value={stats.currentStreak}
          unit="Days"
        />
        <div className="flex flex-col justify-between rounded-lg bg-slate-800 p-6">
          <p className="font-semibold text-slate-200">Focus Sessions</p>
          <button
            onClick={() => navigate("/focus")}
            className="mt-4 self-start rounded-lg bg-cyan-500 px-4 py-2 font-bold text-white transition-colors hover:bg-cyan-600"
          >
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
          {stats.upcomingTasks.length > 0 ? (
            stats.upcomingTasks.map((task, index) => (
              <TaskItem
                key={task.name + index}
                title={task.name}
                date={task.deadline}
              />
            ))
          ) : (
            <p className="p-4 text-center text-slate-400">No upcoming tasks!</p>
          )}
        </div>
        <button
          onClick={() => navigate("/tasks")}
          className="mt-6 w-full rounded-lg bg-slate-700 px-6 py-3 font-bold text-slate-300 transition-colors hover:bg-slate-600"
        >
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
          {stats.weeklyFocusHours.map((d) => (
            <ChartBar
              key={d.day_of_week}
              day={d.day_of_week}
              hours={d.total_minutes / 60}
              dailyGoalHours={dailyGoalHours}
            />
          ))}
        </div>
      </motion.div>
    </main>
  );
};

export default Dashboard;
