"use client"

import { motion } from 'framer-motion';

interface MobileContainerProps {
  children: React.ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md min-h-screen bg-white shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}