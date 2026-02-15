import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { Classifier } from "@/components/classifier"
import { HowItWorks } from "@/components/how-it-works"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Classifier />
        <HowItWorks />
        <FeaturesSection />
      </main>
      <Footer />
    </>
  )
}
