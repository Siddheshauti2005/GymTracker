export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Member {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  weight?: number;
  height?: number;
  goals?: string;
  subscriptionPlan?: string;
  subscriptionStatus: 'active' | 'inactive' | 'expired';
  subscriptionEndDate?: string;
  joinDate: string;
  trainerId?: string;
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  specialization: string;
  experience: number;
  avatar?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  restTime?: string;
  notes?: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  trainerId: string;
  exercises: Exercise[];
  daysPerWeek: number;
}

export interface WorkoutLog {
  id: string;
  memberId: string;
  workoutPlanId: string;
  date: string;
  exercises: {
    exerciseId: string;
    exerciseName: string;
    completedSets: number;
    actualReps: number[];
    weight?: number[];
    notes?: string;
  }[];
  duration?: number;
  completed: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
}

export interface Payment {
  id: string;
  memberId: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  planName: string;
}
