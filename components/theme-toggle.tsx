"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize theme based on localStorage or system preference
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      // Check localStorage first
      const savedTheme = localStorage.getItem("theme")

      if (savedTheme) {
        setIsDarkMode(savedTheme === "dark")
        document.documentElement.classList.toggle("dark", savedTheme === "dark")
      } else {
        // Check system preference
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        setIsDarkMode(systemPrefersDark)
        document.documentElement.classList.toggle("dark", systemPrefersDark)
      }
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)

    // Update the DOM
    document.documentElement.classList.toggle("dark", newTheme)

    // Save preference to localStorage
    localStorage.setItem("theme", newTheme ? "dark" : "light")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-9 h-9"
      aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
    </Button>
  )
}

