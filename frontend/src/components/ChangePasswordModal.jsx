// src/components/ChangePasswordModal.jsx
/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import apiClient from "../api/axios";
import InputField from "./InputField";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await apiClient.put("/auth/password", {
        newPassword: formData.newPassword,
      });
      onClose();
      setFormData({ newPassword: "", confirmPassword: "" });
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to update password.";
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
              Change Password
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <InputField
                type="password"
                placeholder="Confirm New Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
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
                  Update Password
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChangePasswordModal;
