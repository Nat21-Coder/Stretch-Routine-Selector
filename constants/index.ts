  import { BodyArea } from "@/types"
import {
    Brain,
    Dumbbell,
    SpadeIcon as Spine,
    Footprints,
    Activity,
    Users,
    Clock3,
    Clock6,
    Clock9,
    Clock12,
  } from "lucide-react"
  // Body area icons with labels
  export const bodyAreas = [
    { id: "neck", label: "Neck", icon: Brain, value: "neck" as BodyArea },
    { id: "shoulders", label: "Shoulders", icon: Dumbbell, value: "shoulders" as BodyArea },
    { id: "back", label: "Back", icon: Spine, value: "back" as BodyArea },
    { id: "hips", label: "Hips", icon: Activity, value: "hips" as BodyArea },
    { id: "legs", label: "Legs", icon: Footprints, value: "legs" as BodyArea },
    { id: "fullBody", label: "Full Body", icon: Users, value: "fullBody" as BodyArea },
  ]

  // Duration options with icons
  export const durationOptions = [
    { value: "5", label: "5 minutes", icon: Clock3 },
    { value: "10", label: "10 minutes", icon: Clock6 },
    { value: "15", label: "15 minutes", icon: Clock9 },
    { value: "20", label: "20 minutes", icon: Clock12 },
  ]
