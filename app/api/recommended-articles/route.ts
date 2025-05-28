import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { articles, getArticleBySlug, getRelatedArticles } from "@/lib/articles"
import { Signals } from "@snowplow/signals-node" 

const signals = new Signals({
  baseUrl: process.env.SIGNALS_API_URL || "",
  apiKey: process.env.SIGNALS_API_KEY || "",
  apiKeyId: process.env.SIGNALS_API_KEY_ID || "",
  organizationId: process.env.SIGNALS_ORG_ID || "",
});


export async function GET(request: NextRequest) {

  // Get the user ID from the cookies
  const cookieStore = cookies()
  const spCookie = cookieStore.get("_sp_id.1fff")?.value || "anonymous"

  const spUserId = spCookie.split(".")[0] || "anonymous"

  const attributes = await signals.getOnlineAttributes({
    entities: { domain_userid: [spUserId] },
    service: "media_demo_service",
  });

  console.log("🔍 Snowplow attributes:", attributes);

  const articles_read = attributes['articles_read']?.[0] ?? [];
  const article_last_read = attributes['article_last_read']?.[0] ?? null;

  const business_articles_read = attributes['article_category_business_read_count']?.[0] ?? 0;
  const ai_articles_read = (attributes['article_category_ai_read_count']?.[0] ?? 0);
  const data_articles_read = (attributes['article_category_data_read_count']?.[0] ?? 0);
  const technlogy_articles_read = (attributes['article_category_technology_read_count']?.[0] ?? 0);

  // Identify the user's interests based on the articles they have read. Use top 2 categories by read count
  const interests = Object.entries({
    Business: business_articles_read,
    AI: ai_articles_read,
    Data: data_articles_read,
    Technology: technlogy_articles_read,
  })
    .filter(([_, count]) => typeof count === "number" && count > 0)
    .sort(([, a], [, b]) => Number(b) - Number(a))
    .slice(0, 2)
    .map(([category]) => category);

  let recommendedArticles = articles.filter((article) => interests.includes(article.category) && !articles_read.includes(article.slug))

  // Limit to 3 articles and add a personalization score
  recommendedArticles = recommendedArticles.slice(0, 3).map((article) => ({
    ...article,
    // Add a reason for the recommendation
    recommendationReason: `Based on your interest in ${article.category}`,
  }))

  // If there are less than 3 articles, fill the rest with related articles to the user's last read article
  if (recommendedArticles.length < 3 && article_last_read) {
      const relatedArticles = typeof article_last_read === "string" 
        ? getRelatedArticles(article_last_read) 
        : [];

      // Filter out already read articles
      const unreadRelatedArticles = relatedArticles.filter((article) => !articles_read.includes(article.slug));

      // Add recommendation reason
      const reason = `Based on your last read article`;
      recommendedArticles = [
        ...recommendedArticles,
        ...unreadRelatedArticles.slice(0, 3 - recommendedArticles.length).map((article) => ({
          ...article,
          recommendationReason: reason,
        })),
      ]
  }

  
  const lastReadTitle = typeof article_last_read === "string" 
    ? getArticleBySlug(article_last_read)?.title 
    : undefined;

  if (lastReadTitle) {
    interests.push(lastReadTitle);
  }
  

  return NextResponse.json({
    recommendations: recommendedArticles,
    metadata: {
      userId: spUserId,
      timestamp: new Date().toISOString(),
      interestsUsed: interests,
      source: "Snowplow Signals Streaming Attributes",
    },
  })
}
