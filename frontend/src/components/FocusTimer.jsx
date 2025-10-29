/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { useState } from "react";
import BellOffIcon from "../assets/icons/bell-off.svg?react";
import BellIcon from "../assets/icons/bell.svg?react";

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

const ControlButton = ({ children, variant = "secondary" }) => {
  const styles = {
    primary: "bg-cyan-500 text-white hover:bg-cyan-600",
    secondary: "bg-slate-700 text-slate-300 hover:bg-slate-600",
  };
  return (
    <motion.button
      className={`rounded-lg px-8 py-3 font-bold transition-colors ${styles[variant]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

const FocusTimer = () => {
  const [isMuted, setIsMuted] = useState(false);

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
              <TimeUnit value={25} label="Minutes" />
              <span className="pb-8 font-mono text-5xl text-slate-600 md:text-7xl">
                :
              </span>
              <TimeUnit value={0} label="Seconds" />
            </div>
          </div>

          <div className="mb-10 space-y-2">
            <p className="text-lg text-slate-400">Work Session 1 of 4</p>
            <p className="text-xl text-slate-200 italic">
              "Don't stop when you're tired. Stop when you're done."
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <ControlButton>Pause</ControlButton>
            <ControlButton variant="primary">Start</ControlButton>
            <ControlButton>Reset</ControlButton>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default FocusTimer;
