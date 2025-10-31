/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import Avatar from "../assets/avatar.svg";
import BellIcon from "../assets/icons/bell.svg?react";
import CameraIcon from "../assets/icons/camera.svg?react";
import EditIcon from "../assets/icons/edit.svg?react";
import GlobeIcon from "../assets/icons/globe.svg?react";
import ListIcon from "../assets/icons/list.svg?react";
import LockIcon from "../assets/icons/lock.svg?react";
import LogoutIcon from "../assets/icons/log-out.svg?react";
import SettingsIcon from "../assets/icons/settings.svg?react";

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg bg-slate-800 p-6 text-slate-200 ${className}`}>
    {children}
  </div>
);

const StatItem = ({ value, label }) => (
  <div className="flex flex-col">
    <span className="text-3xl font-bold text-white">{value}</span>
    <span className="text-sm text-slate-400">{label}</span>
  </div>
);

const SettingsItem = ({ icon, label, children }) => {
  const Icon = icon;

  return (
    <div className="flex items-center justify-between text-slate-300">
      <div className="flex items-center gap-4">
        {Icon && <Icon className="h-5 w-5 text-slate-400" />}
        <span className="font-medium">{label}</span>
      </div>
      <div>{children}</div>
    </div>
  );
};

const UserProfile = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <main className="flex-1 bg-slate-900 p-6 md:p-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-3xl font-bold text-slate-100"
      >
        Profile
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2"
      >
        <motion.div variants={itemVariants} className="lg:row-span-2">
          <Card>
            <h2 className="mb-6 text-lg font-bold">Personal Information</h2>
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <div className="relative shrink-0">
                <img
                  src={Avatar}
                  alt="Profile Avatar"
                  className="h-24 w-24 rounded-full object-cover"
                />
                <button className="absolute right-0 bottom-0 rounded-full bg-cyan-500 p-1.5 text-white hover:bg-cyan-600">
                  <CameraIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <h3 className="text-2xl font-bold text-white">John Doe</h3>
                  <button className="text-slate-400 hover:text-white">
                    <EditIcon className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-slate-400">johndoe@gmail.com</p>
              </div>
            </div>
            <form className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Study Year
                </label>
                <select className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-slate-200">
                  <option>Third Year</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Major
                </label>
                <input
                  type="text"
                  defaultValue="Information Technology"
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-slate-200"
                  readOnly
                />
              </div>
            </form>
            <button className="mt-8 w-full rounded-lg bg-cyan-500 px-6 py-3 font-bold text-white transition-colors hover:bg-cyan-600 md:w-auto">
              Save Changes
            </button>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <h2 className="mb-6 text-lg font-bold">Profile Statistics</h2>
            <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
              <StatItem value="42" label="Total Tasks" />
              <StatItem value="36" label="Completed" />
              <StatItem value="87%" label="Success Rate" />
              <StatItem value="125" label="Focus Hours" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <div className="mb-6 flex items-center gap-3">
              <SettingsIcon className="h-6 w-6 text-slate-400" />
              <h2 className="text-lg font-bold">Settings</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Daily Focus Goal (hours)
                </label>
                <input
                  type="number"
                  defaultValue="4"
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-slate-200"
                  readOnly
                />
              </div>
              <SettingsItem icon={BellIcon} label="Receive Email Notifications">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-cyan-600 focus:ring-cyan-500 focus:ring-offset-slate-800"
                />
              </SettingsItem>
              <SettingsItem icon={GlobeIcon} label="Language" />
              <SettingsItem icon={ListIcon} label="Activity log" />
              <SettingsItem icon={LockIcon} label="Change Password" />
              <SettingsItem icon={LogoutIcon} label="Log out" />
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default UserProfile;
