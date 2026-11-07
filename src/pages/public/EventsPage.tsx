import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EventsPage: React.FC = () => {
  const { events, registeredEventIds, registerForEvent, unregisterFromEvent } = useApp();
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredEvents = events.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.description.toLowerCase().includes(search.toLowerCase()) ||
      ev.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || ev.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || ev.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-3 max-w-2xl">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="text-amber-400 font-semibold">Hackathon Calendar</span>
          <span>·</span>
          <span>Verified Student Competitions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Browse Competitions & Sprints
        </h1>
        <p className="text-sm text-neutral-300">
          Participate individually or assemble a multidisciplinary team. Submissions are judged by peer and industry panels.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by event title, category, or track..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-neutral-700 capitalize"
            aria-label="Filter by category"
          >
            {['all', 'Open Innovation', 'Sustainable Tech', 'Web3 & Fintech', 'AI & Machine Learning', 'Mobile & Cloud'].map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          {/* Status filter */}
          <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-lg border border-neutral-800">
            {['all', 'ongoing', 'registration_open', 'upcoming', 'completed'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 text-xs rounded-md capitalize transition-colors ${
                  selectedStatus === st
                    ? 'bg-amber-500 text-neutral-950 font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {st.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((ev) => {
          const isRegistered = registeredEventIds.includes(ev.id);

          return (
            <div
              key={ev.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-neutral-950">
                  <img
                    src={ev.bannerImage}
                    alt={ev.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono text-amber-400 border border-neutral-800">
                    {ev.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono text-neutral-200 border border-neutral-800 capitalize">
                    {ev.status.replace(/_/g, ' ')}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-white hover:text-amber-400 transition-colors">
                    <Link to={`/events/${ev.id}`}>{ev.title}</Link>
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                    {ev.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-xs font-mono">
                    <div className="p-2 rounded bg-neutral-950 border border-neutral-800/80">
                      <span className="text-[10px] text-neutral-500 block uppercase">Prize</span>
                      <span className="text-amber-400 font-semibold truncate block">{ev.prizePool}</span>
                    </div>
                    <div className="p-2 rounded bg-neutral-950 border border-neutral-800/80">
                      <span className="text-[10px] text-neutral-500 block uppercase">Format</span>
                      <span className="text-neutral-200 truncate block capitalize">{ev.participationType}</span>
                    </div>
                    <div className="p-2 rounded bg-neutral-950 border border-neutral-800/80">
                      <span className="text-[10px] text-neutral-500 block uppercase">Builders</span>
                      <span className="text-neutral-200 truncate block">{ev.registeredCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-neutral-800/60 flex items-center justify-between gap-3 mt-4">
                <Link
                  to={`/events/${ev.id}`}
                  className="text-xs font-medium text-neutral-300 hover:text-white inline-flex items-center gap-1.5"
                >
                  <span>Event Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-2">
                  {isRegistered ? (
                    <>
                      <Link
                        to={`/workspace/event/${ev.id}`}
                        className="px-3.5 py-1.5 text-xs font-semibold rounded-md bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors"
                      >
                        Enter Event Hub
                      </Link>
                      <button
                        onClick={() => unregisterFromEvent(ev.id)}
                        className="px-2.5 py-1.5 text-xs text-neutral-400 hover:text-rose-400 transition-colors"
                        title="Withdraw Registration"
                      >
                        Withdraw
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => registerForEvent(ev.id)}
                      className="px-4 py-1.5 text-xs font-semibold rounded-md bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors cursor-pointer"
                    >
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
