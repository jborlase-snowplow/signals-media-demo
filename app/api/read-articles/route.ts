import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { Signals } from "@snowplow/signals-node"

// In a real implementation, this would use a database
// For this demo, we'll use a server-side in-memory store
// Note: This will reset when the server restarts
const userReadArticles: Record<string, string[]> = {}

const signals = new Signals({
    baseUrl: process.env.SIGNALS_API_URL || "",
    apiKey: process.env.SIGNALS_API_KEY || "",
    apiKeyId: process.env.SIGNALS_API_KEY_ID || "",
    organizationId: process.env.SIGNALS_ORG_ID || "",
  });
  

export async function GET(request: NextRequest) {
    console.log("🔍 Fetching read articles...");
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
    
    return NextResponse.json({ articles_read })
}
