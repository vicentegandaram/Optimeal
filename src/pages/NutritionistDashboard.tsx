import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Users, Plus, X, FileText, Send, Calendar, TrendingUp, Upload, Check, UserPlus, Trash2 } from 'lucide-react';
import { Dropzone } from '../components/Dropzone';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { patients as initialPatients, nutritionist } from '../data/mockData';
import type { Patient } from '../data/mockData';

export function NutritionistDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'assign' | 'upload' | 'addPatient'>('assign');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [planName, setPlanName] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // New patient form
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientEmail, setNewPatientEmail] = useState('');
  const [newPatientError, setNewPatientError] = useState('');

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
    setShowModal(true);
  };

  const openAddPatientModal = () => {
    setModalType('addPatient');
    setNewPatientName('');
    setNewPatientEmail('');
    setNewPatientError('');
    setShowModal(true);
  };

  const handleFileUpload = async () => {
    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    setUploadSuccess(true);
    localStorage.setItem('optimeal_plan', JSON.stringify({ uploaded: true }));
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

  const handleAddPatient = () => {
    if (!newPatientName.trim()) {
      setNewPatientError('El nombre es requerido');
      return;
    }
    if (!newPatientEmail.trim() || !newPatientEmail.includes('@')) {
      setNewPatientError('Email válido es requerido');
      return;
    }

    const newPatient: Patient = {
      id: `pat-${Date.now()}`,
      name: newPatientName,
      email: newPatientEmail,
      adherence: 0,
      lastVisit: 'Nuevo',
      avatar: newPatientName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
    };

    setPatients([...patients, newPatient]);
    setShowModal(false);
    setNewPatientName('');
    setNewPatientEmail('');
    setNewPatientError('');
  };

  const handleDeletePatient = (patientId: string) => {
    setPatients(patients.filter(p => p.id !== patientId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-navy text-white px-4 py-4">
        <div className="max-w-[450px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-mint rounded-xl flex items-center justify-center font-bold">
              {nutritionist.avatar}
            </div>
            <div>
              <h1 className="font-semibold">{nutritionist.name}</h1>
              <p className="text-xs text-gray-300">{nutritionist.specialty}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition"
          >
            <LogOut size={16} />
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-[450px] mx-auto bg-white min-h-[calc(100vh-72px)] pb-6">
        <div className="p-4">
          <div className="bg-gradient-to-br from-navy to-gray-800 rounded-2xl p-5 mb-6">
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

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={openUploadModal}
              className="flex flex-col items-center gap-2 p-4 bg-mint text-white rounded-xl hover:bg-mint/90 transition shadow-lg"
            >
              <Upload size={28} />
              <span className="font-semibold text-sm">Crear Pauta</span>
            </button>
            <button
              onClick={openAddPatientModal}
              className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-navy text-navy rounded-xl hover:bg-gray-50 transition"
            >
              <UserPlus size={28} />
              <span className="font-semibold text-sm">Agregar Paciente</span>
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-navy">Mis Pacientes</h3>
            <button
              onClick={openAddPatientModal}
              className="flex items-center gap-1 text-sm text-mint font-medium hover:underline"
            >
              <Plus size={16} />
              Nuevo
            </button>
          </div>

          <div className="space-y-3">
            {patients.map((patient) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-mint to-emerald-600 rounded-full flex items-center justify-center font-semibold text-white text-lg">
                    {patient.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-navy">{patient.name}</h4>
                    <p className="text-sm text-gray-500">{patient.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{patient.lastVisit}</span>
                    <button
                      onClick={() => handleDeletePatient(patient.id)}
                      className="p-1 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-mint rounded-full transition-all"
                    style={{ width: `${patient.adherence}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Adherencia: {patient.adherence}%</p>
                  <button
                    onClick={() => openAssignModal(patient.id)}
                    className="text-sm font-medium text-mint hover:bg-mint/5 px-3 py-1 rounded-lg transition"
                  >
                    Asignar pauta
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

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
                  {modalType === 'upload' && <><FileText className="text-mint" /> Crear Nueva Pauta</>}
                  {modalType === 'assign' && <><Plus className="text-mint" /> Asignar Pauta</>}
                  {modalType === 'addPatient' && <><UserPlus className="text-mint" /> Agregar Paciente</>}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {modalType === 'upload' && (
                <div className="space-y-4">
                  {!uploadSuccess ? (
                    <>
                      <Dropzone onFileUpload={handleFileUpload} isLoading={isUploading} />
                      
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-medium text-gray-700 mb-2">Vista previa del plan</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>• Macros objetivos diarios</p>
                          <p>• 7 días de comidas</p>
                          <p>• Lista de compras optimizada</p>
                        </div>
                      </div>

                      <button
                        onClick={handleFileUpload}
                        disabled={isUploading}
                        className="w-full bg-mint text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isUploading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Procesando...
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
                      <p className="text-gray-500 mb-6">La pauta está lista para asignar a tus pacientes.</p>
                      <button
                        onClick={() => { setShowModal(false); navigate('/paciente'); }}
                        className="w-full bg-navy text-white font-semibold py-3 rounded-xl"
                      >
                        Ir al Portal Paciente
                      </button>
                    </motion.div>
                  )}
                </div>
              )}

              {modalType === 'assign' && (
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      value={planDescription}
                      onChange={(e) => setPlanDescription(e.target.value)}
                      placeholder="Notas o instrucciones..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint resize-none"
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
                    className="w-full bg-mint text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
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

              {modalType === 'addPatient' && (
                <div className="space-y-4">
                  {newPatientError && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm">
                      {newPatientError}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      value={newPatientName}
                      onChange={(e) => setNewPatientName(e.target.value)}
                      placeholder="Ej: Juan Pérez"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={newPatientEmail}
                      onChange={(e) => setNewPatientEmail(e.target.value)}
                      placeholder="Ej: juan@email.cl"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint"
                    />
                  </div>

                  <button
                    onClick={handleAddPatient}
                    className="w-full bg-mint text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-mint/90 transition"
                  >
                    <UserPlus size={18} />
                    Agregar Paciente
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
