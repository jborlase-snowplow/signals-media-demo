"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type Article = {
  slug: string
  title: string
  excerpt: string
  category: string
  personalizationScore: number
  recommendationReason: string
}

type RecommendationResponse = {
  recommendations: Article[]
  metadata: {
    userId: string
    timestamp: string
    interestsUsed: string[]
    source: string
  }
}

export default function RecommendedArticles() {
  const [recommendations, setRecommendations] = useState<Article[]>([])
  const [metadata, setMetadata] = useState<RecommendationResponse["metadata"] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true)

        // In a real app, you would include the actual user ID
        // This could come from an auth system or a cookie
        const userId = "anonymous" // Placeholder for a real user ID

        const response = await fetch(`/api/recommended-articles`)

        if (!response.ok) {
          throw new Error("Failed to fetch recommendations")
        }

        const data: RecommendationResponse = await response.json()
        setRecommendations(data.recommendations)
        setMetadata(data.metadata)
      } catch (err) {
        console.error("Error fetching recommendations:", err)
        setError("Unable to load personalized recommendations")
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  return (
    <section className="border-t bg-muted/40">
      <div className="container py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Recommended For You</h2>
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-800">
            Personalized
          </Badge>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-green-100">
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6 mb-1" />
                  <Skeleton className="h-4 w-4/6" />
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex w-full items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : recommendations.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((article, index) => (
              <Card key={index} className="border-green-100">
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2">
                    <Link href={`/categories/${article.category.toLowerCase()}`}>{article.category}</Link>
                  </Badge>
                  <h3 className="mb-2 line-clamp-2 text-xl font-bold">{article.title}</h3>
                  <p className="line-clamp-3 text-muted-foreground">{article.excerpt}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex w-full items-center justify-between">
                    <Link href={`/articles/${article.slug}`} className="text-sm text-primary hover:underline">
                      Read article →
                    </Link>
                    <span className="text-xs text-muted-foreground">{article.recommendationReason}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No recommendations available yet.</p>
            <p className="text-xs text-muted-foreground mt-2">
              Continue reading articles to improve your recommendations.
            </p>
          </div>
        )}

        {metadata && (
          <div className="mt-4 text-xs text-muted-foreground">
            <p>Powered by {metadata.source}</p>
            {metadata.interestsUsed.length > 0 ? (
              <p>Based on interests: {metadata.interestsUsed.join(", ")}</p>
            ) : (
              <p>No current recommendation attributes</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
