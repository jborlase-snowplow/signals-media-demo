// This file contains the Snowplow tracking configuration and utilities

// In a real implementation, you would import the actual Snowplow Browser Tracker
import { newTracker, trackPageView, trackSelfDescribingEvent } from '@snowplow/browser-tracker'

// Mock Snowplow tracker
const createTracker = () => {
  console.log("🔍 Initializing Snowplow tracker")

  newTracker('sp1', process.env.NEXT_PUBLIC_SNOWPLOW_COLLECTOR_URL || '', {
    appId: process.env.NEXT_PUBLIC_SNOWPLOW_APP_ID || 'website',
    platform: 'web',
    contexts: {
      webPage: true
    }
  })

  return {
    trackPageView: () => {
      trackPageView();
    },

    trackArticleEngagement: (category: string, name: string) => {

      trackSelfDescribingEvent({
        event: {
          schema: 'iglu:com.snplow.sales.aws/article_details/jsonschema/1-0-0',
          data: {
            "category": category,
            "name": name
          }
        }
      })
    }
  }
}

// Export the tracker creation function
export const initializeSnowplow = () => {
  // Only initialize once
  if (typeof window !== "undefined" && !(window as any).__snowplowInitialized) {
    ;(window as any).__snowplowInitialized = true
    ;(window as any).__snowplowTracker = createTracker()
  }

  return typeof window !== "undefined" ? (window as any).__snowplowTracker : null
}

// Hook to use the Snowplow tracker
export const useSnowplow = () => {
  if (typeof window === "undefined") return null

  if (!(window as any).__snowplowTracker) {
    initializeSnowplow()
  }

  return (window as any).__snowplowTracker
}
