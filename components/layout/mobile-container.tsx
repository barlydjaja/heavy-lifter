"use client"

import { motion } from 'framer-motion';

interface MobileContainerProps {
  children: React.ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="flex relative justify-center h-full bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full flex flex-col overflow-auto"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}