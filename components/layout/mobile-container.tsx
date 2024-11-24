"use client"

import { motion } from 'framer-motion';

interface MobileContainerProps {
  children: React.ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="fixed max-w-md left-0 right-0 top-0 bottom-0 mx-auto">
      <div className="w-full h-full max-w-md bg-white shadow-lg overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}