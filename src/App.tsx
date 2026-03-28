import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { NutritionistDashboard } from './pages/NutritionistDashboard';
import { Dashboard } from './pages/Dashboard';
import { Planner } from './pages/Planner';
import { ExportView } from './pages/ExportView';

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: 'nutritionist' | 'patient' }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to={user?.role === 'nutritionist' ? '/nutri' : '/paciente'} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={
        user ? (
          <Navigate to={user.role === 'nutritionist' ? '/nutri' : '/paciente'} replace />
        ) : (
          <LoginPage />
        )
      } />
      <Route path="/nutri" element={
        <ProtectedRoute allowedRole="nutritionist">
          <NutritionistDashboard />
        </ProtectedRoute>
      } />
      <Route path="/paciente" element={
        <ProtectedRoute allowedRole="patient">
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/planner" element={
        <ProtectedRoute allowedRole="patient">
          <Planner />
        </ProtectedRoute>
      } />
      <Route path="/export" element={
        <ProtectedRoute allowedRole="patient">
          <ExportView />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
