// src/components/EditProfileModal.jsx
/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import apiClient from "../api/axios";
import InputField from "./InputField";

const EditProfileModal = ({
  isOpen,
  onClose,
  profileData,
  onProfileUpdate,
}) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    study_year: "",
    major: "",
    daily_goal_minutes: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (profileData) {
      setFormData({
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
        study_year: profileData.study_year || "",
        major: profileData.major || "",
        daily_goal_minutes: profileData.daily_goal_minutes || 0,
      });
    }
  }, [profileData, isOpen]);

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    if (name === "daily_goal_hours") {
      setFormData((prev) => ({
        ...prev,
        daily_goal_minutes: (parseFloat(value) || 0) * 60,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.first_name) {
      setError("First name is required.");
      return;
    }

    try {
      const response = await apiClient.put("/profile", {
        firstName: formData.first_name,
        lastName: formData.last_name,
        studyYear: formData.study_year,
        major: formData.major,
        dailyGoalMinutes: formData.daily_goal_minutes,
      });
      onProfileUpdate(response.data);
      onClose();
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to update profile.";
      setError(errorMessage);
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
            className="w-full max-w-md rounded-lg bg-slate-800 p-6"
          >
            <h2 className="mb-6 text-2xl font-bold text-white">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                <InputField
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Study Year
                </label>
                <select
                  name="study_year"
                  value={formData.study_year}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-slate-200"
                >
                  <option value="">Select Year</option>
                  <option>First Year</option>
                  <option>Second Year</option>
                  <option>Third Year</option>
                  <option>Fourth Year</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Major
                </label>
                <select
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-slate-200"
                >
                  <option value="">Select Major</option>
                  <option>Elementary Education</option>
                  <option>Hospitality Management</option>
                  <option>Information Technology</option>
                  <option>Secondary Education</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Daily Focus Goal (hours)
                </label>
                <input
                  type="number"
                  name="daily_goal_hours"
                  value={formData.daily_goal_minutes / 60 || 0}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-slate-200"
                />
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
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
