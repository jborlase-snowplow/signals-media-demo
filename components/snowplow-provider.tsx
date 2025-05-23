"use client"

import type React from "react"

import { useEffect } from "react"
import { initializeSnowplow } from "@/lib/snowplow"

export default function SnowplowProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Snowplow when the app loads
    initializeSnowplow()
  }, [])

  return <>{children}</>
}
