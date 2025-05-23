"use client"

import { useEffect, useState } from "react"

// Hook to manage read articles using API
export function useReadArticles() {
  const [readArticles, setReadArticles] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  // Load read articles from API on mount
  useEffect(() => {
    const fetchReadArticles = async () => {
      try {
        const response = await fetch(`/api/read-articles`)

        if (!response.ok) {
          throw new Error("Failed to fetch read articles")
        }

        const data = await response.json()
        setReadArticles(data['articles_read'] || [])
      } catch (error) {
        console.error("Error fetching read articles:", error)
        setIsError(true)
        // Fallback to empty array
        setReadArticles([])
      } finally {
        setIsLoaded(true)
      }
    }

    fetchReadArticles()
  }, [])

  // Check if an article has been read
  const hasRead = (articleSlug: string) => {
    if (readArticles === undefined) {
        return false
    }
    return readArticles.includes(articleSlug)
  }

  return {
    readArticles,
    hasRead,
    isLoaded,
  }
}
