import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EventStatus } from '../../types';

export const OrganizerEvents: React.FC = () => {
  const { events, updateEvent, addToast } = useApp();

  const handleStatusChange = (eventId: string, newStatus: EventStatus) => {
    const target = events.find((e) => e.id === eventId);
    if (!target) return;

    updateEvent({ ...target, status: newStatus });
    addToast('Status Updated', `Changed "${target.title}" to ${newStatus.replace(/_/g, ' ')}.`, 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Manage Hackathons</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Update competition statuses, track deadlines, and monitor registration quotas.
          </p>
        </div>

        <Link
          to="/organizer/events/create"
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Create New Hackathon</span>
        </Link>
      </div>

      <div className="space-y-4">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-amber-400 font-bold">{ev.category}</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-neutral-400">{ev.registeredCount} Students Registered</span>
                </div>
                <h3 className="text-base font-bold text-white">{ev.title}</h3>
                <p className="text-xs text-neutral-400 max-w-2xl">{ev.description}</p>
              </div>

              {/* Status Changer Control */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-neutral-400">Current Phase:</span>
                <select
                  value={ev.status}
                  onChange={(e) => handleStatusChange(ev.id, e.target.value as EventStatus)}
                  className="px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-amber-400 font-mono font-semibold focus:outline-none focus:border-neutral-700 capitalize"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="registration_open">Registration Open</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="judging">Judging</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800/80">
                <span className="text-[10px] text-neutral-500 uppercase block">Prize Pool</span>
                <span className="text-amber-400 font-semibold">{ev.prizePool}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800/80">
                <span className="text-[10px] text-neutral-500 uppercase block">Rounds</span>
                <span className="text-neutral-200">{ev.rounds.length} Stages</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800/80">
                <span className="text-[10px] text-neutral-500 uppercase block">Format</span>
                <span className="text-neutral-200 capitalize">{ev.participationType}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800/80">
                <span className="text-[10px] text-neutral-500 uppercase block">Deadline</span>
                <span className="text-neutral-200">{new Date(ev.registrationDeadline).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-mono text-[11px]">ID: {ev.id}</span>
              <Link
                to={`/workspace/event/${ev.id}`}
                className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
              >
                <span>Inspect in Student Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
