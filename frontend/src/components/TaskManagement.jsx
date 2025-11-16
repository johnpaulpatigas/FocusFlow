// src/components/TaskManagement.jsx
/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import CalendarIcon from "../assets/icons/calendar.svg?react";
import FocusIcon from "../assets/icons/focus.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import AddTaskModal from "./AddTaskModal";
import Checkbox from "./Checkbox";

const PriorityBadge = ({ priority }) => {
  const styles = {
    High: "bg-red-500/80 text-red-100",
    Medium: "bg-orange-400/80 text-orange-100",
    Low: "bg-blue-500/80 text-blue-100",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  );
};

const TaskRow = ({ task, onUpdateStatus, onDelete }) => {
  const navigate = useNavigate();
  const isCompleted = task.status === "Completed";

  const handleCheckboxChange = () => {
    const newStatus = isCompleted ? "Pending" : "Completed";
    onUpdateStatus(task.id, newStatus);
  };

  const handleStartFocus = () => {
    navigate("/focus", { state: { taskId: task.id, taskName: task.name } });
  };

  return (
    <div
      className={`grid grid-cols-12 items-center gap-4 border-b border-slate-700 p-4 last:border-b-0 ${isCompleted ? "opacity-50" : ""}`}
    >
      <div className="col-span-12 flex items-center gap-4 md:col-span-4">
        <Checkbox checked={isCompleted} onChange={handleCheckboxChange} />
        <span
          className={`truncate text-slate-200 ${isCompleted ? "line-through" : ""}`}
        >
          {task.name}
        </span>
      </div>
      <div className="col-span-6 text-slate-400 md:col-span-2">
        {task.deadline}
      </div>
      <div className="col-span-6 md:col-span-2">
        <PriorityBadge priority={task.priority} />
      </div>
      <div className="col-span-6 text-slate-400 md:col-span-2">
        {task.category}
      </div>
      <div className="col-span-5 text-slate-400 md:col-span-1">
        {task.status}
      </div>
      <div className="col-span-1 flex justify-end gap-2 text-right">
        <button
          onClick={handleStartFocus}
          className="p-1 text-slate-400 transition-colors hover:text-cyan-400"
          title="Start focus session for this task"
        >
          <FocusIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1 text-slate-400 transition-colors hover:text-red-500"
          title="Delete task"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiClient.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task,
        ),
      );
      await apiClient.put(`/tasks/${taskId}`, { status: newStatus });
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        setTasks((currentTasks) =>
          currentTasks.filter((task) => task.id !== taskId),
        );
        await apiClient.delete(`/tasks/${taskId}`);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-6 text-white md:p-10">
        <div className="mb-8 flex flex-col items-start justify-between sm:flex-row">
          <h1 className="mb-4 text-3xl font-bold text-slate-100 sm:mb-0">
            Tasks
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-cyan-500 px-5 py-2 font-bold text-white transition-colors hover:bg-cyan-600 sm:hidden"
          >
            Add Task
          </button>
        </div>

        <motion.div
          className="rounded-lg bg-slate-800 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
            <h2 className="self-start text-xl font-semibold text-slate-200 md:self-center">
              My Tasks
            </h2>
            <div className="flex w-full flex-col items-center gap-4 sm:flex-row md:w-auto">
              <select className="w-full rounded-lg border border-slate-600 bg-slate-700 p-2 text-slate-300 sm:w-auto">
                <option>All Categories</option>
                <option>Study</option>
                <option>Work</option>
                <option>Personal</option>
              </select>
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 p-2 pr-10 pl-4 text-slate-300"
                />
                <CalendarIcon className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="hidden rounded-lg bg-cyan-500 px-5 py-2 font-bold text-white transition-colors hover:bg-cyan-600 sm:block"
              >
                Add Task
              </button>
            </div>
          </div>

          <div>
            <div className="hidden grid-cols-12 gap-4 border-b-2 border-slate-700 p-4 font-semibold text-slate-400 md:grid">
              <div className="col-span-4">Task Name</div>
              <div className="col-span-2">Deadline</div>
              <div className="col-span-2">Priority</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1"></div>
            </div>

            <div>
              {isLoading ? (
                <p className="p-4 text-center">Loading tasks...</p>
              ) : tasks.length > 0 ? (
                tasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onUpdateStatus={handleUpdateStatus}
                    onDelete={handleDeleteTask}
                  />
                ))
              ) : (
                <p className="p-4 text-center">
                  No tasks yet. Add one to get started!
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </main>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskAdded={handleTaskAdded}
      />
    </>
  );
};

export default TaskManagement;
