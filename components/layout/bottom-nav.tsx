"use client"

import { Trophy, Settings } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  const tabs = [
    {
      name: "Ranks",
      path: "/ranks",
      icon: Trophy
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings
    }
  ]

  return (
    <div className="fixed max-w-md bottom-0 left-0 right-0 max-w-mobile mx-auto bg-background border-t">
      <div className="flex items-center justify-around p-2">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.path)
          return (
            <Button
              key={tab.path}
              variant="ghost"
              className="relative flex-1 flex flex-col items-center py-2 gap-1"
              onClick={() => router.push(tab.path)}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-md"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              <tab.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-xs ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}>
                {tab.name}
              </span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}