import { BodyArea, StretchExercises } from "@/types";
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
} from "lucide-react";
// Body area icons with labels
export const bodyAreas = [
  { id: "neck", label: "Neck", icon: Brain, value: "neck" as BodyArea },
  {
    id: "shoulders",
    label: "Shoulders",
    icon: Dumbbell,
    value: "shoulders" as BodyArea,
  },
  { id: "back", label: "Back", icon: Spine, value: "back" as BodyArea },
  { id: "hips", label: "Hips", icon: Activity, value: "hips" as BodyArea },
  { id: "legs", label: "Legs", icon: Footprints, value: "legs" as BodyArea },
  {
    id: "fullBody",
    label: "Full Body",
    icon: Users,
    value: "fullBody" as BodyArea,
  },
];

// Duration options with icons
export const durationOptions = [
  { value: "5", label: "5 minutes", icon: Clock3 },
  { value: "10", label: "10 minutes", icon: Clock6 },
  { value: "15", label: "15 minutes", icon: Clock9 },
  { value: "20", label: "20 minutes", icon: Clock12 },
];

export const stretchExercises: StretchExercises = {
  neck: [
    {
      id: "neck-1",
      name: "Neck Tilts",
      description:
        "Gently tilt your head to the right, bringing your ear toward your shoulder. Hold for 15-30 seconds, then repeat on the left side.",
      duration: 30,
      bodyArea: ["neck"],
    },
    {
      id: "neck-2",
      name: "Neck Rotations",
      description:
        "Slowly rotate your head in a circular motion, making a complete circle. Perform 5 rotations clockwise, then 5 counterclockwise.",
      duration: 30,
      bodyArea: ["neck"],
    },
    {
      id: "neck-3",
      name: "Chin Tucks",
      description:
        "Gently draw your chin toward your chest, creating a double chin. Hold for 5 seconds, then release. Repeat 10 times.",
      duration: 30,
      bodyArea: ["neck"],
    },
    {
      id: "neck-4",
      name: "Forward and Backward Tilt",
      description:
        "Tilt your head forward, bringing your chin to your chest. Hold for 15 seconds, then tilt backward, looking up at the ceiling. Hold for 15 seconds.",
      duration: 30,
      bodyArea: ["neck"],
    },
  ],
  shoulders: [
    {
      id: "shoulders-1",
      name: "Shoulder Rolls",
      description:
        "Roll your shoulders forward in a circular motion 10 times, then backward 10 times.",
      duration: 30,
      bodyArea: ["shoulders"],
    },
    {
      id: "shoulders-2",
      name: "Cross-Body Shoulder Stretch",
      description:
        "Bring your right arm across your chest and use your left hand to gently pull the right arm closer to your body. Hold for 30 seconds, then switch arms.",
      duration: 30,
      bodyArea: ["shoulders"],
    },
    {
      id: "shoulders-3",
      name: "Overhead Triceps Stretch",
      description:
        "Reach your right arm overhead, bend at the elbow, and place your hand behind your neck. Use your left hand to gently push the right elbow back. Hold for 30 seconds, then switch arms.",
      duration: 30,
      bodyArea: ["shoulders"],
    },
    {
      id: "shoulders-4",
      name: "Wall Angels",
      description:
        "Stand with your back against a wall, arms at your sides with elbows bent at 90 degrees. Slowly raise your arms overhead while maintaining contact with the wall. Return to starting position. Repeat 10 times.",
      duration: 30,
      bodyArea: ["shoulders", "back"],
    },
  ],
  back: [
    {
      id: "back-1",
      name: "Cat-Cow Stretch",
      description:
        "Start on your hands and knees. Arch your back upward (cat) and then let it sag (cow). Repeat this movement 10 times, flowing between positions.",
      duration: 30,
      bodyArea: ["back"],
    },
    {
      id: "back-2",
      name: "Child's Pose",
      description:
        "Kneel on the floor, sit back on your heels, then bend forward, extending your arms in front of you. Rest your forehead on the floor and hold for 30 seconds.",
      duration: 30,
      bodyArea: ["back"],
    },
    {
      id: "back-3",
      name: "Seated Spinal Twist",
      description:
        "Sit with legs extended. Bend your right knee and place your foot outside your left thigh. Twist your torso to the right, placing your left elbow outside your right knee. Hold for 30 seconds, then switch sides.",
      duration: 30,
      bodyArea: ["back", "hips"],
    },
    {
      id: "back-4",
      name: "Standing Forward Bend",
      description:
        "Stand with feet hip-width apart. Bend forward from the hips, letting your upper body hang down. Keep a slight bend in your knees. Hold for 30 seconds.",
      duration: 30,
      bodyArea: ["back", "legs"],
    },
  ],
  hips: [
    {
      id: "hips-1",
      name: "Butterfly Stretch",
      description:
        "Sit with the soles of your feet together, knees bent outward. Gently press your knees toward the floor. Hold for 30 seconds.",
      duration: 30,
      bodyArea: ["hips"],
    },
    {
      id: "hips-2",
      name: "Pigeon Pose",
      description:
        "From a plank position, bring your right knee forward toward your right hand. Extend your left leg behind you. Hold for 30 seconds, then switch sides.",
      duration: 30,
      bodyArea: ["hips"],
    },
    {
      id: "hips-3",
      name: "Hip Flexor Stretch",
      description:
        "Kneel on your right knee with your left foot in front of you, left knee bent at 90 degrees. Push your hips forward until you feel a stretch in the front of your right hip. Hold for 30 seconds, then switch sides.",
      duration: 30,
      bodyArea: ["hips", "legs"],
    },
    {
      id: "hips-4",
      name: "Figure Four Stretch",
      description:
        "Lie on your back. Cross your right ankle over your left thigh. Reach through the gap and pull your left thigh toward your chest. Hold for 30 seconds, then switch sides.",
      duration: 30,
      bodyArea: ["hips"],
    },
  ],
  legs: [
    {
      id: "legs-1",
      name: "Standing Hamstring Stretch",
      description:
        "Place your right heel on a low surface with your leg straight. Bend forward from your hips until you feel a stretch in the back of your leg. Hold for 30 seconds, then switch legs.",
      duration: 30,
      bodyArea: ["legs"],
    },
    {
      id: "legs-2",
      name: "Standing Quad Stretch",
      description:
        "Stand on your left foot, bend your right knee, and grasp your right ankle with your right hand. Pull your heel toward your buttocks. Hold for 30 seconds, then switch legs.",
      duration: 30,
      bodyArea: ["legs"],
    },
    {
      id: "legs-3",
      name: "Calf Stretch",
      description:
        "Stand facing a wall with hands on the wall at eye level. Place your right leg behind you with heel on the floor. Keep your right leg straight and bend your left knee. Hold for 30 seconds, then switch legs.",
      duration: 30,
      bodyArea: ["legs"],
    },
    {
      id: "legs-4",
      name: "Inner Thigh Stretch",
      description:
        "Stand with feet wider than shoulder-width apart. Shift your weight to the right side, bending your right knee and keeping your left leg straight. Hold for 30 seconds, then switch sides.",
      duration: 30,
      bodyArea: ["legs", "hips"],
    },
  ],
  fullBody: [
    {
      id: "fullbody-1",
      name: "Downward-Facing Dog",
      description:
        "Start on your hands and knees, then lift your hips up and back, forming an inverted V shape with your body. Press your heels toward the floor. Hold for 30 seconds.",
      duration: 30,
      bodyArea: ["back", "shoulders", "legs"],
    },
    {
      id: "fullbody-2",
      name: "Standing Side Bend",
      description:
        "Stand with feet hip-width apart. Raise your right arm overhead and bend to the left. Hold for 15 seconds, then switch sides.",
      duration: 30,
      bodyArea: ["back", "shoulders"],
    },
    {
      id: "fullbody-3",
      name: "World's Greatest Stretch",
      description:
        "Start in a lunge position with your right foot forward. Place your left hand on the ground inside your right foot, and twist your torso to the right, extending your right arm upward. Hold for 15 seconds, then switch sides.",
      duration: 30,
      bodyArea: ["hips", "back", "shoulders"],
    },
    {
      id: "fullbody-4",
      name: "Cobra Pose",
      description:
        "Lie face down with hands under shoulders. Press into your hands to lift your chest off the floor, keeping hips down. Hold for 15-30 seconds.",
      duration: 30,
      bodyArea: ["back", "shoulders"],
    },
    {
      id: "fullbody-5",
      name: "Standing Forward Fold with Shoulder Opener",
      description:
        "Stand with feet hip-width apart. Interlace your fingers behind your back, then fold forward from the hips, allowing your clasped hands to move forward over your head. Hold for 30 seconds.",
      duration: 30,
      bodyArea: ["back", "shoulders", "legs"],
    },
    {
      id: "fullbody-6",
      name: "Supine Spinal Twist",
      description:
        "Lie on your back with arms extended to the sides. Bring your knees to your chest, then lower them to the right side while keeping shoulders flat on the floor. Hold for 30 seconds, then switch sides.",
      duration: 30,
      bodyArea: ["back", "hips"],
    },
  ],
};
