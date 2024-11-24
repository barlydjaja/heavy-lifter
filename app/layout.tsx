import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MobileContainer } from "@/components/layout/mobile-container"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Toaster } from "@/components/ui/toaster"
import { PWAPrompt } from "@/components/pwa/pwa-prompt"
import { InstallPWA } from "@/components/pwa/install-pwa-button"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Heavy Lifter",
  description: "Track your weightlifting progress",
  manifest: "/manifest.json",
  icons: {
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Heavy Lifter",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="application-name" content="Heavy Lifter" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Heavy Lifter" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-background bg-gray-100`}>
        {/* Main content */}
        <MobileContainer>
          {children}
          <BottomNav />
        </MobileContainer>

        {/* Toaster and PWA prompt */}
        <Toaster />
        <PWAPrompt />
        <InstallPWA />
      </body>
    </html>
  )
}