"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import StretchRoutine from "./stretch-routine"
import { cn } from "@/lib/utils"
import { bodyAreas, durationOptions, stretchExercises } from "@/constants"
import { BodyArea, Duration } from "@/types"

export default function StretchRoutineSelector() {
  const [selectedAreas, setSelectedAreas] = useState<BodyArea[]>([])
  const [duration, setDuration] = useState<Duration>("10")
  const [routine, setRoutine] = useState<any[] | null>(null)

  const handleAreaChange = (area: BodyArea) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter((a) => a !== area))
    } else {
      setSelectedAreas([...selectedAreas, area])
    }
  }

  const generateRoutine = () => {
    // If no areas selected, default to full body
    const areasToUse = selectedAreas.length > 0 ? selectedAreas : ["fullBody"]

    let availableExercises: any[] = []

    // Get exercises for each selected area
    areasToUse.forEach((area) => {
      availableExercises = [...availableExercises, ...stretchExercises[area]]
    })

    // Shuffle exercises
    availableExercises = shuffleArray(availableExercises)

    // Calculate time distribution
    const durationInMinutes = Number.parseInt(duration)
    const totalTimeInSeconds = durationInMinutes * 60

    // Define minimum break duration
    const minBreakDuration = 5 // 5 seconds minimum break

    // Determine how many exercises to include
    // If there are too many exercises, limit them to a reasonable number
    const maxExercises = Math.min(availableExercises.length, 10)

    // Calculate how many exercises to include based on available exercises
    // and the selected duration
    const numberOfExercises = Math.min(
      availableExercises.length,
      Math.max(2, Math.floor(durationInMinutes / 2)), // At least 2 exercises, roughly 2 min per exercise
    )

    // Slice to get the right number of exercises
    const selectedExercises = availableExercises.slice(0, numberOfExercises)

    // Calculate time per exercise including break
    // Total time = (exercise time + break time) * number of exercises
    // The last exercise doesn't have a break after it
    const timePerExerciseWithBreak = Math.floor(
      totalTimeInSeconds / (numberOfExercises + (numberOfExercises - 1) * 0.2),
    )

    // Calculate exercise duration and break duration
    const exerciseDuration = Math.floor(timePerExerciseWithBreak)
    const breakDuration = Math.floor(timePerExerciseWithBreak * 0.2) // Break is 20% of exercise time

    // Add timing information to each exercise
    const exercises = selectedExercises.map((exercise, index) => ({
      ...exercise,
      duration: exerciseDuration,
      isLast: index === numberOfExercises - 1,
      breakAfter: index < numberOfExercises - 1 ? breakDuration : 0,
    }))

    console.log(
      `Generated routine: ${numberOfExercises} exercises, ${exerciseDuration}s per exercise, ${breakDuration}s breaks`,
    )

    setRoutine(exercises)
  }

  const shuffleArray = (array: any[]) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const resetForm = () => {
    setSelectedAreas([])
    setDuration("10")
    setRoutine(null)
  }


  return (
    <div className="w-full max-w-3xl mx-auto">
      {!routine ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl truncate">Stretch Routine Selector</CardTitle>
            <CardDescription>
              Select body areas to focus on and choose a duration for your stretching routine.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Body Areas</h3>
              <div className="grid grid-cols-1  sm:grid-cols-3 gap-3">
                {bodyAreas.map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => handleAreaChange(area.value)}
                    className={cn(
                      "flex items-start sm:items-center truncate sm:justify-center gap-2 p-3 rounded-md border transition-all active:scale-95",
                      selectedAreas.includes(area.value)
                        ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                        : "bg-background border-input hover:bg-accent hover:text-accent-foreground",
                    )}
                    aria-pressed={selectedAreas.includes(area.value)}
                  >
                    <area.icon className="h-4 w-4" />
                    <span>{area.label}</span>
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Select at least one area or a full body routine will be generated.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Duration (minutes)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {durationOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setDuration(option.value as Duration)}
                    className={cn(
                      "flex items-start sm:items-center sm:justify-center truncate gap-2 p-3 rounded-md border transition-all active:scale-95",
                      duration === option.value
                        ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                        : "bg-background border-input hover:bg-accent hover:text-accent-foreground",
                    )}
                    aria-pressed={duration === option.value}
                  >
                    <option.icon className=" h-4 w-4" />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={generateRoutine} className="w-full active:scale-95">
              Generate Routine
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <StretchRoutine
          exercises={routine}
          duration={Number.parseInt(duration)}
          onReset={resetForm}
          onRegenerate={generateRoutine}
        />
      )}
    </div>
  )
}

