/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import StreakIcon from "../assets/badges/3-day-streak.svg?react";
import FocusStarterIcon from "../assets/badges/focus-starter.svg?react";
import MarathonIcon from "../assets/badges/marathon-runner.svg?react";
import TaskMasterIcon from "../assets/badges/task-master.svg?react";

const Card = ({ title, children, className = "" }) => (
  <div className={`rounded-lg bg-slate-800 p-6 ${className}`}>
    <h2 className="mb-4 text-lg font-bold text-slate-200">{title}</h2>
    {children}
  </div>
);

const BarChart = () => {
  const weeklyData = [
    { day: "Day 1", h: 60 },
    { day: "Day 2", h: 55 },
    { day: "Day 3", h: 80 },
    { day: "Day 4", h: 70 },
    { day: "Day 5", h: 65 },
    { day: "Day 6", h: 75 },
    { day: "Day 7", h: 50 },
  ];
  return (
    <div className="flex h-64 justify-around gap-2 text-center text-xs text-slate-400">
      {weeklyData.map((dayData, i) => (
        <div
          key={dayData.day}
          className="flex flex-1 flex-col items-center justify-end gap-2"
        >
          <motion.div
            className="w-2/3 rounded-t-sm bg-cyan-500"
            initial={{ height: 0 }}
            animate={{ height: `${dayData.h}%` }}
            transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
          />
          <span>{dayData.day}</span>
        </div>
      ))}
    </div>
  );
};

const LineChart = () => (
  <div className="flex h-64 text-xs text-slate-400">
    <div className="flex h-full flex-col items-end justify-between py-2 pr-2">
      <span>50</span>
      <span>40</span>
      <span>30</span>
      <span>20</span>
      <span>10</span>
      <span>0</span>
    </div>

    <div className="flex grow flex-col">
      <div className="relative grow">
        {[20, 40, 60, 80].map((y) => (
          <div
            key={y}
            className="absolute w-full border-t border-slate-700/50"
            style={{ bottom: `${y}%` }}
          />
        ))}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 300 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0 60 C 40 30, 60 90, 100 60 S 140 30, 160 60 S 200 90, 220 60 S 260 30, 280 60"
            stroke="#A5B4FC"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="flex justify-around pt-2">
        <span>Day 1</span>
        <span>Day 2</span>
        <span>Day 3</span>
        <span>Day 4</span>
      </div>
    </div>
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
            <BarChart />
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card title="Tasks Completed Over Time">
            <LineChart />
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card title="Study Streak">
            <div className="py-8 text-center">
              <p className="text-6xl font-bold text-white">4 days</p>
              <p className="mt-2 text-slate-400">
                you've studied 4 days in a row! Keep it up!
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
