"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

type DeferredPrompt = {
  prompt: () => void
  userChoice: Promise<{ outcome: string }>
  preventDefault: () => void
}

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<DeferredPrompt | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) {
      setIsInstallable(false)
      return
    }

    const handler = (e: DeferredPrompt) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()

      // Stash the event so it can be triggered later
      setDeferredPrompt(e as unknown as DeferredPrompt)
      setIsInstallable(true)
    }

    // Need to declare beforeinstallprompt event type since it's not in standard WindowEventMap
    window.addEventListener('beforeinstallprompt', handler as unknown as EventListener)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler as unknown as EventListener)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    // We no longer need the prompt. Clear it up
    setDeferredPrompt(null)
    setIsInstallable(false)
  }

  if (!isInstallable) return null

  return (
    <Button 
      onClick={handleInstallClick}
      className="gap-2"
      variant="outline"
    >
      <Download className="h-4 w-4" />
      Install App
    </Button>
  )
}