import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Stethoscope, Users, Brain, ScanLine, X, Activity, MessageSquare } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import AIAssistantOrb from '../components/AIAssistantOrb';

const Dashboard = ({ setAuth }) => {
  const [showXrayModal, setShowXrayModal] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [stats, setStats] = useState({
    patients: 0,
    scans: 0,
    activeAlerts: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    setUserEmail(localStorage.getItem('userEmail') || 'Medical Officer');
    
    // Animate dummy stats
    const interval = setInterval(() => {
      setStats({
        patients: Math.floor(Math.random() * (1250 - 1200 + 1) + 1200),
        scans: Math.floor(Math.random() * (450 - 400 + 1) + 400),
        activeAlerts: Math.floor(Math.random() * (5 - 0 + 1) + 0)
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setAuth(false);
    navigate('/login');
  };

  const modules = [
    {
      title: "AI DOC Medicare",
      description: "AI-powered medical consultation and preliminary diagnosis tool.",
      icon: Stethoscope,
      link: "https://huggingface.co/spaces/shibagni/AIDOC-MEDICARE"
    },
    {
      title: "ASHA Workers Hub",
      description: "Maternal & child healthcare tracking system for remote workers.",
      icon: Users,
      link: "https://ashaworkers-medicare.vercel.app"
    },
    {
      title: "Brain Tumour Detector",
      description: "MRI-based automated tumor detection and localization.",
      icon: Brain,
      link: "https://brain-tumour-detector-six.vercel.app/"
    },
    {
      title: "X-Ray Analyzer",
      description: "Detailed radiograph analysis including fracture and TB detection.",
      icon: ScanLine,
      onClick: () => setShowXrayModal(true)
    }
  ];

  return (
    <div className="min-h-screen p-6 pb-20 max-w-7xl mx-auto relative overflow-x-hidden">
      {/* Header */}
      <header className="flex justify-between items-center mb-12 relative z-10 glass-panel p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2 rounded-xl shadow-lg shadow-cyan-500/20">
            <Activity size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 text-gradient hidden sm:block">AI Medicare Control System</h1>
            <h1 className="text-xl font-bold text-slate-800 text-gradient sm:hidden">AI Medicare</h1>
            <p className="text-sm text-slate-500">Welcome back, {userEmail}</p>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Terminate Session</span>
        </button>
      </header>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
        {[
          { label: "Active Patients monitored", value: stats.patients, color: "text-cyan-600", bg: "bg-cyan-50" },
          { label: "AI Scans Processed (Today)", value: stats.scans, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Critical Alerts", value: stats.activeAlerts, color: stats.activeAlerts > 2 ? "text-red-600" : "text-emerald-600", bg: stats.activeAlerts > 2 ? "bg-red-50" : "bg-emerald-50" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-2xl border border-slate-200/50 flex flex-col justify-center items-center"
          >
            <p className="text-sm text-slate-500 font-medium mb-1">{stat.label}</p>
            <motion.p 
              key={stat.value}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-4xl font-bold ${stat.color}`}
            >
              {stat.value}
            </motion.p>
          </motion.div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {modules.map((module, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + (i * 0.1), type: 'spring', stiffness: 100 }}
            className="h-full"
          >
            <ModuleCard {...module} />
          </motion.div>
        ))}
      </div>

      {/* Floating AI Orb */}
      <motion.div 
        className="fixed bottom-8 right-8 z-50 flex items-center gap-4"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, type: 'spring' }}
      >
        <AnimatePresence>
          {showAIChat && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              className="glass-panel p-4 rounded-2xl max-w-sm border border-cyan-200 shadow-xl shadow-cyan-500/10 mb-8"
            >
              <div className="flex items-center gap-2 mb-2 text-cyan-700 font-bold">
                <MessageSquare size={16} /> Server AI Core
              </div>
              <p className="text-sm text-slate-600">All systems operational. The neural engine is ready for diagnosis. How can I assist?</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AIAssistantOrb onClick={() => setShowAIChat(!showAIChat)} />
      </motion.div>

      {/* X-Ray Modal */}
      <AnimatePresence>
        {showXrayModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setShowXrayModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="glass-panel w-full max-w-2xl bg-white/90 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <button 
                onClick={() => setShowXrayModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full z-10"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-4 mb-2 relative z-10">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-xl shadow-md">
                  <ScanLine size={28} />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">X-Ray Analyzer</h2>
              </div>
              <p className="text-slate-500 mb-8 sm:ml-16 relative z-10">Select specialized neural network for radiological analysis.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                <a 
                  href="https://fracture-analyzer-knee-elbo.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block p-6 rounded-2xl border border-blue-100 hover:border-blue-300 bg-white/50 hover:bg-white shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Activity size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Fracture Detector</h3>
                  <p className="text-sm text-slate-500 mb-4">Knee & Elbow osteology damage detection analysis.</p>
                  <span className="text-blue-600 font-medium text-sm flex items-center">Engage module <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span></span>
                </a>
                
                <a 
                  href="https://tubercuolosis-detector.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block p-6 rounded-2xl border border-cyan-100 hover:border-cyan-300 bg-white/50 hover:bg-white shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ScanLine size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Tuberculosis Detector</h3>
                  <p className="text-sm text-slate-500 mb-4">Chest X-Ray pathogenic analysis and pattern matching.</p>
                  <span className="text-cyan-600 font-medium text-sm flex items-center">Engage module <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span></span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
