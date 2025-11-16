// src/pages/LandingPage.jsx
/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import illustration from "../assets/illustration.png";
import trackerIcon from "../assets/progress-tracker-icon.svg";
import taskIcon from "../assets/task-manager-icon.svg";
import timerIcon from "../assets/timer-icon.svg";
import FeatureCard from "../components/FeatureCard";
import Header from "../components/Header";
import PageWrapper from "../components/PageWrapper";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const LandingPage = () => {
  const features = [
    {
      title: "Task Manager",
      description: "Organize & prioritize your tasks easily.",
      bgColor: "bg-green-300/80",
      iconSrc: taskIcon,
    },
    {
      title: "Focus Timer",
      description: "Stay focused with Pomodoro sessions.",
      bgColor: "bg-slate-200/80",
      iconSrc: timerIcon,
    },
    {
      title: "Progress Tracker",
      description: "Visualize your productivity over time.",
      bgColor: "bg-purple-300/80",
      iconSrc: trackerIcon,
    },
  ];

  return (
    <PageWrapper>
      <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4 text-slate-100">
        <div className="w-full max-w-7xl">
          <motion.div
            className="rounded-3xl bg-[#0F4C5C] p-6 sm:p-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Header />
            <motion.main
              className="mt-8 grid items-center gap-12 md:grid-cols-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="space-y-6" variants={itemVariants}>
                <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                  Mabuhay!
                </h1>
                <p className="text-4xl font-bold text-cyan-300 md:text-5xl lg:text-6xl">
                  Boost your focus, manage your tasks.
                </p>
                <Link
                  to="/signup"
                  className="inline-block rounded-lg bg-cyan-500 px-10 py-4 text-lg font-bold text-white transition-colors duration-300 hover:bg-cyan-600"
                >
                  Sign up
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <img
                  src={illustration}
                  alt="Person studying at a desk"
                  className="h-auto w-full rounded-lg"
                />
              </motion.div>
            </motion.main>

            <motion.section
              className="mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="mb-6 text-lg font-semibold text-slate-300">
                Key features:
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LandingPage;
