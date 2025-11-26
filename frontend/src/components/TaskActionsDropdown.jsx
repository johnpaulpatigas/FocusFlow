// src/components/TaskActionsDropdown.jsx
/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import EditIcon from "../assets/icons/edit.svg?react";
import MoreIcon from "../assets/icons/more-horizontal.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";

const TaskActionsDropdown = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-slate-400 hover:text-white"
      >
        <MoreIcon className="h-5 w-5" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-slate-600 bg-slate-700 shadow-lg"
          >
            <ul>
              <li>
                <button
                  onClick={() => {
                    onEdit();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-600"
                >
                  <EditIcon className="h-4 w-4" /> Edit
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onDelete();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-red-400 hover:bg-slate-600"
                >
                  <TrashIcon className="h-4 w-4" /> Delete
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskActionsDropdown;
