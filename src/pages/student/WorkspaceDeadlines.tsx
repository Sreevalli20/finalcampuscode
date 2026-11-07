import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WorkspaceDeadlines: React.FC = () => {
  const { events, registeredEventIds } = useApp();
  const [filter, setFilter] = useState<'all' | 'urgent' | 'completed'>('all');

  const registeredEvents = events.filter((e) => registeredEventIds.includes(e.id));

  const allDeadlines: {
    eventId: string;
    eventTitle: string;
    roundNumber?: number;
    title: string;
    type: 'Registration' | 'Round Submission' | 'Jury Review';
    deadline: string;
    status: 'urgent' | 'upcoming' | 'passed';
    actionUrl: string;
  }[] = [];

  registeredEvents.forEach((ev) => {
    // Event registration deadline
    allDeadlines.push({
      eventId: ev.id,
      eventTitle: ev.title,
      title: 'Registration Cutoff',
      type: 'Registration',
      deadline: ev.registrationDeadline,
      status: new Date(ev.registrationDeadline) < new Date() ? 'passed' : 'upcoming',
      actionUrl: `/workspace/event/${ev.id}`,
    });

    // Round deadlines
    ev.rounds.forEach((r) => {
      allDeadlines.push({
        eventId: ev.id,
        eventTitle: ev.title,
        roundNumber: r.roundNumber,
        title: `Round 0${r.roundNumber}: ${r.title}`,
        type: 'Round Submission',
        deadline: r.submissionDeadline,
        status: r.status === 'active' ? 'urgent' : r.status === 'closed' ? 'passed' : 'upcoming',
        actionUrl: `/workspace/event/${ev.id}/submission`,
      });
    });
  });

  const filtered = allDeadlines.filter((d) => {
    if (filter === 'urgent') return d.status === 'urgent';
    if (filter === 'completed') return d.status === 'passed';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Milestone Deadlines</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Synchronized timeline of project submissions, mentor audits, and jury cutoffs.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'all' ? 'bg-amber-500 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            All Deadlines ({allDeadlines.length})
          </button>
          <button
            onClick={() => setFilter('urgent')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'urgent' ? 'bg-amber-500 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Urgent / Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'completed' ? 'bg-amber-500 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Passed
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((item, idx) => {
          return (
            <div
              key={item.title + idx}
              className={`p-4 sm:p-5 rounded-xl border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                item.status === 'urgent'
                  ? 'bg-neutral-900/60 border-amber-500/40 shadow-sm'
                  : item.status === 'passed'
                  ? 'bg-neutral-900/20 border-neutral-800/60 opacity-60'
                  : 'bg-neutral-900/40 border-neutral-800'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-amber-400 font-semibold">{item.type}</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-neutral-400 truncate max-w-[280px]">{item.eventTitle}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <div className="flex items-center gap-3 text-xs text-neutral-400 pt-0.5">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{new Date(item.deadline).toUTCString()}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                    item.status === 'urgent'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : item.status === 'passed'
                      ? 'bg-neutral-800 text-neutral-400'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {item.status}
                </span>

                <Link
                  to={item.actionUrl}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors inline-flex items-center gap-1"
                >
                  <span>Open Deliverable</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
