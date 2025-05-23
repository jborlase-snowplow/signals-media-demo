import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { getArticlesByCategory } from "@/lib/articles"
import type { Metadata } from "next"

type Props = {
  params: { category: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1)

  return {
    title: `${category} News | The Daily Insight`,
    description: `Latest ${category} news and articles from The Daily Insight`,
  }
}

export default function CategoryPage({ params }: Props) {
  const categoryName = params.category.toLowerCase()
  const formattedCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)

  const articles = getArticlesByCategory(formattedCategory)

  if (articles.length === 0) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{formattedCategory}</h1>
            <p className="mt-2 text-muted-foreground">
              The latest news and insights on {formattedCategory.toLowerCase()}.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Card key={index}>
                {index < 3 && (
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="rounded-t-lg object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2">
                    {article.category}
                  </Badge>
                  <h3 className="mb-2 line-clamp-2 text-xl font-bold">{article.title}</h3>
                  <p className="line-clamp-3 text-muted-foreground">{article.excerpt}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/articles/${article.slug}`} className="text-sm text-primary hover:underline">
                    Read article →
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No articles available in this category at the moment.</p>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
