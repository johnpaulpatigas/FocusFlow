/* eslint-disable no-unused-vars */
import { motion } from "motion/react";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0.7, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0.7, scale: 0.99 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
