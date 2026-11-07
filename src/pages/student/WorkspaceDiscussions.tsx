import React, { useState } from 'react';
import { Search, MessageSquare, ThumbsUp, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export const WorkspaceDiscussions: React.FC = () => {
  const { discussions } = useApp();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Technical', 'Ideas', 'Teammates'];

  const filtered = discussions.filter((d) => {
    const matchCat = activeCategory === 'All' || d.category === activeCategory;
    const matchSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.content.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-4xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-white tracking-tight">Structured Discussions</h1>
        <p className="text-xs text-neutral-400">
          Search indexed technical discussions, pitch reviews, and hackathon questions.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search discussion index..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-lg border border-neutral-800">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                activeCategory === c
                  ? 'bg-amber-500 text-neutral-950 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-amber-400 font-mono text-[11px] font-semibold">{item.category}</span>
                <span className="text-neutral-600">·</span>
                <span className="text-neutral-400">{item.authorName}</span>
                <span className="text-neutral-600">·</span>
                <span className="text-neutral-500 font-mono text-[11px]">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="text-xs text-neutral-400 line-clamp-1">{item.content}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
              <span className="flex items-center gap-1 text-xs text-neutral-400 font-mono">
                <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                <span>{item.upvotes}</span>
              </span>
              <span className="flex items-center gap-1 text-xs text-neutral-400 font-mono">
                <MessageSquare className="w-3.5 h-3.5 text-neutral-500" />
                <span>{item.comments.length}</span>
              </span>
              <Link
                to="/workspace/community"
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors inline-flex items-center gap-1"
              >
                <span>View Thread</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
