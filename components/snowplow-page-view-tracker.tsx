"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useSnowplow } from "@/lib/snowplow"
import { getArticleBySlug } from "@/lib/articles"

export default function SnowplowPageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const snowplow = useSnowplow()

  useEffect(() => {
    if (!snowplow) return

    // Extract article data if we're on an article page
    let articleData = undefined

    if (pathname?.startsWith("/articles/")) {
      const slug = pathname.split("/").pop()
      if (slug) {
        const article = getArticleBySlug(slug)
        if (article) {
          articleData = {
            articleId: article.slug,
            category: article.category,
            author: article.author,
          }
        }
      }
    }

    // Track page view
    snowplow.trackPageView();
  }, [pathname, searchParams, snowplow])

  return null
}
