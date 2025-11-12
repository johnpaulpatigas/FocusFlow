/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import apiClient from "../api/axios";
import StreakIcon from "../assets/badges/3-day-streak.svg?react";
import FocusStarterIcon from "../assets/badges/focus-starter.svg?react";
import MarathonIcon from "../assets/badges/marathon-runner.svg?react";
import TaskMasterIcon from "../assets/badges/task-master.svg?react";

const CHART_Y_AXIS_MAX = 10;

const generatePathData = (data, width, height, maxValue) => {
  if (!data || data.length === 0) {
    return `M 0,${height}`;
  }

  const points = data.map((point, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (Math.min(point.value, maxValue) / maxValue) * height;
    return `${x},${y}`;
  });

  return `M ${points.join(" L ")}`;
};

const Card = ({ title, children, className = "" }) => (
  <div className={`rounded-lg bg-slate-800 p-6 ${className}`}>
    <h2 className="mb-4 text-lg font-bold text-slate-200">{title}</h2>
    {children}
  </div>
);

const AchievementBadge = ({ Icon, title }) => (
  <div className="flex flex-col items-center gap-2 text-center">
    <div className="flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
      <Icon className="h-full w-full" />
    </div>
    <p className="text-sm font-semibold text-slate-300">{title}</p>
  </div>
);

const ProgressTracker = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await apiClient.get("/progress-stats");
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch progress stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="p-10 text-center text-white">Loading progress...</div>
    );
  }

  const barChartData = stats.weeklyFocusHours.map((d) => ({
    day: d.day_of_week,
    value: d.total_minutes,
  }));

  const lineChartData = stats.tasksCompletedOverTime.map((d) => ({
    day: d.day_label,
    value: d.tasks_count,
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <main className="flex-1 p-6 md:p-10">
      <motion.h1
        className="mb-8 text-3xl font-bold text-slate-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Progress
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-8 lg:grid-cols-2"
      >
        <motion.div variants={itemVariants}>
          <Card title="Hours Focused This Week">
            <div className="flex h-64 justify-around gap-2 text-center text-xs text-slate-400">
              {barChartData.map((d) => (
                <div
                  key={d.day}
                  className="flex flex-1 flex-col items-center justify-end gap-2"
                >
                  <div className="text-sm text-white">
                    {Math.round(d.value / 60)}h
                  </div>
                  <motion.div
                    className="w-2/3 rounded-t-sm bg-cyan-500"
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.value / 300) * 100}%` }}
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                  <span>{d.day}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card title="Tasks Completed Over Time">
            <div className="flex h-64 text-xs text-slate-400">
              <div className="flex h-full flex-col justify-between pr-2 text-right">
                <span>{CHART_Y_AXIS_MAX}</span>
                <span>{CHART_Y_AXIS_MAX / 2}</span>
                <span>0</span>
              </div>

              <div className="flex grow flex-col border-l border-slate-700">
                <div className="relative grow">
                  {[25, 50, 75].map((y) => (
                    <div
                      key={y}
                      className="absolute w-full border-t border-slate-700/50"
                      style={{ bottom: `${y}%` }}
                    />
                  ))}

                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d={generatePathData(
                        lineChartData,
                        100,
                        100,
                        CHART_Y_AXIS_MAX,
                      )}
                      stroke="#A5B4FC"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                  </svg>
                </div>

                <div className="flex justify-around border-t border-slate-700 pt-2">
                  {lineChartData.map((d) => (
                    <span key={d.day}>{d.day}</span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card title="Study Streak">
            <div className="py-8 text-center">
              <p className="text-6xl font-bold text-white">
                {stats.studyStreak} days
              </p>
              <p className="mt-2 text-slate-400">
                {stats.studyStreak > 0
                  ? `You've studied ${stats.studyStreak} days in a row! Keep it up!`
                  : "Start a focus session to build your streak!"}
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card title="Achievement Badges">
            <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-4 sm:gap-8">
              <AchievementBadge Icon={FocusStarterIcon} title="Focus Starter" />
              <AchievementBadge Icon={StreakIcon} title="3-Day Streak" />
              <AchievementBadge Icon={TaskMasterIcon} title="Task Master" />
              <AchievementBadge Icon={MarathonIcon} title="Marathon Runner" />
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default ProgressTracker;
