// src/components/UserProfile.jsx
/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import apiClient from "../api/axios";
import Avatar from "../assets/avatar.svg";
import CameraIcon from "../assets/icons/camera.svg?react";
import EditIcon from "../assets/icons/edit.svg?react";
import LockIcon from "../assets/icons/lock.svg?react";
import LogoutIcon from "../assets/icons/log-out.svg?react";
import SettingsIcon from "../assets/icons/settings.svg?react";
import { useAuth } from "../context/AuthContext";
import ChangePasswordModal from "./ChangePasswordModal";
import EditProfileModal from "./EditProfileModal";
import ProfilePageSkeleton from "../components/skeletons/ProfilePageSkeleton";

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

const SettingsItem = ({
  icon,
  label,
  children,
  onClick,
  disabled = false,
  isDestructive = false,
}) => {
  const Icon = icon;
  const Wrapper = onClick && !disabled ? "button" : "div";

  return (
    <Wrapper
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-between rounded-md p-3 text-left transition-colors ${
        disabled
          ? "cursor-not-allowed"
          : isDestructive
            ? "text-red-400 hover:bg-red-500/10"
            : "text-slate-300 hover:bg-slate-700/50"
      }`}
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <Icon
            className={`h-5 w-5 ${disabled ? "text-slate-600" : isDestructive ? "" : "text-slate-400"}`}
          />
        )}
        <span className={`font-medium ${disabled ? "text-slate-500" : ""}`}>
          {label}
        </span>
      </div>

      {disabled && (
        <span className="text-xs text-slate-500">
          Not available for Google Sign-In
        </span>
      )}

      {children && !disabled && <div>{children}</div>}
    </Wrapper>
  );
};

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { logout, session } = useAuth();
  const isPasswordUser = session?.user?.app_metadata?.provider === "email";

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

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [profileResponse, statsResponse] = await Promise.all([
          apiClient.get("/profile"),
          apiClient.get("/profile-stats"),
        ]);
        setProfile(profileResponse.data);
        setStats(statsResponse.data);
      } catch (error) {
        console.error("Failed to fetch profile page data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  if (isLoading || !profile) {
    return <ProfilePageSkeleton />;
  }

  return (
    <>
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
              <div className="mb-6 flex flex-col items-start justify-between sm:flex-row">
                <h2 className="mb-4 text-lg font-bold sm:mb-0">
                  Personal Information
                </h2>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  <EditIcon className="h-4 w-4" />
                  Edit Profile
                </button>
              </div>

              <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row">
                <div className="relative shrink-0">
                  <img
                    src={Avatar}
                    alt="Profile Avatar"
                    className="h-24 w-24 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute right-0 bottom-0 rounded-full bg-cyan-500 p-1.5 text-white hover:bg-cyan-600"
                  >
                    <CameraIcon className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-white">
                    {profile.first_name || "User"} {profile.last_name || ""}
                  </h3>
                  <p className="text-slate-400">{profile.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-400">
                    Study Year
                  </label>
                  <p className="font-semibold text-slate-100">
                    {profile.study_year || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-400">
                    Major
                  </label>
                  <p className="truncate font-semibold text-slate-100">
                    {profile.major || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-400">
                    Daily Focus Goal
                  </label>
                  <p className="font-semibold text-slate-100">
                    {profile.daily_goal_minutes / 60 || 0} hours
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <h2 className="mb-6 text-lg font-bold">Profile Statistics</h2>
              <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                <StatItem value={stats.totalTasks} label="Total Tasks" />
                <StatItem value={stats.completedTasks} label="Completed" />
                <StatItem
                  value={`${stats.successRate}%`}
                  label="Success Rate"
                />
                <StatItem value={stats.focusHours} label="Focus Hours" />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <div className="mb-4 flex items-center gap-3">
                <SettingsIcon className="h-6 w-6 text-slate-400" />
                <h2 className="text-lg font-bold text-slate-100">Settings</h2>
              </div>

              <div className="flex flex-col gap-1">
                <SettingsItem
                  icon={LockIcon}
                  label="Change Password"
                  onClick={
                    isPasswordUser ? () => setIsPasswordModalOpen(true) : null
                  }
                  disabled={!isPasswordUser}
                ></SettingsItem>

                <SettingsItem
                  icon={LogoutIcon}
                  label="Log out"
                  onClick={handleLogout}
                  isDestructive={true}
                />
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </main>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profileData={profile}
        onProfileUpdate={handleProfileUpdate}
      />
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
};

export default UserProfile;
