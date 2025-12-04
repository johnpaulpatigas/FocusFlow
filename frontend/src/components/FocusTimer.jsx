// src/components/FocusTimer.jsx
/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import BellOffIcon from "../assets/icons/bell-off.svg?react";
import BellIcon from "../assets/icons/bell.svg?react";

const DEFAULT_MINUTES = 25;
const DEFAULT_SECONDS = 0;

const TimeUnit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="font-mono text-6xl font-bold text-slate-100 md:text-8xl">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-sm font-medium tracking-widest text-slate-400 uppercase">
      {label}
    </span>
  </div>
);

const ControlButton = ({ children, variant = "secondary", onClick }) => {
  const styles = {
    primary: "bg-cyan-500 text-white hover:bg-cyan-600",
    secondary: "bg-slate-700 text-slate-300 hover:bg-slate-600",
  };
  return (
    <motion.button
      onClick={onClick}
      className={`rounded-lg px-8 py-3 font-bold transition-colors ${styles[variant]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

const FocusTimer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedTask, setSelectedTask] = useState(location.state || null);
  const [availableTasks, setAvailableTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);

  const [minutes, setMinutes] = useState(DEFAULT_MINUTES);
  const [seconds, setSeconds] = useState(DEFAULT_SECONDS);
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!selectedTask) {
      const fetchPendingTasks = async () => {
        try {
          const { data } = await apiClient.get("/tasks");
          const focusableTasks = data.filter(
            (task) =>
              task.status === "Pending" || task.status === "In Progress",
          );
          setAvailableTasks(focusableTasks);
        } catch (error) {
          console.error("Failed to fetch pending tasks:", error);
        } finally {
          setIsLoadingTasks(false);
        }
      };
      fetchPendingTasks();
    } else {
      setIsLoadingTasks(false);
    }
  }, [selectedTask]);

  const handleSessionEnd = useCallback(async () => {
    setIsActive(false);

    if (!isMuted) {
      alert("Session complete! Time for a break.");
    }

    try {
      await apiClient.post("/focus-sessions", {
        duration_minutes: DEFAULT_MINUTES,
        task_id: selectedTask?.taskId,
      });
      console.log("Focus session saved!");
    } catch (error) {
      console.error("Failed to save session:", error);
    }

    navigate("/tasks");
  }, [selectedTask, navigate, isMuted]);

  useEffect(() => {
    if (!isActive) return;

    if (minutes === 0 && seconds === 0) {
      handleSessionEnd();
      return;
    }

    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((s) => s - 1);
      } else {
        setMinutes((m) => m - 1);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, handleSessionEnd]);

  const handleTaskSelect = (taskId) => {
    if (taskId) {
      const task = availableTasks.find((t) => t.id === taskId);
      if (task) {
        setSelectedTask({ taskId: task.id, taskName: task.name });
      }
    } else {
      setSelectedTask(null);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(DEFAULT_MINUTES);
    setSeconds(DEFAULT_SECONDS);
  };

  if (!selectedTask) {
    return (
      <main className="flex-1 p-6 md:p-10">
        <h1 className="mb-8 text-3xl font-bold text-slate-100">Focus</h1>
        <div className="mx-auto w-full max-w-lg rounded-lg bg-slate-800 p-8">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Select a task to focus on
          </h2>
          {isLoadingTasks ? (
            <p className="text-slate-400">Loading tasks...</p>
          ) : availableTasks.length > 0 ? (
            <select
              onChange={(e) => handleTaskSelect(e.target.value)}
              defaultValue=""
              className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-slate-200"
            >
              <option value="">-- Please choose a task --</option>
              {availableTasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.name}
                </option>
              ))}
            </select>
          ) : (
            <div>
              <p className="mb-4 text-slate-400">You have no pending tasks.</p>
              <button
                onClick={() => navigate("/tasks")}
                className="rounded-lg bg-cyan-500 px-6 py-2 font-bold text-white transition-colors hover:bg-cyan-600"
              >
                Create a Task
              </button>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 md:p-10">
      <h1 className="mb-8 text-3xl font-bold text-slate-100">Focus</h1>

      <div className="flex flex-col items-center justify-center text-center">
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {selectedTask && (
            <div className="mb-4 text-center">
              <p className="text-slate-400">Focusing on:</p>
              <p className="text-xl font-bold text-cyan-400">
                {selectedTask.taskName}
              </p>
            </div>
          )}

          <div className="relative mb-8 rounded-xl bg-slate-800 p-8">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute top-4 left-4 text-slate-400 transition-colors hover:text-white"
              aria-label={
                isMuted ? "Unmute notifications" : "Mute notifications"
              }
            >
              {isMuted ? (
                <BellOffIcon className="h-6 w-6" />
              ) : (
                <BellIcon className="h-6 w-6" />
              )}
            </button>
            <div className="flex items-center justify-center gap-4 md:gap-8">
              <TimeUnit value={0} label="Hours" />
              <span className="pb-8 font-mono text-5xl text-slate-600 md:text-7xl">
                :
              </span>
              <TimeUnit value={minutes} label="Minutes" />
              <span className="pb-8 font-mono text-5xl text-slate-600 md:text-7xl">
                :
              </span>
              <TimeUnit value={seconds} label="Seconds" />
            </div>
          </div>

          <div className="mb-10 space-y-2">
            <p className="text-lg text-slate-400">Work Session 1 of 4</p>
            <p className="text-xl text-slate-200 italic">
              "Don't stop when you're tired. Stop when you're done."
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <ControlButton onClick={toggleTimer}>
              {isActive ? "Pause" : "Start"}
            </ControlButton>
            <ControlButton onClick={resetTimer}>Reset</ControlButton>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default FocusTimer;
