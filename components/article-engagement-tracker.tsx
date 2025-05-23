"use client"

import { useEffect, useState, useRef } from "react"
import { useSnowplow } from "@/lib/snowplow"

interface ArticleEngagementTrackerProps {
  articleCategory: string
  articleSlug: string
}

export default function ArticleEngagementTracker({ articleCategory, articleSlug }: ArticleEngagementTrackerProps) {
  const snowplow = useSnowplow()

  // Track scroll depth
  useEffect(() => {
    if (!snowplow) return;

    // Track article view start
    snowplow.trackArticleEngagement(articleCategory, articleSlug);

    return () =>  {}
  }, [articleSlug, snowplow])

  // This component doesn't render anything visible
  return null
}