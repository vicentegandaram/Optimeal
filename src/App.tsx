import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { NutritionistDashboard } from './pages/NutritionistDashboard';
import { ProcessingBridge } from './pages/ProcessingBridge';
import { PatientExperience } from './pages/PatientExperience';
import { SmartCheckout } from './pages/SmartCheckout';

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: 'nutritionist' | 'patient' }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to={user?.role === 'nutritionist' ? '/dashboard-nutri' : '/patient'} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={
        user ? (
          <Navigate to={user.role === 'nutritionist' ? '/dashboard-nutri' : '/patient'} replace />
        ) : (
          <LoginPage />
        )
      } />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/dashboard-nutri" element={
        <ProtectedRoute allowedRole="nutritionist">
          <NutritionistDashboard />
        </ProtectedRoute>
      } />
      <Route path="/processing" element={<ProcessingBridge />} />
      <Route path="/patient" element={
        <ProtectedRoute allowedRole="patient">
          <PatientExperience />
        </ProtectedRoute>
      } />
      <Route path="/checkout" element={<SmartCheckout />} />
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
