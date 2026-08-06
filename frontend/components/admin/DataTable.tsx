export default function DataTable({ headers, children }: { headers: string[], children: React.ReactNode }) {
  return (
    <div className="bg-[#151515] border border-[#262626] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-[#1a1a1a] text-gray-300 uppercase text-xs font-medium">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="px-6 py-4">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262626]">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}