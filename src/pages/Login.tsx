import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('member');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password, role);
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Dumbbell className="text-emerald-500" size={40} />
            <span className="text-3xl font-bold text-white">FitTrack Pro</span>
          </div>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-white">Login</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  I am a
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      value="member"
                      checked={role === 'member'}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="text-emerald-600 focus:ring-emerald-600"
                    />
                    <span className="text-white">Member</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      value="admin"
                      checked={role === 'admin'}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="text-emerald-600 focus:ring-emerald-600"
                    />
                    <span className="text-white">Admin</span>
                  </label>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-emerald-500 hover:text-emerald-400 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
