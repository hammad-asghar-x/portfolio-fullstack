import Icon from '../ui/Icon';

export default function ProjectModal({ isOpen, project, onClose, onNav }: { isOpen: boolean, project: any, onClose: () => void, onNav: (dir: number) => void }) {
  if (!isOpen || !project) return null;

  // Handle technologies whether it's a string or an array
  const techList = project.technologies 
    ? (typeof project.technologies === 'string' ? project.technologies.split(',').map((t: string) => t.trim()) : project.technologies)
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button onClick={() => onNav(-1)} className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#151515] border border-[#262626] grid place-items-center gold hover:border-[#E8B44C] hover:bg-[#1a150a] transition-all z-10 shadow-lg">
        <Icon id="left" />
      </button>
      <button onClick={() => onNav(1)} className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#151515] border border-[#262626] grid place-items-center gold hover:border-[#E8B44C] hover:bg-[#1a150a] transition-all z-10 shadow-lg">
        <Icon id="right" />
      </button>

      <div className="modern-card rounded-2xl max-w-4xl w-full max-h-[88vh] overflow-y-auto no-scrollbar p-6 md:p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#262626] grid place-items-center text-gray-400 hover:text-white transition-colors">
          <Icon id="x" />
        </button>
        
        {/* Image or Fallback Initial */}
        <div 
          className={`h-72 rounded-xl grid place-items-center text-3xl font-bold text-white/60 shadow-inner bg-[#1a1a1a] ${project.image_url ? 'bg-cover bg-center' : ''}`}
          style={project.image_url ? { backgroundImage: `url(${project.image_url})` } : {}}
        >
          {!project.image_url && project.title[0]}
        </div>

        <div className="text-xs text-gray-500 mt-6 uppercase tracking-wider font-medium">{project.short_description}</div>
        <h3 className="text-3xl font-bold mt-1 tracking-tight text-white">{project.title}</h3>
        <p className="text-sm text-[#a3a3a3] mt-4 leading-relaxed font-light">{project.long_description}</p>
        
        <div className="flex flex-wrap gap-2 mt-5">
          {techList.map((t: string, i: number) => (
            <span key={i} className="text-xs gold bg-[#1a150a] border border-[#3a2f18] rounded-md px-2.5 py-1 font-medium">{t}</span>
          ))}
        </div>
        
        <div className="flex gap-3 mt-6">
          {project.github_url && (
            <a className="text-sm gold border border-[#3a2f18] rounded-md px-5 py-2.5 hover:bg-[#1a150a] transition-colors font-medium" href={project.github_url} target="_blank" rel="noopener noreferrer">GitHub</a>
          )}
          {project.live_url && (
            <a className="text-sm gold border border-[#3a2f18] rounded-md px-5 py-2.5 hover:bg-[#1a150a] transition-colors font-medium" href={project.live_url} target="_blank" rel="noopener noreferrer">Live Demo</a>
          )}
        </div>
      </div>
    </div>
  );
}