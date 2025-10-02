import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Calendar, Dumbbell, TrendingUp, CheckCircle } from 'lucide-react';
import { WorkoutPlan, WorkoutLog } from '../../types';

export const MemberDashboard: React.FC = () => {
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);

  const mockWorkoutPlan: WorkoutPlan = {
    id: '1',
    name: 'Strength Building Program',
    description: 'A comprehensive program focused on building overall strength',
    trainerId: 'trainer1',
    daysPerWeek: 4,
    exercises: [
      { id: '1', name: 'Bench Press', sets: 4, reps: '8-10', restTime: '90s', notes: 'Focus on form' },
      { id: '2', name: 'Squats', sets: 4, reps: '10-12', restTime: '120s', notes: 'Keep back straight' },
      { id: '3', name: 'Deadlifts', sets: 3, reps: '6-8', restTime: '150s', notes: 'Warm up properly' },
      { id: '4', name: 'Pull-ups', sets: 3, reps: '8-12', restTime: '90s' },
    ]
  };

  const [completedToday, setCompletedToday] = useState<string[]>([]);

  const handleLogExercise = (exercise: any) => {
    setSelectedExercise(exercise);
    setShowLogModal(true);
  };

  const handleCompleteExercise = () => {
    if (selectedExercise) {
      setCompletedToday([...completedToday, selectedExercise.id]);
      setShowLogModal(false);
      setSelectedExercise(null);
    }
  };

  const todayStats = {
    completedExercises: completedToday.length,
    totalExercises: mockWorkoutPlan.exercises.length,
    caloriesBurned: 450,
    workoutTime: 45
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
            <p className="text-gray-400 mt-1">Let's crush today's workout</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Today's Date</p>
            <p className="text-white font-semibold">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Exercises Done</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {todayStats.completedExercises}/{todayStats.totalExercises}
                  </p>
                </div>
                <CheckCircle className="text-emerald-500" size={40} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Calories Burned</p>
                  <p className="text-3xl font-bold text-white mt-1">{todayStats.caloriesBurned}</p>
                </div>
                <TrendingUp className="text-orange-500" size={40} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Workout Time</p>
                  <p className="text-3xl font-bold text-white mt-1">{todayStats.workoutTime}m</p>
                </div>
                <Calendar className="text-blue-500" size={40} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Weekly Goal</p>
                  <p className="text-3xl font-bold text-white mt-1">{mockWorkoutPlan.daysPerWeek}x</p>
                </div>
                <Dumbbell className="text-emerald-500" size={40} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-white">Today's Workout Plan</h2>
            <p className="text-gray-400 mt-1">{mockWorkoutPlan.name}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockWorkoutPlan.exercises.map((exercise) => {
                const isCompleted = completedToday.includes(exercise.id);
                return (
                  <div
                    key={exercise.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      isCompleted
                        ? 'bg-emerald-900/20 border-emerald-700'
                        : 'bg-gray-900 border-gray-700'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        {isCompleted && <CheckCircle className="text-emerald-500" size={24} />}
                        <div>
                          <h3 className="text-lg font-semibold text-white">{exercise.name}</h3>
                          <p className="text-gray-400 text-sm">
                            {exercise.sets} sets × {exercise.reps} reps
                            {exercise.restTime && ` • Rest: ${exercise.restTime}`}
                          </p>
                          {exercise.notes && (
                            <p className="text-gray-500 text-sm mt-1">Note: {exercise.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleLogExercise(exercise)}
                      disabled={isCompleted}
                      variant={isCompleted ? 'ghost' : 'primary'}
                      size="sm"
                    >
                      {isCompleted ? 'Completed' : 'Log Exercise'}
                    </Button>
                  </div>
                );
              })}
            </div>

            {completedToday.length === mockWorkoutPlan.exercises.length && (
              <div className="mt-6 p-4 bg-emerald-900/30 border border-emerald-700 rounded-lg text-center">
                <p className="text-emerald-500 font-semibold text-lg">
                  Amazing! You've completed today's workout! 🎉
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Modal
        isOpen={showLogModal}
        onClose={() => setShowLogModal(false)}
        title="Log Exercise"
      >
        {selectedExercise && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{selectedExercise.name}</h3>
              <p className="text-gray-400">
                Target: {selectedExercise.sets} sets × {selectedExercise.reps} reps
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sets Completed
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                  defaultValue={selectedExercise.sets}
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Weight Used (lbs)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                  placeholder="e.g., 135"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                  rows={3}
                  placeholder="How did it feel? Any observations?"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button onClick={handleCompleteExercise} className="flex-1">
                Save & Complete
              </Button>
              <Button onClick={() => setShowLogModal(false)} variant="secondary" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};
