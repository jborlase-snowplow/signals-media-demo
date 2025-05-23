import { getArticleBySlug } from "@/lib/articles"
import type { Metadata } from "next"
import ArticlePageClient from "./ArticlePageClient"

type Props = {
  params: { slug: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default function ArticlePage({ params }: Props) {
  return <ArticlePageClient params={params} />
}
