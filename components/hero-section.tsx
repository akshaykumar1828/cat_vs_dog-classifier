import { ArrowDown, Sparkles, Cat, Dog } from "lucide-react"

export function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 py-20 lg:flex-row lg:gap-16">
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Classification</span>
          </div>

          <h1 className="font-display text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Is it a <span className="text-primary">Cat</span> or a{" "}
            <span className="text-accent">Dog</span>?
          </h1>

          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            Upload any pet image and our deep learning model will instantly classify it. Fast, accurate, and completely free to use.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#classifier"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start Classifying
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-8 py-3.5 text-sm font-semibold text-card-foreground transition-colors hover:bg-secondary"
            >
              Learn More
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-foreground">98%</span>
              <span className="text-xs text-muted-foreground">Accuracy</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-foreground">{'< 1s'}</span>
              <span className="text-xs text-muted-foreground">Response</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-foreground">Free</span>
              <span className="text-xs text-muted-foreground">Forever</span>
            </div>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="animate-float relative mx-auto w-full max-w-md">
            <div className="animate-pulse-ring absolute -inset-4 rounded-3xl bg-primary/10" />
            <div className="relative flex items-center justify-center gap-6 rounded-2xl bg-card p-10 shadow-2xl">
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-primary/10">
                <Cat className="h-16 w-16 text-primary" />
              </div>
              <span className="font-display text-3xl font-bold text-muted-foreground">vs</span>
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-accent/10">
                <Dog className="h-16 w-16 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
