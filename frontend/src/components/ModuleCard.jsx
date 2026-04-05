import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const ModuleCard = ({ title, description, icon: Icon, link, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      onClick={handleClick}
      className="glass-panel p-6 rounded-2xl cursor-pointer hover-glow transition-all duration-300 relative overflow-hidden group flex flex-col h-full border border-slate-200/50 bg-white/40"
    >
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl group-hover:bg-cyan-400/20 transition-all"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="bg-gradient-to-br from-cyan-100 to-blue-50 p-3 rounded-xl text-cyan-600 shadow-sm border border-cyan-100/50">
          <Icon size={28} />
        </div>
        {!onClick && (
          <div className="text-slate-400 group-hover:text-cyan-500 transition-colors">
            <ExternalLink size={20} />
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm flex-grow">{description}</p>
      
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-sm font-medium text-cyan-600 group-hover:text-blue-600 transition-colors">
        {onClick ? 'Open Module' : 'Access System'} 
        <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
      </div>
    </motion.div>
  );
};

export default ModuleCard;
