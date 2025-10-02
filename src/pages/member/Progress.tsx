import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, Dumbbell, Clock } from 'lucide-react';

export const Progress: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const weightProgressData = [
    { date: 'Week 1', weight: 180, targetWeight: 175 },
    { date: 'Week 2', weight: 179, targetWeight: 175 },
    { date: 'Week 3', weight: 177, targetWeight: 175 },
    { date: 'Week 4', weight: 176, targetWeight: 175 },
  ];

  const workoutFrequencyData = [
    { week: 'Week 1', workouts: 3 },
    { week: 'Week 2', workouts: 4 },
    { week: 'Week 3', workouts: 4 },
    { week: 'Week 4', workouts: 5 },
  ];

  const strengthProgressData = [
    { exercise: 'Bench Press', weight: 185 },
    { exercise: 'Squats', weight: 225 },
    { exercise: 'Deadlifts', weight: 275 },
    { exercise: 'Pull-ups', weight: 180 },
  ];

  const recentWorkouts = [
    { date: '2025-10-01', exercises: 5, duration: 55, calories: 480 },
    { date: '2025-09-29', exercises: 4, duration: 45, calories: 420 },
    { date: '2025-09-27', exercises: 6, duration: 60, calories: 510 },
    { date: '2025-09-25', exercises: 4, duration: 50, calories: 450 },
  ];

  const stats = {
    totalWorkouts: 48,
    totalHours: 52,
    avgCalories: 465,
    currentStreak: 5
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Progress Tracking</h1>
          <p className="text-gray-400 mt-1">Monitor your fitness journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Workouts</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.totalWorkouts}</p>
                </div>
                <Dumbbell className="text-emerald-500" size={40} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Hours</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.totalHours}</p>
                </div>
                <Clock className="text-blue-500" size={40} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Calories</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.avgCalories}</p>
                </div>
                <TrendingUp className="text-orange-500" size={40} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Current Streak</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.currentStreak} days</p>
                </div>
                <Calendar className="text-emerald-500" size={40} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-white">Weight Progress</h2>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weightProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" domain={[170, 185]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                    labelStyle={{ color: '#F9FAFB' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="weight" stroke="#10B981" strokeWidth={2} name="Current Weight" />
                  <Line type="monotone" dataKey="targetWeight" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" name="Target Weight" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-white">Workout Frequency</h2>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workoutFrequencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="week" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                    labelStyle={{ color: '#F9FAFB' }}
                  />
                  <Legend />
                  <Bar dataKey="workouts" fill="#10B981" name="Workouts per Week" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-white">Strength Progress</h2>
            <p className="text-gray-400 text-sm">Maximum weight lifted (lbs)</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={strengthProgressData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis dataKey="exercise" type="category" stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
                <Bar dataKey="weight" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-white">Recent Workout History</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentWorkouts.map((workout, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-500/10 p-3 rounded-lg">
                      <Calendar className="text-emerald-500" size={24} />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      <p className="text-gray-400 text-sm">{workout.exercises} exercises completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{workout.duration} min</p>
                    <p className="text-gray-400 text-sm">{workout.calories} cal</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};
