import React from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import {
  Calendar,
  Layers,
  Users,
  Send,
  Trophy,
  Award,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

export const EventHubLayout: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const location = useLocation();
  const { events, registeredEventIds, registerForEvent } = useApp();

  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Hackathon Not Found</h2>
        <p className="text-xs text-neutral-400">The event could not be loaded from active state.</p>
        <Link
          to="/workspace/events"
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Browse Hackathons</span>
        </Link>
      </div>
    );
  }

  const isRegistered = registeredEventIds.includes(event.id);

  const navTabs = [
    { label: 'Overview', href: `/workspace/event/${event.id}`, exact: true, icon: <Calendar className="w-3.5 h-3.5" /> },
    { label: 'Rounds & Specs', href: `/workspace/event/${event.id}/rounds`, icon: <Layers className="w-3.5 h-3.5" /> },
    { label: 'My Team', href: `/workspace/event/${event.id}/team`, icon: <Users className="w-3.5 h-3.5" /> },
    { label: 'Submission', href: `/workspace/event/${event.id}/submission`, icon: <Send className="w-3.5 h-3.5" /> },
    { label: 'Leaderboard', href: `/workspace/event/${event.id}/leaderboard`, icon: <Trophy className="w-3.5 h-3.5" /> },
    { label: 'Jury Results', href: `/workspace/event/${event.id}/results`, icon: <Award className="w-3.5 h-3.5" /> },
  ];

  const isTabActive = (href: string, exact?: boolean) => {
    if (exact) return location.pathname === href;
    return location.pathname.startsWith(href);
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs />

      {/* Event Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-amber-400 font-bold">{event.category}</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-400 capitalize">{event.status.replace(/_/g, ' ')}</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-400">{event.registeredCount} builders</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {event.title}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl">{event.tagline}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            {isRegistered ? (
              <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Registered Participant</span>
              </span>
            ) : (
              <button
                onClick={() => registerForEvent(event.id)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer"
              >
                Register for Event
              </button>
            )}
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-x-auto">
          {navTabs.map((tab) => {
            const active = isTabActive(tab.href, tab.exact);
            return (
              <Link
                key={tab.href}
                to={tab.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tab Child Content */}
      <Outlet />
    </div>
  );
};
