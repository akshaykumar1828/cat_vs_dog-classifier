import { Scan, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-card-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Scan className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold">PetScan AI</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://cat-vs-dog-classifier-1-jy5y.onrender.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            API Docs
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          Built with Next.js. Powered by Deep Learning.
        </p>
      </div>
    </footer>
  )
}
