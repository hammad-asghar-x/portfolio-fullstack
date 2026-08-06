import Icon from '../ui/Icon';

export default function ResumeSection() {
  return (
    <section className="mt-8">
      <h1 className="text-3xl font-bold tracking-tight">Resume</h1>
      <div className="w-10 h-1 bg-gold mt-3 rounded-full"></div>
      
      <h2 className="text-xl font-bold mt-8 flex items-center gap-3 tracking-tight">
        <span className="w-9 h-9 rounded-lg bg-[#151515] border border-[#262626] grid place-items-center gold shrink-0"><Icon id="cap" /></span>
        Education
      </h2>
      <div className="mt-6 space-y-8 border-l border-[#262626] ml-1.5 pl-6 relative">
        {[
          { title: 'YOUR_DEGREE — YOUR_UNIVERSITY', date: '2019 — 2023', desc: 'Your education description goes here.' },
          { title: 'YOUR_DIPLOMA — YOUR_SCHOOL', date: '2017 — 2019', desc: 'Second education entry.' }
        ].map((edu, i) => (
          <div key={i} className="relative">
            <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 border-[#E8B44C] bg-[#050505] shadow-[0_0_10px_rgba(232,180,76,0.3)]"></span>
            <div className="font-semibold">{edu.title}</div>
            <div className="text-xs gold mt-1 font-medium">{edu.date}</div>
            <p className="text-sm text-[#a3a3a3] mt-2 font-light">{edu.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-10 flex items-center gap-3 tracking-tight">
        <span className="w-9 h-9 rounded-lg bg-[#151515] border border-[#262626] grid place-items-center gold shrink-0"><Icon id="case" /></span>
        Experience
      </h2>
      <div className="mt-6 border-l border-[#262626] ml-1.5 pl-6 relative">
        <div className="relative">
          <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 border-[#E8B44C] bg-[#050505] shadow-[0_0_10px_rgba(232,180,76,0.3)]"></span>
          <div className="font-semibold">YOUR_ROLE — YOUR_COMPANY</div>
          <div className="text-xs gold mt-1 font-medium">2024 — Present</div>
          <p className="text-sm text-[#a3a3a3] mt-2 font-light">Your single experience entry renders perfectly — one marker, no connector needed.</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mt-10 tracking-tight">Skills & Tools</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-5">
        {[
          { cat: 'FRONTEND', skills: ['TypeScript', 'React', 'Next.js', 'Tailwind'] },
          { cat: 'BACKEND', skills: ['FastAPI', 'PostgreSQL', 'REST APIs'] },
          { cat: 'WORKFLOW', skills: ['Git', 'Figma', 'CI/CD'] }
        ].map((group, i) => (
          <div key={i} className="bg-[#151515] border border-[#262626] rounded-xl p-5 hover:border-[#3a3a3a] transition-colors">
            <div className="text-xs tracking-widest gold font-bold">{group.cat}</div>
            <div className="flex flex-wrap gap-2 mt-3">
              {group.skills.map((skill, j) => (
                <span key={j} className="text-xs bg-[#222] rounded-md px-2.5 py-1 text-gray-300 border border-[#333]">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}