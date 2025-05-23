import Link from "next/link"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center justify-center py-12">
        <div className="container max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
