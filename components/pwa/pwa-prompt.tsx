"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Share } from "lucide-react"

export function PWAPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Check if it's iOS and not in standalone mode
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches

    if (isIOS && !isStandalone && !localStorage.getItem('pwa-prompt-dismissed')) {
      setShowPrompt(true)
    }
  }, [])

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-prompt-dismissed', 'true')
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed top-10 left-4 right-4 bg-card p-4 rounded-lg shadow-lg z-50"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Share className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold mb-1">Install Heavy Lifter</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Install this app on your home screen for quick access
              </p>
              <p className="text-sm text-muted-foreground">
                Tap <span className="text-primary">Share</span> then &quot;Add to Home Screen&quot;
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="text-sm text-primary"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}