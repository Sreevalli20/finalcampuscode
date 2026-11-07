import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WorkspaceEvents: React.FC = () => {
  const { events, registeredEventIds, registerForEvent, unregisterFromEvent } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Open Innovation', 'Sustainable Tech', 'Web3 & Fintech', 'AI & Machine Learning'];

  const filtered = events.filter((ev) => {
    const matchCat = category === 'All' || ev.category === category;
    const matchQuery =
      ev.title.toLowerCase().includes(query.toLowerCase()) ||
      ev.description.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Discover Hackathons</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Explore national and collegiate hackathons. Register instantly to create a team and unlock submission rounds.
          </p>
        </div>
        <Link
          to="/workspace/my-events"
          className="text-xs text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1 self-start sm:self-auto"
        >
          <span>View My Registrations ({registeredEventIds.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search hackathons..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-lg border border-neutral-800 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                category === c ? 'bg-amber-500 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((ev) => {
          const isRegistered = registeredEventIds.includes(ev.id);

          return (
            <div
              key={ev.id}
              className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-400 text-[11px] font-semibold">{ev.category}</span>
                  <span className="text-neutral-400 font-mono text-[11px] capitalize">{ev.status.replace(/_/g, ' ')}</span>
                </div>

                <h3 className="text-base font-bold text-white hover:text-amber-400 transition-colors">
                  <Link to={`/workspace/event/${ev.id}`}>{ev.title}</Link>
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">{ev.description}</p>

                <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 pt-1">
                  <span>Prize: <strong className="text-white">{ev.prizePool}</strong></span>
                  <span>·</span>
                  <span>{ev.registeredCount} builders</span>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between">
                <Link
                  to={`/workspace/event/${ev.id}`}
                  className="text-xs font-medium text-neutral-300 hover:text-white inline-flex items-center gap-1"
                >
                  <span>Event Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {isRegistered ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Registered
                    </span>
                    <button
                      onClick={() => unregisterFromEvent(ev.id)}
                      className="text-[11px] text-neutral-500 hover:text-rose-400"
                    >
                      Withdraw
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => registerForEvent(ev.id)}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors cursor-pointer"
                  >
                    Register
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
