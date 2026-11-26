"use client";

import { motion } from "motion/react";

/** Re-mounts on every navigation, giving each page a soft fade-up entrance. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div className="page" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
