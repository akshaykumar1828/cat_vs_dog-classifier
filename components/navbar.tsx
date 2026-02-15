"use client"

import { useState } from "react"
import { Menu, X, Scan } from "lucide-react"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 text-foreground"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Scan className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            PetScan AI
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <button onClick={() => scrollTo("classifier")} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Classify
          </button>
          <button onClick={() => scrollTo("how-it-works")} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            How It Works
          </button>
          <button onClick={() => scrollTo("features")} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Features
          </button>
          <button
            onClick={() => scrollTo("classifier")}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Try Now
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <button onClick={() => scrollTo("classifier")} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground">
              Classify
            </button>
            <button onClick={() => scrollTo("how-it-works")} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground">
              How It Works
            </button>
            <button onClick={() => scrollTo("features")} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground">
              Features
            </button>
            <button
              onClick={() => scrollTo("classifier")}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Try Now
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
