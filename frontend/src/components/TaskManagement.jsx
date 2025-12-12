// src/components/TaskManagement.jsx
/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import CheckIcon from "../assets/icons/check.svg?react";
import ClockIcon from "../assets/icons/clock.svg?react";
import FocusIcon from "../assets/icons/focus.svg?react";
import AddTaskModal from "./AddTaskModal";
import ConfirmCompleteModal from "./ConfirmCompleteModal";
import InsightsModal from "./InsightsModal";
import TaskActionsDropdown from "./TaskActionsDropdown";

const PriorityBadge = ({ priority }) => {
  const styles = {
    High: "bg-red-500/80 text-red-100",
    Medium: "bg-orange-400/80 text-orange-100",
    Low: "bg-blue-500/80 text-blue-100",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${styles[priority] || styles["Medium"]}`}
    >
      {priority}
    </span>
  );
};

const TaskRow = ({ task, onConfirmCompletion, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const isCompleted = task.status === "Completed";

  const formatMinutes = (minutes) => {
    if (!minutes) return `0 min`;
    if (minutes < 60) return `${minutes} min`;
    const hours = (minutes / 60).toFixed(1);
    return `${hours}h`;
  };

  const handleStartFocus = () => {
    navigate("/focus", { state: { taskId: task.id, taskName: task.name } });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50, height: 0, padding: 0, margin: 0, border: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.div
        animate={{ opacity: isCompleted ? 0.5 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-12 items-center gap-4 border-b border-slate-700 p-4 last:border-b-0"
      >
        <div className="col-span-12 flex items-center gap-4 md:col-span-4">
          {!isCompleted ? (
            <button
              onClick={() => onConfirmCompletion(task)}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-slate-500 transition-colors hover:border-cyan-400"
              title="Complete task"
            />
          ) : (
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500">
              <CheckIcon className="h-3 w-3 text-white" />
            </div>
          )}
          <span
            className={`truncate text-slate-200 ${isCompleted ? "line-through" : ""}`}
          >
            {task.name}
          </span>
        </div>
        <div className="col-span-6 flex items-center gap-2 text-slate-400 md:col-span-2">
          <ClockIcon className="h-4 w-4 shrink-0 text-slate-500" />
          <span>{formatMinutes(task.total_focus_minutes)}</span>
        </div>
        <div className="col-span-6 md:col-span-2">
          <PriorityBadge priority={task.priority} />
        </div>
        <div className="col-span-6 text-slate-400 md:col-span-1">
          {task.category}
        </div>
        <div className="col-span-5 text-slate-400 md:col-span-1">
          {task.status}
        </div>
        <div className="col-span-1 flex items-center justify-end gap-2 text-right">
          {!isCompleted && (
            <button
              onClick={handleStartFocus}
              className="p-1 text-slate-400 transition-colors hover:text-cyan-400"
              title="Start focus session"
            >
              <FocusIcon className="h-5 w-5" />
            </button>
          )}
          <TaskActionsDropdown
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const FilterTabs = ({ currentFilter, onFilterChange }) => {
  const filters = ["All", "Pending", "Completed"];
  return (
    <div className="mb-6 flex space-x-2 border-b border-slate-700 sm:space-x-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-3 py-2 text-sm font-semibold transition-colors sm:px-4 sm:text-base ${
            currentFilter === filter
              ? "border-b-2 border-cyan-500 text-cyan-500"
              : "border-b-2 border-transparent text-slate-400 hover:text-white"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

const TaskManagement = ({ initialTasks, onTasksChange }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [taskToComplete, setTaskToComplete] = useState(null);
  const [isInsightsModalOpen, setIsInsightsModalOpen] = useState(false);
  const [insights, setInsights] = useState("");
  const [isInsightsLoading, setIsInsightsLoading] = useState(false);

  useEffect(() => {
    onTasksChange(tasks);
  }, [tasks, onTasksChange]);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(tasks.map((task) => task.category).filter(Boolean)),
    ],
    [tasks],
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch =
        statusFilter === "All" || task.status === statusFilter;
      const categoryMatch =
        categoryFilter === "All" || task.category === categoryFilter;
      return statusMatch && categoryMatch;
    });
  }, [tasks, statusFilter, categoryFilter]);

  const handleTaskCompleted = (taskId, minutesToAdd) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "Completed",
              total_focus_minutes:
                (task.total_focus_minutes || 0) + minutesToAdd,
            }
          : task,
      ),
    );
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  };
  const handleTaskAdded = (newTask) => {
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId),
      );
      try {
        await apiClient.delete(`/tasks/${taskId}`);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const openAddTaskModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };
  const openEditTaskModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };
  const openConfirmModal = (task) => setTaskToComplete(task);
  const closeConfirmModal = () => setTaskToComplete(null);

  const handleGetInsights = async () => {
    setIsInsightsModalOpen(true);
    setIsInsightsLoading(true);
    try {
      const { data } = await apiClient.post("/get-insights", {
        tasks: tasks.filter((t) => t.status === "Pending"),
      });
      setInsights(data.insights);
    } catch (error) {
      setInsights(
        "Sorry, I couldn't generate insights right now. Please try again later.",
      );
    } finally {
      setIsInsightsLoading(false);
    }
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-6 text-white md:p-10">
        <div className="mb-8 flex flex-col items-start justify-between sm:flex-row">
          <h1 className="mb-4 text-3xl font-bold text-slate-100 sm:mb-0">
            Task Management
          </h1>
          <div className="flex gap-4">
            <button
              onClick={openAddTaskModal}
              className="rounded-lg bg-cyan-500 px-5 py-2 font-bold text-white transition-colors hover:bg-cyan-600"
            >
              Add Task
            </button>

            <button
              onClick={handleGetInsights}
              className="flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 font-bold text-cyan-400 transition-colors hover:bg-slate-600"
            >
              Get Insights
            </button>
          </div>
        </div>

        <motion.div
          layout
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="rounded-lg bg-slate-800 p-4 sm:p-6"
        >
          <div className="mb-2 flex flex-col items-center justify-between gap-4 md:flex-row">
            <h2 className="self-start text-xl font-semibold text-slate-200 md:self-center">
              My Tasks
            </h2>
            <div className="flex w-full items-center gap-4 md:w-auto">
              <label
                htmlFor="category-filter"
                className="shrink-0 font-medium text-slate-400"
              >
                Category:
              </label>
              <select
                id="category-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 p-2 text-slate-200"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <FilterTabs
            currentFilter={statusFilter}
            onFilterChange={setStatusFilter}
          />

          <div>
            <div className="hidden grid-cols-12 gap-4 border-b-2 border-slate-700 p-4 font-semibold text-slate-400 md:grid">
              <div className="col-span-4">Task Name</div>
              <div className="col-span-2">Focus Time</div>
              <div className="col-span-2">Priority</div>
              <div className="col-span-1">Category</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2"></div>
            </div>

            <div>
              <AnimatePresence>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      onConfirmCompletion={openConfirmModal}
                      onEdit={openEditTaskModal}
                      onDelete={handleDeleteTask}
                    />
                  ))
                ) : (
                  <motion.p
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 text-center text-slate-400"
                  >
                    No tasks match the current filters.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </main>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onTaskAdded={handleTaskAdded}
        onTaskUpdated={handleTaskUpdated}
        taskToEdit={taskToEdit}
      />
      <ConfirmCompleteModal
        isOpen={!!taskToComplete}
        onClose={closeConfirmModal}
        task={taskToComplete}
        onTaskCompleted={handleTaskCompleted}
      />
      <InsightsModal
        isOpen={isInsightsModalOpen}
        onClose={() => setIsInsightsModalOpen(false)}
        insights={insights}
        isLoading={isInsightsLoading}
      />
    </>
  );
};

export default TaskManagement;
