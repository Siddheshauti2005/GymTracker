import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { MemberDashboard } from './pages/member/Dashboard';
import { Progress } from './pages/member/Progress';
import { Subscription } from './pages/member/Subscription';
import { Profile } from './pages/Profile';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Trainers } from './pages/admin/Trainers';
import { WorkoutPlans } from './pages/admin/WorkoutPlans';

function DashboardRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['member']}>
              <MemberDashboard />
            </ProtectedRoute>
          } />

          <Route path="/progress" element={
            <ProtectedRoute allowedRoles={['member']}>
              <Progress />
            </ProtectedRoute>
          } />

          <Route path="/subscription" element={
            <ProtectedRoute allowedRoles={['member']}>
              <Subscription />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/admin/trainers" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Trainers />
            </ProtectedRoute>
          } />

          <Route path="/admin/workouts" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <WorkoutPlans />
            </ProtectedRoute>
          } />

          <Route path="*" element={<DashboardRedirect />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
