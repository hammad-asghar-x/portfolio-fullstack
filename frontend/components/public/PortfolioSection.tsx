import ProjectCard from './ProjectCard';

interface Project {
  id: number; title: string; slug: string; short_description: string; long_description: string;
  image_url: string | null; github_url: string | null; live_url: string | null;
  technologies: string | string[]; featured: boolean;
}

// Helper to map backend data to frontend card format
const mapProject = (p: Project) => ({
  t: p.title,
  s: p.short_description,
  l: p.long_description,
  tech: typeof p.technologies === 'string' ? p.technologies.split(',').map(t => t.trim()) : p.technologies,
  c: "from-[#123a4a] to-[#0b1c26]", // You can make this dynamic later based on category
});

export default function PortfolioSection({ projects, onOpenModal }: { projects: Project[], onOpenModal: (index: number) => void }) {
  const mappedProjects = projects.map(mapProject);

  if (mappedProjects.length === 0) {
    return (
      <section className="mt-8 text-center text-gray-400 py-12">
        No projects published yet.
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
      <div className="w-10 h-1 bg-gold mt-3 rounded-full"></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {mappedProjects.map((p, i) => (
          <ProjectCard key={projects[i].id} project={p} onClick={() => onOpenModal(i)} />
        ))}
      </div>
    </section>
  );
}