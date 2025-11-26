// src/components/AddTaskModal.jsx
/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import apiClient from "../api/axios";
import InputField from "./InputField";

const AddTaskModal = ({
  isOpen,
  onClose,
  onTaskAdded,
  onTaskUpdated,
  taskToEdit,
}) => {
  const isEditMode = Boolean(taskToEdit);
  const [formData, setFormData] = useState({
    name: "",
    deadline: "",
    priority: "Medium",
    category: "Study",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        name: taskToEdit.name || "",
        deadline: taskToEdit.deadline || "",
        priority: taskToEdit.priority || "Medium",
        category: taskToEdit.category || "Study",
      });
    } else {
      setFormData({
        name: "",
        deadline: "",
        priority: "Medium",
        category: "Study",
      });
    }
  }, [taskToEdit, isOpen, isEditMode]);

  const handleChange = (e) => {
    if (error) setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      setError("Task name is required.");
      return;
    }
    try {
      if (isEditMode) {
        const response = await apiClient.put(
          `/tasks/${taskToEdit.id}`,
          formData,
        );
        onTaskUpdated(response.data);
      } else {
        const response = await apiClient.post("/tasks", formData);
        onTaskAdded(response.data);
      }
      onClose();
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        `Failed to ${isEditMode ? "update" : "add"} task.`;
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
        >
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-lg bg-slate-800 p-8"
          >
            <h2 className="mb-6 text-2xl font-bold text-white">
              {isEditMode ? "Edit Task" : "Add New Task"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                type="text"
                placeholder="Task Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Deadline
                </label>
                <InputField
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-slate-200"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-slate-200"
                >
                  <option>Study</option>
                  <option>Work</option>
                  <option>Personal</option>
                </select>
              </div>

              {error && (
                <p className="text-center text-sm text-red-400">{error}</p>
              )}

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg px-6 py-2 text-slate-300 transition-colors hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-cyan-500 px-6 py-2 font-bold text-white transition-colors hover:bg-cyan-600"
                >
                  {isEditMode ? "Save Changes" : "Add Task"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTaskModal;
