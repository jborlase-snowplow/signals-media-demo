import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Get the article slug from the query parameters
  const searchParams = request.nextUrl.searchParams
  const articleSlug = searchParams.get("articleSlug")

  if (!articleSlug) {
    return NextResponse.json({ error: "Article slug is required" }, { status: 400 })
  }

  // In a real implementation, this would query Snowplow for actual live reader counts
  // For this demo, we'll generate random numbers that are somewhat consistent per article

  // Use the article slug to generate a base number (for consistency between requests)
  const slugSum = articleSlug.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)

  // Generate a random number between 80% and 120% of the base
  const baseCount = (slugSum % 100) + 20 // Ensure at least 20 readers
  const randomFactor = 0.8 + Math.random() * 0.4 // Between 0.8 and 1.2
  const count = Math.floor(baseCount * randomFactor)

  // Add a small delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 200))

  return NextResponse.json({ count })
}
