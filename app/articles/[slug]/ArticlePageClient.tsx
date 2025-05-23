"use client"
import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { CalendarIcon, Clock, Share2, ThumbsUp, UserRound } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import LiveReaderCount from "@/components/live-reader-count"
import ArticleEngagementTracker from "@/components/article-engagement-tracker"
import { getArticleBySlug, getRelatedArticles } from "@/lib/articles"
import { useReadArticles } from "@/hooks/use-read-articles"
import { ArticleCard } from "@/components/article-card"

type Props = {
  params: { slug: string }
}

export default function ArticlePageClient({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  const { hasRead, isLoaded } = useReadArticles()

  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(params.slug)

  // Convert markdown-like content to HTML paragraphs
  const contentHtml = article.content.split("\n\n").map((paragraph, index) => {
    // Handle headers
    if (paragraph.startsWith("## ")) {
      return (
        <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
          {paragraph.substring(3)}
        </h2>
      )
    }
    // Handle blockquotes
    if (paragraph.startsWith("> ")) {
      return (
        <blockquote key={index} className="border-l-4 border-muted pl-4 italic my-6">
          {paragraph.substring(2)}
        </blockquote>
      )
    }
    // Handle lists
    if (paragraph.startsWith("- ")) {
      const items = paragraph.split("\n").map((item) => item.substring(2))
      return (
        <ul key={index} className="list-disc pl-6 my-4 space-y-2">
          {items.map((item, i) => {
            // Handle bold text in list items
            if (item.includes("**")) {
              const parts = item.split("**")
              return <li key={i}>{parts.map((part, j) => (j % 2 === 0 ? part : <strong key={j}>{part}</strong>))}</li>
            }
            return <li key={i}>{item}</li>
          })}
        </ul>
      )
    }

    // Handle paragraphs with bold text
    if (paragraph.includes("**")) {
      const parts = paragraph.split("**")
      return (
        <p key={index} className="my-4">
          {parts.map((part, i) => (i % 2 === 0 ? part : <strong key={i}>{part}</strong>))}
        </p>
      )
    }

    // Regular paragraphs
    return (
      <p key={index} className="my-4">
        {paragraph}
      </p>
    )
  })

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <article className="container max-w-4xl py-6 lg:py-12">
          <div className="space-y-4">
            <Badge>
              <Link href={`/categories/${article.category.toLowerCase()}`}>{article.category}</Link>
            </Badge>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-4xl md:text-5xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <UserRound className="h-4 w-4" />
                <span>By {article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          <div className="relative my-8 aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={`${article.title} featured image`}
              fill
              className="object-cover"
              priority
            />
            <LiveReaderCount articleSlug={article.slug} />
          </div>

          <div className="prose prose-gray max-w-none dark:prose-invert">
            <p className="lead text-xl">{article.excerpt}</p>

            {contentHtml}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>Like</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
            {article.recommended && (
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-800">
                Recommended for you
              </Badge>
            )}
          </div>

          <Separator className="my-8" />

          {relatedArticles.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Related Articles</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {relatedArticles.map((relatedArticle, index) => (
                  <ArticleCard
                    key={index}
                    article={relatedArticle}
                    hasBeenRead={isLoaded && hasRead(relatedArticle.slug)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Add the engagement tracker for Snowplow tracking */}
          <ArticleEngagementTracker articleCategory={article.category} articleSlug={article.slug} />
        </article>

      </main>
      <SiteFooter />
    </div>
  )
}
