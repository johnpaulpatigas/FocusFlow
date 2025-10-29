import { App as CapacitorApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { EdgeToEdge } from "@capawesome/capacitor-android-edge-to-edge-support";
import { AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import FocusPage from "./pages/FocusPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
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

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/focus" element={<FocusPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
