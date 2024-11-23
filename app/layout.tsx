import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MobileContainer } from "@/components/layout/mobile-container"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Heavy Lifter",
  description: "Track your progressive overload journey",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MobileContainer>
          {children}
          <BottomNav />
          <Toaster />
        </MobileContainer>
      </body>
    </html>
  )
}