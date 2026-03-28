import { Sparkles, Users, Calendar } from 'lucide-react';
import { Layout } from '../components/Layout';
import { ProgressBar } from '../components/ProgressBar';
import { nutritionist, patients } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export function NutritionistDashboard() {
  const navigate = useNavigate();

  return (
    <Layout title="Dashboard">
      <div className="p-4">
        <div className="bg-navy rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-mint rounded-full flex items-center justify-center text-white font-bold text-xl">
              {nutritionist.avatar}
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">{nutritionist.name}</h2>
              <p className="text-gray-300 text-sm">{nutritionist.specialty}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <Users className="mx-auto mb-1 text-mint" size={20} />
              <p className="text-white font-semibold">{patients.length}</p>
              <p className="text-gray-300 text-xs">Pacientes</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <Calendar className="mx-auto mb-1 text-mint" size={20} />
              <p className="text-white font-semibold">12</p>
              <p className="text-gray-300 text-xs">Consultas</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <Sparkles className="mx-auto mb-1 text-mint" size={20} />
              <p className="text-white font-semibold">85%</p>
              <p className="text-gray-300 text-xs">Adherencia</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Mis Pacientes</h3>
          <span className="text-sm text-gray-500">{patients.length} activos</span>
        </div>

        <div className="space-y-3">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/processing')}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-600">
                  {patient.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{patient.name}</h4>
                  <p className="text-sm text-gray-500">{patient.lastVisit}</p>
                </div>
              </div>
              <ProgressBar label="Adherencia al plan" percentage={patient.adherence} />
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/processing')}
          className="w-full mt-6 bg-mint text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-mint/90 transition-colors shadow-lg"
        >
          <Sparkles size={20} />
          Magic Sync
        </button>
      </div>
    </Layout>
  );
}
