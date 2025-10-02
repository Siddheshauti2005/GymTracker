import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { ArrowLeft, Plus, CreditCard as Edit, Trash2, Dumbbell, X } from 'lucide-react';
import { WorkoutPlan, Exercise } from '../../types';

export const WorkoutPlans: React.FC = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    daysPerWeek: '3',
    trainerId: 'trainer1'
  });
  const [exercises, setExercises] = useState<Omit<Exercise, 'id'>[]>([]);
  const [currentExercise, setCurrentExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    restTime: '',
    notes: ''
  });

  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([
    {
      id: '1',
      name: 'Beginner Strength Program',
      description: 'Perfect for those new to weight training',
      trainerId: 'trainer1',
      daysPerWeek: 3,
      exercises: [
        { id: '1', name: 'Squats', sets: 3, reps: '10-12', restTime: '90s' },
        { id: '2', name: 'Push-ups', sets: 3, reps: '8-10', restTime: '60s' },
        { id: '3', name: 'Rows', sets: 3, reps: '10-12', restTime: '90s' }
      ]
    },
    {
      id: '2',
      name: 'Advanced Powerlifting',
      description: 'High-intensity strength building program',
      trainerId: 'trainer2',
      daysPerWeek: 5,
      exercises: [
        { id: '1', name: 'Deadlifts', sets: 5, reps: '5', restTime: '180s' },
        { id: '2', name: 'Bench Press', sets: 5, reps: '5', restTime: '180s' },
        { id: '3', name: 'Squats', sets: 5, reps: '5', restTime: '180s' }
      ]
    }
  ]);

  const handleAddExercise = () => {
    if (currentExercise.name && currentExercise.sets && currentExercise.reps) {
      setExercises([...exercises, currentExercise]);
      setCurrentExercise({ name: '', sets: '', reps: '', restTime: '', notes: '' });
    }
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (exercises.length === 0) {
      alert('Please add at least one exercise');
      return;
    }

    const plan: WorkoutPlan = {
      id: Math.random().toString(36).substr(2, 9),
      name: newPlan.name,
      description: newPlan.description,
      trainerId: newPlan.trainerId,
      daysPerWeek: parseInt(newPlan.daysPerWeek),
      exercises: exercises.map((ex, i) => ({
        ...ex,
        id: i.toString(),
        sets: parseInt(ex.sets),
      }))
    };

    setWorkoutPlans([...workoutPlans, plan]);
    setShowCreateModal(false);
    setNewPlan({ name: '', description: '', daysPerWeek: '3', trainerId: 'trainer1' });
    setExercises([]);
  };

  const handleDeletePlan = (planId: string) => {
    if (confirm('Are you sure you want to delete this workout plan?')) {
      setWorkoutPlans(workoutPlans.filter(p => p.id !== planId));
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button onClick={() => navigate('/admin')} variant="ghost">
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">Workout Plans</h1>
            <p className="text-gray-400 mt-1">Create and manage workout programs</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus size={20} className="mr-2" />
            Create Plan
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workoutPlans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{plan.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-400">
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Dumbbell size={16} />
                    <span className="text-sm">{plan.daysPerWeek} days per week</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-400 mb-2">Exercises:</p>
                  {plan.exercises.map((exercise) => (
                    <div key={exercise.id} className="flex justify-between items-center p-2 bg-gray-900 rounded">
                      <span className="text-white text-sm">{exercise.name}</span>
                      <span className="text-gray-400 text-xs">
                        {exercise.sets}x{exercise.reps}
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="secondary" className="w-full mt-4">
                  Assign to Members
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {workoutPlans.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Dumbbell className="text-gray-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">No Workout Plans Yet</h3>
              <p className="text-gray-400 mb-4">Create your first workout plan to get started</p>
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus size={20} className="mr-2" />
                Create Plan
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Workout Plan"
      >
        <form onSubmit={handleCreatePlan} className="space-y-4">
          <Input
            label="Plan Name"
            value={newPlan.name}
            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
            placeholder="e.g., Beginner Strength Program"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              rows={3}
              value={newPlan.description}
              onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
              placeholder="Describe the workout plan..."
              required
            />
          </div>

          <Input
            label="Days Per Week"
            type="number"
            min="1"
            max="7"
            value={newPlan.daysPerWeek}
            onChange={(e) => setNewPlan({ ...newPlan, daysPerWeek: e.target.value })}
            required
          />

          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-bold text-white mb-3">Add Exercises</h3>

            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Exercise Name"
                  value={currentExercise.name}
                  onChange={(e) => setCurrentExercise({ ...currentExercise, name: e.target.value })}
                  placeholder="e.g., Bench Press"
                />
                <Input
                  label="Sets"
                  type="number"
                  value={currentExercise.sets}
                  onChange={(e) => setCurrentExercise({ ...currentExercise, sets: e.target.value })}
                  placeholder="3"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Reps"
                  value={currentExercise.reps}
                  onChange={(e) => setCurrentExercise({ ...currentExercise, reps: e.target.value })}
                  placeholder="8-10"
                />
                <Input
                  label="Rest Time"
                  value={currentExercise.restTime}
                  onChange={(e) => setCurrentExercise({ ...currentExercise, restTime: e.target.value })}
                  placeholder="90s"
                />
              </div>
              <Input
                label="Notes (optional)"
                value={currentExercise.notes}
                onChange={(e) => setCurrentExercise({ ...currentExercise, notes: e.target.value })}
                placeholder="Any special instructions..."
              />
              <Button type="button" onClick={handleAddExercise} variant="secondary" className="w-full">
                <Plus size={18} className="mr-2" />
                Add Exercise
              </Button>
            </div>

            {exercises.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-400">Added Exercises:</p>
                {exercises.map((exercise, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-900 rounded border border-gray-700">
                    <div>
                      <p className="text-white font-semibold">{exercise.name}</p>
                      <p className="text-gray-400 text-sm">
                        {exercise.sets} sets × {exercise.reps} reps
                        {exercise.restTime && ` • Rest: ${exercise.restTime}`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveExercise(index)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4 border-t border-gray-700">
            <Button type="submit" className="flex-1">Create Plan</Button>
            <Button type="button" onClick={() => setShowCreateModal(false)} variant="secondary" className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};
