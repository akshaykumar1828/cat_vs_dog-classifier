import { Upload, Cpu, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload Image",
    description:
      "Drag and drop or click to upload any pet image. We support JPG, PNG, and WEBP formats up to 10MB.",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description:
      "Our deep learning model processes the image in real-time, extracting visual features to make an accurate prediction.",
  },
  {
    icon: CheckCircle,
    title: "Get Results",
    description:
      "Receive an instant classification with confidence score. It is that simple - no sign-up, no cost, no limits.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-card py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="font-display text-3xl font-bold text-card-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-muted-foreground">
            Three simple steps to classify your pet image
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              {index < steps.length - 1 && (
                <div className="absolute left-[calc(50%+40px)] top-10 hidden h-px w-[calc(100%-80px)] bg-border md:block" />
              )}

              <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="h-8 w-8 text-primary" />
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {index + 1}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-card-foreground">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
