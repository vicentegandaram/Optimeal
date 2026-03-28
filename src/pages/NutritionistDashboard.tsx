import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Users, Plus, X, FileText, Send, Calendar, TrendingUp, Upload, Check } from 'lucide-react';
import { Layout } from '../components/Layout';
import { ProgressBar } from '../components/ProgressBar';
import { Dropzone } from '../components/Dropzone';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { patients, nutritionist, weeklyPlanTemplate, getShoppingListFromPlan, type DayPlan } from '../data/mockData';

export function NutritionistDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'assign' | 'upload'>('assign');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [planName, setPlanName] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [previewPlan, setPreviewPlan] = useState<DayPlan | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openAssignModal = (patientId?: string) => {
    setModalType('assign');
    setSelectedPatient(patientId || null);
    setPlanName('');
    setPlanDescription('');
    setShowModal(true);
  };

  const openUploadModal = () => {
    setModalType('upload');
    setUploadSuccess(false);
    setPreviewPlan(weeklyPlanTemplate[0]);
    setShowModal(true);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    setUploadSuccess(true);
    localStorage.setItem('optimeal_plan', JSON.stringify({ uploaded: true }));
    localStorage.setItem('optimeal_weekly_plan', JSON.stringify(weeklyPlanTemplate));
    localStorage.setItem('optimeal_shopping_list', JSON.stringify(getShoppingListFromPlan(weeklyPlanTemplate)));
  };

  const handleAssignPlan = async () => {
    if (!planName) return;
    
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSending(false);
    setShowModal(false);
    setSelectedPatient(null);
    setPlanName('');
    setPlanDescription('');
  };

  const shoppingList = previewPlan 
    ? getShoppingListFromPlan([previewPlan])
    : [];

  return (
    <Layout title="Dashboard" showBack>
      <div className="p-4">
        <div className="bg-gradient-to-br from-navy to-gray-800 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-mint rounded-full flex items-center justify-center text-white font-bold text-xl">
                {nutritionist.avatar}
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">{nutritionist.name}</h2>
                <p className="text-gray-300 text-sm">{nutritionist.specialty}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium text-white"
            >
              <LogOut size={16} />
              <span>Salir</span>
            </button>
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
              <TrendingUp className="mx-auto mb-1 text-mint" size={20} />
              <p className="text-white font-semibold">85%</p>
              <p className="text-gray-300 text-xs">Adherencia</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={openUploadModal}
            className="flex flex-col items-center gap-2 p-4 bg-mint text-white rounded-xl hover:bg-mint/90 transition-colors shadow-lg"
          >
            <Upload size={28} />
            <span className="font-semibold text-sm">Crear Pauta</span>
          </button>
          <button
            onClick={() => openAssignModal()}
            className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-navy text-navy rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Plus size={28} />
            <span className="font-semibold text-sm">Asignar a Paciente</span>
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-navy">Mis Pacientes</h3>
        </div>

        <div className="space-y-3">
          {patients.map((patient) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-mint to-emerald-600 rounded-full flex items-center justify-center font-semibold text-white text-lg">
                  {patient.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-navy">{patient.name}</h4>
                  <p className="text-sm text-gray-500">{patient.email}</p>
                </div>
                <span className="text-xs text-gray-400">{patient.lastVisit}</span>
              </div>
              <ProgressBar label="Adherencia al plan" percentage={patient.adherence} />
              <button
                onClick={() => openAssignModal(patient.id)}
                className="w-full mt-2 py-2 text-sm font-medium text-mint hover:bg-mint/5 rounded-lg transition-colors"
              >
                Asignar nueva pauta
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-navy flex items-center gap-2">
                  {modalType === 'upload' ? (
                    <>
                      <FileText className="text-mint" size={24} />
                      Crear Nueva Pauta
                    </>
                  ) : (
                    <>
                      <Plus className="text-mint" size={24} />
                      Asignar Pauta
                    </>
                  )}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {modalType === 'upload' ? (
                <div className="space-y-4">
                  {!uploadSuccess ? (
                    <>
                      <Dropzone onFileUpload={handleUpload} isLoading={isUploading} />
                      
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-medium text-gray-700 mb-3">Preview del Plan Semanal</h4>
                        <div className="space-y-2">
                          {weeklyPlanTemplate.slice(0, 3).map((day) => (
                            <div key={day.day} className="bg-white rounded-lg p-3">
                              <p className="font-medium text-navy text-sm">{day.day}</p>
                              <p className="text-xs text-gray-500">
                                {day.meals.map(m => m.recipe.name).join(' • ')}
                              </p>
                            </div>
                          ))}
                          <p className="text-xs text-gray-400 text-center">+ 4 días más</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-xl p-4">
                        <h4 className="font-medium text-blue-700 mb-2">Ingredientes por semana</h4>
                        <div className="space-y-1 text-sm text-blue-600">
                          {shoppingList.slice(0, 4).map((item) => (
                            <div key={item.id} className="flex justify-between">
                              <span>{item.name}</span>
                              <span className="font-medium">${item.price.toLocaleString('es-CL')}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="w-full bg-mint text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-mint/90 transition-colors disabled:opacity-50"
                      >
                        {isUploading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Generando pauta...
                          </>
                        ) : (
                          <>
                            <Check size={18} />
                            Confirmar y Crear Pauta
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check size={32} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-navy mb-2">¡Pauta creada!</h3>
                      <p className="text-gray-500 mb-6">La pauta nutricional está lista para asignar a tus pacientes.</p>
                      <button
                        onClick={() => setShowModal(false)}
                        className="w-full bg-navy text-white font-semibold py-3 rounded-xl"
                      >
                        Cerrar
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedPatient && (
                    <div className="p-3 bg-mint/10 rounded-xl">
                      <p className="text-sm text-gray-600">Asignando a:</p>
                      <p className="font-semibold text-navy">
                        {patients.find(p => p.id === selectedPatient)?.name}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Plan
                    </label>
                    <input
                      type="text"
                      value={planName}
                      onChange={(e) => setPlanName(e.target.value)}
                      placeholder="Ej: Plan Semana 1"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      value={planDescription}
                      onChange={(e) => setPlanDescription(e.target.value)}
                      placeholder="Agrega notas o instrucciones..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-medium text-gray-700 mb-2">Resumen de macros</h4>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-white rounded-lg p-2">
                        <p className="text-mint font-bold">150g</p>
                        <p className="text-xs text-gray-500">Proteína</p>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <p className="text-blue-500 font-bold">280g</p>
                        <p className="text-xs text-gray-500">Carbohidratos</p>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <p className="text-red-500 font-bold">60g</p>
                        <p className="text-xs text-gray-500">Grasas</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleAssignPlan}
                    disabled={!planName || isSending}
                    className="w-full bg-mint text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-mint/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Asignar Pauta
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
