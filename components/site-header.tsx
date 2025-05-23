import Link from "next/link"
import { Bell, Menu, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SiteHeader() {
  const categories = [
    { name: "Business", slug: "business" },
    { name: "Technology", slug: "technology" },
    { name: "Data", slug: "data" },
    { name: "AI", slug: "ai" },
    { name: "Research", slug: "research" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/" className="hover:text-foreground/80">
                Home
              </Link>
              {categories.map((category) => (
                <Link key={category.slug} href={`/categories/${category.slug}`} className="hover:text-foreground/80">
                  {category.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">The Daily Insight</span>
        </Link>
        <nav className="hidden md:flex md:gap-6 lg:gap-10">
          <Link href="/" className="text-sm font-medium hover:text-foreground/80">
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium hover:text-foreground/80">
              Categories
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((category) => (
                <DropdownMenuItem key={category.slug} asChild>
                  <Link href={`/categories/${category.slug}`}>{category.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/categories/business" className="text-sm font-medium hover:text-foreground/80">
            Business
          </Link>
          <Link href="/categories/technology" className="text-sm font-medium hover:text-foreground/80">
            Technology
          </Link>
          <Link href="/categories/data" className="text-sm font-medium hover:text-foreground/80 lg:inline-block">
            Data
          </Link>
          <Link href="/categories/ai" className="text-sm font-medium hover:text-foreground/80 lg:inline-block">
            AI
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <form className="hidden lg:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-48 rounded-lg bg-background pl-8 md:w-64 lg:w-80"
              />
            </div>
          </form>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button className="hidden md:inline-flex">Subscribe</Button>
        </div>
      </div>
    </header>
  )
}
