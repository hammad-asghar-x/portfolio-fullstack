import Icon from '../ui/Icon';

export default function ProjectModal({ isOpen, project, onClose, onNav }: { isOpen: boolean, project: any, onClose: () => void, onNav: (dir: number) => void }) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button onClick={() => onNav(-1)} className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#151515] border border-[#262626] grid place-items-center gold hover:border-[#E8B44C] hover:bg-[#1a150a] transition-all z-10 shadow-lg">
        <Icon id="left" />
      </button>
      <button onClick={() => onNav(1)} className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#151515] border border-[#262626] grid place-items-center gold hover:border-[#E8B44C] hover:bg-[#1a150a] transition-all z-10 shadow-lg">
        <Icon id="right" />
      </button>

      <div className="modern-card rounded-2xl max-w-4xl w-full max-h-[88vh] overflow-y-auto p-6 md:p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#262626] grid place-items-center text-gray-400 hover:text-white transition-colors">
          <Icon id="x" />
        </button>
        <div className={`h-72 rounded-xl grid place-items-center text-3xl font-bold text-white/60 bg-gradient-to-br shadow-inner ${project.c}`}>
          {project.t}
        </div>
        <div className="text-xs text-gray-500 mt-6 uppercase tracking-wider font-medium">{project.s}</div>
        <h3 className="text-3xl font-bold mt-1 tracking-tight">{project.t}</h3>
        <p className="text-sm text-[#a3a3a3] mt-4 leading-relaxed font-light">{project.l}</p>
        <div className="flex flex-wrap gap-2 mt-5">
          {project.tech.map((t: string, i: number) => (
            <span key={i} className="text-xs gold bg-[#1a150a] border border-[#3a2f18] rounded-md px-2.5 py-1 font-medium">{t}</span>
          ))}
        </div>
        <div className="flex gap-3 mt-6">
          <a className="text-sm gold border border-[#3a2f18] rounded-md px-5 py-2.5 hover:bg-[#1a150a] transition-colors font-medium" href="#">GitHub</a>
          <a className="text-sm gold border border-[#3a2f18] rounded-md px-5 py-2.5 hover:bg-[#1a150a] transition-colors font-medium" href="#">Live Demo</a>
        </div>
      </div>
    </div>
  );
}