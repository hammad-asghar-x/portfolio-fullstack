import Icon from '../ui/Icon';

interface Skill { id: number; name: string; category: string; level: string; }
interface Experience { id: number; company: string; role: string; period: string; description: string; }
interface Education { id: number; institution: string; degree: string; period: string; description: string; }

export default function ResumeSection({ skills, experience, education }: { skills: Skill[], experience: Experience[], education: Education[] }) {
  // Group skills by category
  const skillGroups = skills.reduce((acc, skill) => {
    const cat = skill.category || 'OTHER';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <section className="mt-8">
      <h1 className="text-3xl font-bold tracking-tight">Resume</h1>
      <div className="w-10 h-1 bg-gold mt-3 rounded-full"></div>
      
      <h2 className="text-xl font-bold mt-8 flex items-center gap-3 tracking-tight">
        <span className="w-9 h-9 rounded-lg bg-[#151515] border border-[#262626] grid place-items-center gold shrink-0"><Icon id="cap" /></span>
        Education
      </h2>
      <div className="mt-6 space-y-8 border-l border-[#262626] ml-1.5 pl-6 relative">
        {education.length === 0 ? <p className="text-gray-500">No education entries yet.</p> : education.map((edu) => (
          <div key={edu.id} className="relative">
            <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 border-[#E8B44C] bg-[#050505] shadow-[0_0_10px_rgba(232,180,76,0.3)]"></span>
            <div className="font-semibold">{edu.degree} — {edu.institution}</div>
            <div className="text-xs gold mt-1 font-medium">{edu.period}</div>
            <p className="text-sm text-[#a3a3a3] mt-2 font-light">{edu.description}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-10 flex items-center gap-3 tracking-tight">
        <span className="w-9 h-9 rounded-lg bg-[#151515] border border-[#262626] grid place-items-center gold shrink-0"><Icon id="case" /></span>
        Experience
      </h2>
      <div className="mt-6 border-l border-[#262626] ml-1.5 pl-6 relative">
        {experience.length === 0 ? <p className="text-gray-500">No experience entries yet.</p> : experience.map((exp) => (
          <div key={exp.id} className="relative">
            <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 border-[#E8B44C] bg-[#050505] shadow-[0_0_10px_rgba(232,180,76,0.3)]"></span>
            <div className="font-semibold">{exp.role} — {exp.company}</div>
            <div className="text-xs gold mt-1 font-medium">{exp.period}</div>
            <p className="text-sm text-[#a3a3a3] mt-2 font-light">{exp.description}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-10 tracking-tight">Skills & Tools</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-5">
        {Object.keys(skillGroups).length === 0 ? <p className="text-gray-500 col-span-3">No skills added yet.</p> : Object.entries(skillGroups).map(([cat, skillList], i) => (
          <div key={i} className="bg-[#151515] border border-[#262626] rounded-xl p-5 hover:border-[#3a3a3a] transition-colors">
            <div className="text-xs tracking-widest gold font-bold">{cat}</div>
            <div className="flex flex-wrap gap-2 mt-3">
              {skillList.map((skill, j) => (
                <span key={j} className="text-xs bg-[#222] rounded-md px-2.5 py-1 text-gray-300 border border-[#333]">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}