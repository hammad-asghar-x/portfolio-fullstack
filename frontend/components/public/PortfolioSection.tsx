import ProjectCard from './ProjectCard';

const projects = [
  { t: "Pulseboard", s: "Analytics dashboard for SaaS teams", l: "Analytics dashboard with live charts, saved views and role-based access. Built as a responsive React app with a Node API.", tech: ["React", "TypeScript", "Node.js", "PostgreSQL"], c: "from-[#123a4a] to-[#0b1c26]" },
  { t: "Northline", s: "Marketing site with CMS", l: "Dark-themed marketing site with headless CMS, SEO tooling and 99 Lighthouse performance.", tech: ["Next.js", "Tailwind", "Sanity"], c: "from-[#3a2f18] to-[#191919]" },
  { t: "Forcelly", s: "Mobile-first fitness app", l: "Progressive web app for workout tracking with offline support and push reminders.", tech: ["React", "PWA", "FastAPI"], c: "from-[#1f3a2a] to-[#0b261a]" },
  { t: "Stocknote", s: "Inventory tool for small shops", l: "Inventory and notes tool with barcode scanning and daily reports by email.", tech: ["TypeScript", "PostgreSQL", "Docker"], c: "from-[#3a1f2e] to-[#260b1c]" },
];

export default function PortfolioSection({ onOpenModal }: { onOpenModal: (index: number) => void }) {
  return (
    <section className="mt-8">
      <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
      <div className="w-10 h-1 bg-gold mt-3 rounded-full"></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} onClick={() => onOpenModal(i)} />
        ))}
      </div>
    </section>
  );
}