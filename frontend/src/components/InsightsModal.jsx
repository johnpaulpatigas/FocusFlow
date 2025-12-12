// src/components/InsightsModal.jsx
/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "motion/react";
import ReactMarkdown from "react-markdown";

const InsightsModal = ({ isOpen, onClose, insights, isLoading }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[80vh] w-full max-w-2xl flex-col rounded-lg bg-slate-800 p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white">
                Your AI Insights
              </h2>
            </div>
            <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-white grow overflow-y-auto pr-2 text-white">
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-6 w-1/3 rounded bg-slate-700"></div>
                  <div className="h-4 w-full rounded bg-slate-700"></div>
                  <div className="h-4 w-5/6 rounded bg-slate-700"></div>
                  <div className="mt-4 h-4 w-1/2 rounded bg-slate-700"></div>
                </div>
              ) : (
                <ReactMarkdown>{insights}</ReactMarkdown>
              )}
            </div>
            <button
              onClick={onClose}
              className="mt-6 self-start rounded-lg bg-slate-700 px-5 py-2 font-bold text-slate-300 transition-colors hover:bg-slate-600"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InsightsModal;
