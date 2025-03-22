import StretchRoutineSelector from "@/components/stretch-routine-selector"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen p-4 bg-background">
      <div className="container mx-auto">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <StretchRoutineSelector />
      </div>
    </main>
  )
}

