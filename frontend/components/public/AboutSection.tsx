import Icon from '../ui/Icon';

export default function AboutSection() {
  return (
    <section className="mt-8">
      <h1 className="text-3xl font-bold tracking-tight">About Me</h1>
      <div className="w-10 h-1 bg-gold mt-3 rounded-full"></div>
      <p className="text-[#a3a3a3] mt-6 leading-relaxed font-light">
        I'm a frontend-focused web developer building fast, accessible interfaces for startups and product teams. I care about clean architecture, thoughtful interaction design and shipping work that holds up in production.
      </p>
      <p className="text-[#a3a3a3] mt-4 leading-relaxed font-light">
        Day to day I turn product requirements into reliable React and TypeScript applications — from marketing sites and dashboards to customer-facing tools.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {[{ v: '2+', l: 'Years experience' }, { v: '10+', l: 'Projects shipped' }, { v: '5+', l: 'Happy clients' }].map((stat, i) => (
          <div key={i} className="bg-[#151515] border border-[#262626] rounded-xl p-5 text-center hover:border-[#3a3a3a] transition-colors">
            <div className="text-2xl font-bold gold">{stat.v}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.l}</div>
          </div>
        ))}
      </div>
      
      <h2 className="text-xl font-bold mt-10 tracking-tight">What I'm Doing</h2>
      <div className="grid md:grid-cols-2 gap-4 mt-5">
        {[
          { icon: 'code', title: 'Frontend Development', desc: 'Responsive interfaces with React, TypeScript and modern CSS that stay maintainable.' },
          { icon: 'win', title: 'Full-Stack Apps', desc: 'End-to-end features with APIs, auth flows and reliable data handling.' },
          { icon: 'code', title: 'Performance & SEO', desc: 'Core Web Vitals, bundle size and crawlability so sites load fast and rank.' },
          { icon: 'ext', title: 'API Integration', desc: 'Third-party services, webhooks and internal APIs with clear error handling.' },
        ].map((item, i) => (
          <div key={i} className="bg-[#151515] border border-[#262626] rounded-xl p-5 flex gap-4 hover:border-[#3a3a3a] transition-colors">
            <span className="gold shrink-0"><Icon id={item.icon} /></span>
            <div>
              <div className="font-semibold">{item.title}</div>
              <p className="text-sm text-[#a3a3a3] mt-2 font-light">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}