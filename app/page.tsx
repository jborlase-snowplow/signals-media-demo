"use client"
import { ArticleCard } from "@/components/article-card"
import Link from "next/link"
import Image from "next/image"
import { CalendarIcon, TrendingUp, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import RecommendedArticles from "@/components/recommended-articles"
import { getFeaturedArticle, getTrendingArticles, getLatestArticles, getArticlesByCategory } from "@/lib/articles"
import { useReadArticles } from "@/hooks/use-read-articles"

export default function Home() {
  const featuredArticle = getFeaturedArticle()
  const trendingArticles = getTrendingArticles(4)
  const latestArticles = getLatestArticles(6)
  const businessArticles = getArticlesByCategory("business", 3)
  const technologyArticles = getArticlesByCategory("technology", 3)
  const dataArticles = getArticlesByCategory("data", 3)
  const { hasRead, isLoaded } = useReadArticles()

  console.log(dataArticles)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {featuredArticle && (
          <section className="container grid items-center gap-4 pb-6 pt-4 md:py-6">
            <div className="flex flex-col items-start gap-2">
              <Badge className="bg-red-600 hover:bg-red-700">Breaking News</Badge>
              <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl">
                {featuredArticle.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserRound className="h-4 w-4" />
                <span>By {featuredArticle.author}</span>
                <span className="mx-1">•</span>
                <CalendarIcon className="h-4 w-4" />
                <span>{featuredArticle.date}</span>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src={featuredArticle.image || "/placeholder.svg"}
                  alt="Featured article image"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-base">{featuredArticle.excerpt}</p>
                <p className="text-base line-clamp-4">{featuredArticle.content.split("\n\n")[0]}</p>
                <Link href={`/articles/${featuredArticle.slug}`} className="text-primary hover:underline mt-auto">
                  Continue reading →
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="border-t bg-muted/40">
          <div className="container py-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-red-500" />
                <span className="text-sm text-muted-foreground">Based on reader activity</span>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trendingArticles.map((article, index) => (
                <ArticleCard
                  key={index}
                  article={article}
                  hasBeenRead={isLoaded && hasRead(article.slug)}
                  showExcerpt={false}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="container py-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Latest News</h2>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="technology">Technology</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {latestArticles.map((article, index) => (
                  <ArticleCard
                    key={index}
                    article={article}
                    hasBeenRead={isLoaded && hasRead(article.slug)}
                    showImage={false}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="business" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {businessArticles.map((article, index) => (
                  <ArticleCard
                    key={index}
                    article={article}
                    hasBeenRead={isLoaded && hasRead(article.slug)}
                    showImage={false}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="technology" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {technologyArticles.map((article, index) => (
                  <ArticleCard
                    key={index}
                    article={article}
                    hasBeenRead={isLoaded && hasRead(article.slug)}
                    showImage={false}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="data" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {dataArticles.map((article, index) => (
                  <ArticleCard
                    key={index}
                    article={article}
                    hasBeenRead={isLoaded && hasRead(article.slug)}
                    showImage={false}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <RecommendedArticles />
      </main>
      <SiteFooter />
    </div>
  )
}
