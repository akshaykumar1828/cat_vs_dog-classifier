import { Zap, Shield, Globe, Smartphone, Brain, Clock } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Deep Learning Model",
    description: "Powered by a convolutional neural network trained on thousands of cat and dog images for high accuracy.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get predictions in under a second. Our optimized pipeline ensures minimal latency for real-time results.",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Your images are processed and never stored. We respect your privacy and do not retain any uploaded data.",
  },
  {
    icon: Globe,
    title: "REST API Access",
    description: "Integrate the classifier into your own apps with our simple REST API endpoint at /predict.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Works perfectly on any device. Upload images directly from your phone camera or gallery.",
  },
  {
    icon: Clock,
    title: "Always Available",
    description: "Our API is deployed and available 24/7. Classify images anytime, anywhere, without limits.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Why PetScan AI?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Built with modern AI technology for the best classification experience
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
