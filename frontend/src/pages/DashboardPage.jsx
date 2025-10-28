/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Dashboard from "../components/Dashboard";
import MobileHeader from "../components/MobileHeader";
import PageWrapper from "../components/PageWrapper";
import Sidebar from "../components/Sidebar";

const sidebarVariants = {
  open: { x: 0 },
  closed: { x: "-100%" },
};

const overlayVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <PageWrapper>
      <div className="flex min-h-screen flex-col bg-slate-900 md:flex-row">
        <div className="hidden md:block">
          <Sidebar />
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
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex flex-1 flex-col">
          <MobileHeader onMenuClick={toggleSidebar} />
          <Dashboard />
        </div>
      </div>
    </PageWrapper>
  );
};

export default DashboardPage;
