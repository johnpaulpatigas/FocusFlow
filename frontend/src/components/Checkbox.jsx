// src/components/Checkbox.jsx
/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "motion/react";
import CheckIcon from "../assets/icons/check.svg?react";

const Checkbox = ({ checked, onChange }) => {
  return (
    <label className="relative flex h-5 w-5 cursor-pointer items-center justify-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute h-full w-full cursor-pointer opacity-0"
      />

      <div
        className={`h-full w-full rounded-sm border-2 transition-colors ${
          checked
            ? "border-cyan-500 bg-cyan-500"
            : "border-slate-500 bg-slate-700"
        }`}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <CheckIcon className="h-3.5 w-3.5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </label>
  );
};

export default Checkbox;
