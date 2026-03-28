import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { NutritionistDashboard } from './pages/NutritionistDashboard';
import { PatientDashboard } from './pages/PatientDashboard';
import { ProcessingBridge } from './pages/ProcessingBridge';
import { SmartCheckout } from './pages/SmartCheckout';

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
          <PatientDashboard />
        </ProtectedRoute>
      } />
      <Route path="/processing" element={<ProcessingBridge />} />
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
