// src/App.jsx
import { App as CapacitorApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { EdgeToEdge } from "@capawesome/capacitor-android-edge-to-edge-support";
import { SocialLogin } from "@capgo/capacitor-social-login";
import { AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import RouteGuard from "./components/RouteGuard";
import DashboardPage from "./pages/DashboardPage";
import FocusPage from "./pages/FocusPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProgressPage from "./pages/ProgressPage";
import SignupPage from "./pages/SignupPage";
import TaskPage from "./pages/TaskPage";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      EdgeToEdge.setBackgroundColor({ color: "#0f172b" });
      StatusBar.setBackgroundColor({ color: "#0f172b" });
      StatusBar.setStyle({ style: Style.Dark });

      const backButtonListener = CapacitorApp.addListener(
        "backButton",
        ({ canGoBack }) => {
          if (canGoBack) {
            window.history.back();
          } else {
            CapacitorApp.exitApp();
          }
        },
      );

      return () => {
        backButtonListener.remove();
      };
    }
  }, []);

  useEffect(() => {
    const initializeSocialLogin = async () => {
      if (Capacitor.isNativePlatform()) {
        try {
          await SocialLogin.initialize({
            google: {
              webClientId: import.meta.env.VITE_GOOGLE_WEB_CLIENT_ID,
            },
          });
        } catch (error) {
          console.error("Failed to initialize social login", error);
        }
      }
    };

    initializeSocialLogin();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <RouteGuard redirectIfAuth>
              <LandingPage />
            </RouteGuard>
          }
        />
        <Route
          path="/login"
          element={
            <RouteGuard redirectIfAuth>
              <LoginPage />
            </RouteGuard>
          }
        />
        <Route
          path="/signup"
          element={
            <RouteGuard redirectIfAuth>
              <SignupPage />
            </RouteGuard>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RouteGuard requireAuth>
              <DashboardPage />
            </RouteGuard>
          }
        />
        <Route
          path="/tasks"
          element={
            <RouteGuard requireAuth>
              <TaskPage />
            </RouteGuard>
          }
        />
        <Route
          path="/focus"
          element={
            <RouteGuard requireAuth>
              <FocusPage />
            </RouteGuard>
          }
        />
        <Route
          path="/progress"
          element={
            <RouteGuard requireAuth>
              <ProgressPage />
            </RouteGuard>
          }
        />
        <Route
          path="/profile"
          element={
            <RouteGuard requireAuth>
              <ProfilePage />
            </RouteGuard>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
