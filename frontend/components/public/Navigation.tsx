export default function Navigation({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  return (
    <nav className="flex flex-wrap gap-5 justify-end pb-4 border-b border-[#262626] text-sm text-gray-400 font-medium">
      {['about', 'resume', 'portfolio', 'contact'].map((tab) => (
        <a
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`cursor-pointer pb-1 border-b-2 border-transparent transition-colors capitalize ${activeTab === tab ? 'nav-on' : 'hover:text-white'}`}
        >
          {tab}
        </a>
      ))}
    </nav>
  );
}