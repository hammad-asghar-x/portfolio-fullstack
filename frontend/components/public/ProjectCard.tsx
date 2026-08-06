export default function ProjectCard({ project, onClick }: { project: any, onClick: () => void }) {
  return (
    <div onClick={onClick} className="cursor-pointer group">
      <div className={`h-44 rounded-xl bg-gradient-to-br ${project.c} grid place-items-center text-white/50 font-bold text-2xl group-hover:scale-[1.02] group-hover:shadow-[0_0_20px_rgba(232,180,76,0.1)] transition-all duration-300 border border-[#262626]`}>
        {project.t[0]}
      </div>
      <div className="font-semibold mt-3 tracking-tight">{project.t}</div>
      <div className="text-xs text-gray-500 mt-1 truncate font-light">{project.s}</div>
    </div>
  );
}