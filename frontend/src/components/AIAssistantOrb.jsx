const AIAssistantOrb = ({ onClick }) => {
  return (
    <div
      className="relative w-32 h-32 cursor-pointer flex items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-400 shadow-lg transition-transform hover:scale-110"
      onClick={onClick}
      title="Click to interact with AI Assistant"
    >
      <div className="w-16 h-16 rounded-full bg-cyan-400/30 flex items-center justify-center animate-pulse">
        <span className="text-cyan-200 font-bold text-xl">AI</span>
      </div>
    </div>
  );
};

export default AIAssistantOrb;
