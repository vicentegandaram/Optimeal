import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NutritionistDashboard } from './pages/NutritionistDashboard';
import { ProcessingBridge } from './pages/ProcessingBridge';
import { PatientExperience } from './pages/PatientExperience';
import { SmartCheckout } from './pages/SmartCheckout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NutritionistDashboard />} />
        <Route path="/processing" element={<ProcessingBridge />} />
        <Route path="/patient" element={<PatientExperience />} />
        <Route path="/checkout" element={<SmartCheckout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
