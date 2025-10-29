/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import CalendarIcon from "../assets/icons/calendar.svg?react";
import MoreIcon from "../assets/icons/more-horizontal.svg?react";

const tasks = [
  {
    name: "Complete math homework",
    deadline: "2025-11-15",
    priority: "High",
    category: "Study",
    status: "Pending",
  },
  {
    name: "Read chapter 5 of biology",
    deadline: "2025-11-18",
    priority: "Medium",
    category: "Study",
    status: "Pending",
  },
];

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

const TaskRow = ({ task }) => (
  <div className="grid grid-cols-12 items-center gap-4 border-b border-slate-700 p-4 last:border-b-0">
    <div className="col-span-12 truncate text-slate-200 md:col-span-4">
      {task.name}
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
    <div className="col-span-5 text-slate-400 md:col-span-1">{task.status}</div>
    <div className="col-span-1 text-right">
      <button className="text-slate-400 hover:text-white">
        <MoreIcon className="h-5 w-5" />
      </button>
    </div>
  </div>
);

const TaskManagement = () => {
  return (
    <main className="flex-1 overflow-y-auto p-6 text-white md:p-10">
      <div className="mb-8 flex flex-col items-start justify-between sm:flex-row">
        <h1 className="mb-4 text-3xl font-bold text-slate-100 sm:mb-0">
          Tasks
        </h1>
        <button className="rounded-lg bg-cyan-500 px-5 py-2 font-bold text-white transition-colors hover:bg-cyan-600 sm:hidden">
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
            <button className="hidden rounded-lg bg-cyan-500 px-5 py-2 font-bold text-white transition-colors hover:bg-cyan-600 sm:block">
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
            {tasks.map((task, index) => (
              <TaskRow key={index} task={task} />
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default TaskManagement;
