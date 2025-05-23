import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ReadIndicator } from "@/components/read-indicator"
import type { Article } from "@/lib/articles"

interface ArticleCardProps {
  article: Article
  hasBeenRead?: boolean
  showImage?: boolean
  showExcerpt?: boolean
  aspectRatio?: "landscape" | "square"
  className?: string
}

export function ArticleCard({
  article,
  hasBeenRead = false,
  showImage = true,
  showExcerpt = true,
  aspectRatio = "landscape",
  className,
}: ArticleCardProps) {
  const aspectRatioClass = aspectRatio === "landscape" ? "aspect-[4/3]" : "aspect-square"

  return (
    <Card className={className}>
      {showImage && (
        <div className={`relative w-full ${aspectRatioClass}`}>
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className={`rounded-t-lg object-cover ${hasBeenRead ? "opacity-80" : ""}`}
          />
          {hasBeenRead && (
            <div className="absolute top-2 right-2">
              <ReadIndicator />
            </div>
          )}
        </div>
      )}
      <CardContent className={`p-4 ${hasBeenRead ? "bg-muted/30" : ""}`}>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">
            <Link href={`/categories/${article.category.toLowerCase()}`}>{article.category}</Link>
          </Badge>
          {hasBeenRead && !showImage && <ReadIndicator size="sm" />}
        </div>
        <h3 className={`mb-2 line-clamp-2 text-xl font-bold ${hasBeenRead ? "text-muted-foreground" : ""}`}>
          {article.title}
        </h3>
        {showExcerpt && <p className="line-clamp-3 text-muted-foreground">{article.excerpt}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/articles/${article.slug}`} className="text-sm text-primary hover:underline">
          {hasBeenRead ? "Read again →" : "Read article →"}
        </Link>
      </CardFooter>
    </Card>
  )
}
