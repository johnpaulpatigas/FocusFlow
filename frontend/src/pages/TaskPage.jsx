// src/pages/TaskPage.jsx
/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../api/axios";
import MobileHeader from "../components/MobileHeader";
import PageWrapper from "../components/PageWrapper";
import Sidebar from "../components/Sidebar";
import TaskManagement from "../components/TaskManagement";
import TaskPageSkeleton from "../components/skeletons/TaskPageSkeleton";

const sidebarVariants = {
  open: { x: 0 },
  closed: { x: "-100%" },
};
const overlayVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const TaskPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isInitialLoad = useRef(true);
  const location = useLocation();

  useEffect(() => {
    if (isInitialLoad.current) {
      setIsLoading(true);
    }

    const fetchTasks = async () => {
      try {
        const response = await apiClient.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setIsLoading(false);
        isInitialLoad.current = false;
      }
    };

    fetchTasks();
  }, [location]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <PageWrapper>
      <div className="flex min-h-screen flex-col bg-slate-900 md:flex-row">
        <div className="hidden md:block">
          <Sidebar currentPath={location.pathname} />
        </div>

        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                variants={overlayVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={toggleSidebar}
                className="fixed inset-0 z-30 bg-black/50 md:hidden"
              />
              <motion.div
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 z-40 h-full md:hidden"
              >
                <Sidebar currentPath={location.pathname} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex flex-1 flex-col">
          <MobileHeader onMenuClick={toggleSidebar} />
          {isLoading && isInitialLoad.current ? (
            <TaskPageSkeleton />
          ) : (
            <TaskManagement
              key={location.key}
              initialTasks={tasks}
              onTasksChange={setTasks}
            />
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default TaskPage;
