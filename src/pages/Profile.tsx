import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User, Calculator, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    age: '',
    weight: '',
    height: '',
    goals: ''
  });

  const [bmiData, setBmiData] = useState({
    weight: '',
    height: ''
  });
  const [bmiResult, setBmiResult] = useState<{ value: number; category: string } | null>(null);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const calculateBMI = () => {
    const weight = parseFloat(bmiData.weight);
    const height = parseFloat(bmiData.height);

    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);

      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';

      setBmiResult({ value: parseFloat(bmi.toFixed(1)), category });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          <p className="text-gray-400 mt-1">Manage your personal information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="text-emerald-500" size={24} />
                  <h2 className="text-xl font-bold text-white">Personal Information</h2>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                    <Input
                      label="Age"
                      type="number"
                      value={profileData.age}
                      onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                      placeholder="25"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Weight (lbs)"
                      type="number"
                      value={profileData.weight}
                      onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                      placeholder="180"
                    />
                    <Input
                      label="Height (cm)"
                      type="number"
                      value={profileData.height}
                      onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                      placeholder="175"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Fitness Goals
                    </label>
                    <textarea
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                      rows={4}
                      value={profileData.goals}
                      onChange={(e) => setProfileData({ ...profileData, goals: e.target.value })}
                      placeholder="e.g., Lose 10 lbs, Build muscle, Increase strength..."
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Target className="text-emerald-500" size={24} />
                  <h2 className="text-xl font-bold text-white">Account Settings</h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Account Type</p>
                    <p className="text-white font-semibold capitalize">{user?.role}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Member Since</p>
                    <p className="text-white font-semibold">September 1, 2025</p>
                  </div>
                  <div className="pt-4 border-t border-gray-700">
                    <Button variant="secondary">Change Password</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Calculator className="text-emerald-500" size={24} />
                  <h2 className="text-xl font-bold text-white">BMI Calculator</h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    label="Weight (kg)"
                    type="number"
                    value={bmiData.weight}
                    onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })}
                    placeholder="70"
                  />
                  <Input
                    label="Height (cm)"
                    type="number"
                    value={bmiData.height}
                    onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })}
                    placeholder="175"
                  />
                  <Button onClick={calculateBMI} className="w-full">
                    Calculate BMI
                  </Button>

                  {bmiResult && (
                    <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-700 rounded-lg">
                      <p className="text-gray-400 text-sm">Your BMI</p>
                      <p className="text-3xl font-bold text-white mt-1">{bmiResult.value}</p>
                      <p className="text-emerald-500 font-semibold mt-2">{bmiResult.category}</p>
                    </div>
                  )}

                  <div className="mt-4 text-sm text-gray-400 space-y-1">
                    <p className="font-semibold text-white">BMI Categories:</p>
                    <p>Underweight: &lt; 18.5</p>
                    <p>Normal weight: 18.5 - 24.9</p>
                    <p>Overweight: 25 - 29.9</p>
                    <p>Obese: ≥ 30</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};
