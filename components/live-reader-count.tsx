"use client"

import { useEffect, useState } from "react"
import { Users } from "lucide-react"

interface LiveReaderCountProps {
  articleSlug: string
}

export default function LiveReaderCount({ articleSlug }: LiveReaderCountProps) {
  const [readerCount, setReaderCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReaderCount = async () => {
      try {
        setLoading(true)
        // In a real implementation, this would be a real API call to Snowplow
        const response = await fetch(`/api/live-readers?articleSlug=${articleSlug}`)
        const data = await response.json()
        setReaderCount(data.count)
      } catch (error) {
        console.error("Error fetching live reader count:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReaderCount()

    // Simulate real-time updates by polling every 10 seconds
    const interval = setInterval(fetchReaderCount, 10000)
    return () => clearInterval(interval)
  }, [articleSlug])

  if (loading || readerCount === null) {
    return null
  }

  return (
    <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
      <Users className="h-3 w-3" />
      <span>{readerCount} reading now</span>
    </div>
  )
}
