import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SnowplowProvider from "@/components/snowplow-provider"
import SnowplowPageViewTracker from "@/components/snowplow-page-view-tracker"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Daily Insight | Powered by Snowplow Analytics",
  description: "A newspaper demo showcasing Snowplow Analytics capabilities for media companies",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SnowplowProvider>
            {children}
            <SnowplowPageViewTracker />
          </SnowplowProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
