export default function AdminHeader() {
  return (
    // Removed bg and border, added pb-4 and border-b to blend into the card
    <header className="flex items-center justify-between pb-4 border-b border-[#262626]">
      <h2 className="text-lg font-semibold text-white">Admin Portal</h2>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-400">
          Logged in as <span className="text-white font-medium">admin</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#e8b44c] flex items-center justify-center text-black font-bold text-sm">
          A
        </div>
      </div>
    </header>
  );
}