import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, LogOut, User, Home, BarChart3, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <Dumbbell className="text-emerald-500" size={32} />
              <span className="text-xl font-bold text-white">FitTrack Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              {user?.role === 'member' && (
                <>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="text-gray-300 hover:text-white flex items-center space-x-1 transition-colors"
                  >
                    <Home size={20} />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => navigate('/progress')}
                    className="text-gray-300 hover:text-white flex items-center space-x-1 transition-colors"
                  >
                    <BarChart3 size={20} />
                    <span>Progress</span>
                  </button>
                  <button
                    onClick={() => navigate('/subscription')}
                    className="text-gray-300 hover:text-white flex items-center space-x-1 transition-colors"
                  >
                    <CreditCard size={20} />
                    <span>Subscription</span>
                  </button>
                </>
              )}
              <button
                onClick={() => navigate('/profile')}
                className="text-gray-300 hover:text-white flex items-center space-x-1 transition-colors"
              >
                <User size={20} />
                <span>Profile</span>
              </button>
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut size={20} />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
