import { About } from './components/About'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink">
      <Navbar />
      <Hero />
      <About />
    </div>
  )
}
