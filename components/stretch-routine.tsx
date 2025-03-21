"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, RefreshCw, Play, Pause, SkipForward, SkipBack, CheckCircle, Clock } from "lucide-react"

interface Exercise {
  id: string
  name: string
  description: string
  duration: number
  bodyArea: string[]
  isLast: boolean
  breakAfter: number
}

interface StretchRoutineProps {
  exercises: Exercise[]
  duration: number
  onReset: () => void
  onRegenerate: () => void
}

export default function StretchRoutine({ exercises, duration, onReset, onRegenerate }: StretchRoutineProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(exercises[0]?.duration || 30)
  const [isActive, setIsActive] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])
  const [routineComplete, setRoutineComplete] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  const totalExercises = exercises.length
  const currentExercise = exercises[currentExerciseIndex]
  const totalRoutineTime = exercises.reduce((total, ex) => total + ex.duration + ex.breakAfter, 0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive) {
      interval = setInterval(() => {
        // Increment total elapsed time
        setElapsedTime((prev) => prev + 1)

        if (timeRemaining > 0) {
          // Decrement time remaining for current exercise or break
          setTimeRemaining((prev) => prev - 1)
        } else {
          // Time is up for current activity
          if (isBreak) {
            // Break is over, move to next exercise
            setIsBreak(false)
            if (currentExerciseIndex < totalExercises - 1) {
              setCurrentExerciseIndex((prev) => prev + 1)
              setTimeRemaining(exercises[currentExerciseIndex + 1].duration)
            } else {
              // Routine complete
              setIsActive(false)
              setRoutineComplete(true)
            }
          } else {
            // Exercise is complete
            if (!completedExercises.includes(currentExerciseIndex)) {
              setCompletedExercises((prev) => [...prev, currentExerciseIndex])
            }

            // Check if there's a break after this exercise
            if (currentExercise.breakAfter > 0) {
              setIsBreak(true)
              setTimeRemaining(currentExercise.breakAfter)
            } else if (currentExerciseIndex < totalExercises - 1) {
              // No break, but more exercises
              setCurrentExerciseIndex((prev) => prev + 1)
              setTimeRemaining(exercises[currentExerciseIndex + 1].duration)
            } else {
              // Routine complete
              setIsActive(false)
              setRoutineComplete(true)
            }
          }
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [
    isActive,
    timeRemaining,
    currentExerciseIndex,
    totalExercises,
    completedExercises,
    isBreak,
    exercises,
    currentExercise,
  ])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const skipExercise = () => {
    setIsActive(false)

    if (isBreak) {
      // Skip the break
      setIsBreak(false)
      if (currentExerciseIndex < totalExercises - 1) {
        setCurrentExerciseIndex((prev) => prev + 1)
        setTimeRemaining(exercises[currentExerciseIndex + 1].duration)
      } else {
        setRoutineComplete(true)
      }
    } else {
      // Skip the exercise
      if (currentExerciseIndex < totalExercises - 1) {
        // Check if there's a break after this exercise
        if (currentExercise.breakAfter > 0) {
          setIsBreak(true)
          setTimeRemaining(currentExercise.breakAfter)
        } else {
          setCurrentExerciseIndex((prev) => prev + 1)
          setTimeRemaining(exercises[currentExerciseIndex + 1].duration)
        }
      } else {
        setRoutineComplete(true)
      }
    }
  }

  const previousExercise = () => {
    if (currentExerciseIndex > 0 || isBreak) {
      setIsActive(false)

      if (isBreak) {
        // Go back to the current exercise
        setIsBreak(false)
        setTimeRemaining(currentExercise.duration)
      } else {
        // Go to previous exercise
        setCurrentExerciseIndex((prev) => prev - 1)
        setTimeRemaining(exercises[currentExerciseIndex - 1].duration)
        setIsBreak(false)
      }
    }
  }

  const markAsCompleted = () => {
    if (!completedExercises.includes(currentExerciseIndex)) {
      setCompletedExercises((prev) => [...prev, currentExerciseIndex])
    }
  }

  const finishRoutine = () => {
    setRoutineComplete(true)
    setIsActive(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Calculate progress as percentage of total routine time
  const timeProgress = Math.min(Math.round((elapsedTime / totalRoutineTime) * 100), 100)
  const exerciseProgress = Math.round((completedExercises.length / totalExercises) * 100)
  const isCurrentExerciseCompleted = completedExercises.includes(currentExerciseIndex)

  // Calculate remaining time in the routine
  const remainingTime = totalRoutineTime - elapsedTime

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Your {duration}-Minute Stretch Routine</CardTitle>
        <CardDescription>
          {totalExercises} exercises • Total time: {formatTime(totalRoutineTime)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Time Progress: {timeProgress}% ({formatTime(elapsedTime)} elapsed)
          </span>
          <span>Remaining: {formatTime(Math.max(0, remainingTime))}</span>
        </div>
        <Progress value={timeProgress} className="h-2" />

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Exercise Progress: {exerciseProgress}% ({completedExercises.length} of {totalExercises} completed)
          </span>
          <span>
            Exercise {currentExerciseIndex + 1} of {totalExercises}
          </span>
        </div>
        <Progress value={exerciseProgress} className="h-2" />

        {!routineComplete ? (
          <>
            <div className={`p-6 rounded-lg ${isBreak ? "bg-blue-50 dark:bg-blue-900/20" : "bg-muted"}`}>
              {isBreak ? (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">Break Time</h3>
                    <span className="text-blue-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> Rest
                    </span>
                  </div>
                  <p className="mb-4">Take a moment to breathe and prepare for the next exercise.</p>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">{currentExercise.name}</h3>
                    {isCurrentExerciseCompleted && (
                      <span className="text-green-500 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" /> Completed
                      </span>
                    )}
                  </div>
                  <p className="mb-4">{currentExercise.description}</p>
                </>
              )}
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{formatTime(timeRemaining)}</div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={previousExercise}
                    disabled={currentExerciseIndex === 0 && !isBreak}
                    aria-label="Previous"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={toggleTimer} aria-label={isActive ? "Pause" : "Play"}>
                    {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon" onClick={skipExercise} aria-label="Skip">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {!isBreak && (
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={markAsCompleted} disabled={isCurrentExerciseCompleted}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Completed
                </Button>
                <Button variant="outline" size="sm" onClick={finishRoutine}>
                  Finish Routine
                </Button>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Up Next</h3>
              {isBreak ? (
                <div className="bg-background border rounded-lg p-4">
                  <h4 className="font-medium">{exercises[currentExerciseIndex + 1]?.name || "Last Exercise"}</h4>
                  <p className="text-sm text-muted-foreground">
                    {exercises[currentExerciseIndex + 1]?.description.substring(0, 100) + "..." ||
                      "This is the final exercise in your routine."}
                  </p>
                </div>
              ) : currentExerciseIndex < totalExercises - 1 ? (
                <div className="bg-background border rounded-lg p-4">
                  <h4 className="font-medium">{exercises[currentExerciseIndex + 1].name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {exercises[currentExerciseIndex + 1].description.substring(0, 100)}...
                  </p>
                </div>
              ) : (
                <div className="bg-background border rounded-lg p-4">
                  <h4 className="font-medium">Last Exercise</h4>
                  <p className="text-sm text-muted-foreground">This is the final exercise in your routine.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-muted p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Routine Complete!</h3>
            <p className="mb-4">
              Great job! You've completed {completedExercises.length} out of {totalExercises} exercises.
            </p>
            <p className="mb-4">
              Total time: {formatTime(elapsedTime)} of {formatTime(totalRoutineTime)}
            </p>
            {completedExercises.length > 0 ? (
              <p>Your body will thank you for the stretches you did today!</p>
            ) : (
              <p>Consider trying a few exercises next time to help your body feel better.</p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button variant="outline" onClick={onReset} className="w-full sm:w-auto">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Selection
        </Button>
        <Button variant="outline" onClick={onRegenerate} className="w-full sm:w-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New Routine
        </Button>
      </CardFooter>
    </Card>
  )
}

