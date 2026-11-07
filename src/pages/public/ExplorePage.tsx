import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ExplorePage: React.FC = () => {
  const { events } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Open Innovation',
    'Sustainable Tech',
    'Web3 & Fintech',
    'AI & Machine Learning',
  ];

  const tracks = [
    { title: 'Developer Productivity & Tooling', count: 12, desc: 'CLI utilities, AST debuggers, automated build pipelines, and language tooling.' },
    { title: 'Resilient Web & Distributed Systems', count: 8, desc: 'Offline-first state machines, local synchronization, peer-to-peer protocols, and mesh networking.' },
    { title: 'Sustainable Computing & Green Algorithms', count: 6, desc: 'Carbon footprint telemetry, dynamic load balancers, and energy-efficient data pipelines.' },
    { title: 'Accessible EdTech & Student Ecosystems', count: 9, desc: 'Interactive simulators, adaptive learning aids, and student collaboration hubs.' },
    { title: 'Edge AI & Browser WebAssembly', count: 7, desc: 'On-device machine learning, client-side inference, WebGPU, and private models.' },
  ];

  const filteredEvents = events.filter((ev) => {
    const matchesCat = selectedCategory === 'All' || ev.category === selectedCategory;
    const matchesQuery =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="text-amber-400 font-semibold">CampusCode Catalog</span>
          <span>·</span>
          <span>Global Student Opportunities</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore Tracks, Hackathons, and Engineering Sprints
        </h1>
        <p className="text-sm text-neutral-300 leading-relaxed">
          Discover vetted university hackathons, industry-sponsored prize bounties, and specialized technical tracks across computer science and hardware disciplines.
        </p>
      </div>

      {/* Focus Tracks Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Innovation Tracks & Focus Domains</h2>
          <span className="text-xs text-neutral-500">5 Active Domains</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map((track) => (
            <div
              key={track.title}
              className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                  <span className="font-mono text-amber-400 font-medium">{track.count} Active Projects</span>
                  <span>Domain Focus</span>
                </div>
                <h3 className="text-sm font-semibold text-neutral-100">{track.title}</h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed">{track.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between">
                <Link
                  to="/events"
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
                >
                  <span>View Hackathons</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filterable Opportunities */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-white">Featured Hackathon Competitions</h2>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" />
              <input
                type="text"
                placeholder="Search by name or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700 w-64"
              />
            </div>

            {/* Category Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800 overflow-x-auto max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-neutral-950 font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-neutral-950">
                  <img
                    src={ev.bannerImage}
                    alt={ev.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono text-amber-400 border border-neutral-800">
                    {ev.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono text-neutral-300 border border-neutral-800 capitalize">
                    {ev.status.replace(/_/g, ' ')}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-base font-bold text-white hover:text-amber-400 transition-colors">
                    <Link to={`/events/${ev.id}`}>{ev.title}</Link>
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                    {ev.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-neutral-400 pt-2 font-mono">
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase">Prize Pool</span>
                      <span className="text-amber-400 font-semibold">{ev.prizePool}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase">Registered</span>
                      <span className="text-neutral-200">{ev.registeredCount} Students</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase">Format</span>
                      <span className="text-neutral-200 capitalize">{ev.participationType}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-neutral-800/60 flex items-center justify-between mt-4">
                <Link
                  to={`/events/${ev.id}`}
                  className="text-xs font-semibold text-neutral-300 hover:text-white inline-flex items-center gap-1.5"
                >
                  <span>Review Schedule & Rules</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to={`/workspace/event/${ev.id}`}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-md bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors"
                >
                  Open Hub
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
