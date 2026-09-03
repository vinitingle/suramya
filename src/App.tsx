import { About } from './components/About'
import { AnnouncementBar } from './components/AnnouncementBar'
import { CategoryGrid } from './components/CategoryGrid'
import { CustomBanner } from './components/CustomBanner'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ValueProps } from './components/ValueProps'

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <ValueProps />
        <CategoryGrid />
        <About />
        <CustomBanner />
      </main>
      <Footer />
    </div>
  )
}
