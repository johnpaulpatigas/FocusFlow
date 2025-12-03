// src/components/ConfirmCompleteModal.jsx
/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";

const ConfirmCompleteModal = ({ isOpen, onClose, task, onTaskCompleted }) => {
  const navigate = useNavigate();
  if (!task) return null;

  const handleCompletion = async () => {
    try {
      const { data: updatedTask } = await apiClient.patch(
        `/tasks/${task.id}/status`,
        {
          status: "Completed",
        },
      );

      onTaskCompleted(updatedTask.id, 0);
      onClose();
    } catch (error) {
      console.error("Failed to complete task:", error);
      onClose();
    }
  };

  const handleStartFocus = () => {
    onClose();
    navigate("/focus", { state: { taskId: task.id, taskName: task.name } });
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
            className="w-full max-w-md rounded-lg bg-slate-800 p-8 text-center"
          >
            <h2 className="mb-2 text-2xl font-bold text-white">
              Complete Task
            </h2>
            <p className="mb-6 truncate text-lg text-cyan-400">{task.name}</p>

            <button
              onClick={handleCompletion}
              className="mb-4 w-full rounded-lg bg-cyan-500 px-6 py-3 font-bold text-white transition-colors hover:bg-cyan-600"
            >
              Mark as Completed
            </button>

            <p className="text-xs text-slate-400">
              Want to log focus time?
              <button
                onClick={handleStartFocus}
                className="ml-1 font-semibold text-cyan-400 hover:underline"
              >
                Start a focus session instead.
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmCompleteModal;
