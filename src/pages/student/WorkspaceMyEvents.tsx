import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Trophy, Users, FolderGit2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/common/EmptyState';

export const WorkspaceMyEvents: React.FC = () => {
  const { events, registeredEventIds, teams, submissions } = useApp();

  const registeredEvents = events.filter((e) => registeredEventIds.includes(e.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">My Registered Hackathons</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Active and past hackathons you have joined. Track team roster, deliverable submissions, and leaderboard rankings.
          </p>
        </div>
        <Link
          to="/workspace/events"
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors self-start sm:self-auto"
        >
          Explore More Hackathons
        </Link>
      </div>

      {registeredEvents.length === 0 ? (
        <EmptyState
          icon={<Calendar className="w-6 h-6" />}
          title="No Active Registrations"
          description="You haven't registered for any hackathons yet. Browse upcoming competitions to join."
          actionLabel="Browse Competitions"
          onAction={() => window.location.assign('/workspace/events')}
        />
      ) : (
        <div className="space-y-4">
          {registeredEvents.map((ev) => {
            const team = teams[ev.id];
            const submission = submissions[ev.id];

            return (
              <div
                key={ev.id}
                className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-amber-400 font-mono font-semibold">
                      <span>{ev.category}</span>
                      <span>·</span>
                      <span className="capitalize">{ev.status.replace(/_/g, ' ')}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1">
                      <Link to={`/workspace/event/${ev.id}`} className="hover:text-amber-400 transition-colors">
                        {ev.title}
                      </Link>
                    </h3>
                  </div>

                  <Link
                    to={`/workspace/event/${ev.id}`}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors self-start sm:self-auto inline-flex items-center gap-1.5 shrink-0"
                  >
                    <span>Enter Event Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {/* Team status */}
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
                    <span className="text-[10px] text-neutral-500 uppercase block font-mono">Team Status</span>
                    {team ? (
                      <div>
                        <span className="font-semibold text-white block mt-0.5">{team.name}</span>
                        <span className="text-[11px] text-neutral-400">{team.members.length} Members</span>
                      </div>
                    ) : (
                      <div>
                        <span className="font-semibold text-neutral-400 block mt-0.5">Solo / No Team</span>
                        <Link to={`/workspace/event/${ev.id}/team`} className="text-[11px] text-amber-400 hover:underline">
                          Create Team
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Submission status */}
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
                    <span className="text-[10px] text-neutral-500 uppercase block font-mono">Deliverables</span>
                    {submission ? (
                      <div>
                        <span className="font-semibold text-emerald-400 block mt-0.5 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Recorded
                        </span>
                        <span className="text-[11px] text-neutral-400 truncate block">{submission.projectName}</span>
                      </div>
                    ) : (
                      <div>
                        <span className="font-semibold text-neutral-400 block mt-0.5">Pending</span>
                        <Link to={`/workspace/event/${ev.id}/submission`} className="text-[11px] text-amber-400 hover:underline">
                          Submit Now
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Timeline status */}
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
                    <span className="text-[10px] text-neutral-500 uppercase block font-mono">Schedule</span>
                    <span className="font-semibold text-white block mt-0.5 font-mono text-[11px]">
                      {new Date(ev.startDate).toLocaleDateString()} – {new Date(ev.endDate).toLocaleDateString()}
                    </span>
                    <span className="text-[11px] text-neutral-400">{ev.rounds.length} Total Rounds</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-neutral-800/60 text-xs">
                  <Link
                    to={`/workspace/event/${ev.id}/rounds`}
                    className="text-neutral-400 hover:text-white px-2 py-1 rounded hover:bg-neutral-800 transition-colors"
                  >
                    Rounds
                  </Link>
                  <Link
                    to={`/workspace/event/${ev.id}/team`}
                    className="text-neutral-400 hover:text-white px-2 py-1 rounded hover:bg-neutral-800 transition-colors"
                  >
                    Team Roster
                  </Link>
                  <Link
                    to={`/workspace/event/${ev.id}/submission`}
                    className="text-neutral-400 hover:text-white px-2 py-1 rounded hover:bg-neutral-800 transition-colors"
                  >
                    Submission
                  </Link>
                  <Link
                    to={`/workspace/event/${ev.id}/leaderboard`}
                    className="text-neutral-400 hover:text-white px-2 py-1 rounded hover:bg-neutral-800 transition-colors"
                  >
                    Leaderboard
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
