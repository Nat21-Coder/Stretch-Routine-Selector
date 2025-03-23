export type BodyArea =
  | "neck"
  | "shoulders"
  | "back"
  | "hips"
  | "legs"
  | "fullBody";
export type Duration = "5" | "10" | "15" | "20";
export type Exercise = {
  id: string;
  name: string;
  description: string;
  duration: number; // in seconds
  bodyArea: string[];
};

export type StretchExercises = {
  neck: Exercise[];
  shoulders: Exercise[];
  back: Exercise[];
  hips: Exercise[];
  legs: Exercise[];
  fullBody: Exercise[];
};
