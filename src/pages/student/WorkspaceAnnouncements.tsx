import React, { useState } from 'react';
import { Bell, Pin, Search, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WorkspaceAnnouncements: React.FC = () => {
  const { announcements } = useApp();
  const [category, setCategory] = useState<string>('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Critical', 'Schedule', 'General'];

  const filtered = announcements.filter((ann) => {
    const matchCat = category === 'All' || ann.category === category;
    const matchSearch =
      ann.title.toLowerCase().includes(search.toLowerCase()) ||
      ann.content.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-white tracking-tight">Official Communications</h1>
        <p className="text-xs text-neutral-400">
          Direct broadcasts from the ReBuild '26 organizing committee and platform administrators.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-lg border border-neutral-800 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                category === c ? 'bg-amber-500 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((ann) => (
          <div
            key={ann.id}
            className={`p-6 rounded-xl border space-y-3 ${
              ann.pinned
                ? 'bg-neutral-900/70 border-amber-500/40'
                : 'bg-neutral-900/40 border-neutral-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {ann.pinned && (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-amber-400 uppercase font-semibold">
                    <Pin className="w-3 h-3 rotate-45" /> Pinned
                  </span>
                )}
                <span className="font-mono text-amber-400 text-[11px] font-semibold">{ann.category}</span>
              </div>
              <span className="text-neutral-500 font-mono text-[11px]">
                {new Date(ann.publishedAt).toLocaleDateString()} · {new Date(ann.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <h3 className="text-base font-bold text-white">{ann.title}</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">{ann.content}</p>

            <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-neutral-300 font-medium">{ann.authorName}</span>
                <span>({ann.authorRole})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
