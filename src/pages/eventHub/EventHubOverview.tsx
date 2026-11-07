import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trophy, CheckCircle2, Users, Send, ArrowRight, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EventHubOverview: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { events, teams, submissions } = useApp();

  const event = events.find((e) => e.id === eventId);
  if (!event) return null;

  const team = teams[event.id];
  const submission = submissions[event.id];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Team Status Card */}
        <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-3 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">Team Roster</span>
            <h3 className="text-sm font-bold text-white mt-1">
              {team ? team.name : 'No Squad Configured'}
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              {team ? `${team.members.length} members assembled` : 'Form or join a team of 1-4 members.'}
            </p>
          </div>
          <Link
            to={`/workspace/event/${event.id}/team`}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
          >
            <span>{team ? 'Manage Team' : 'Create Team'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Deliverables Card */}
        <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-3 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">Round 2 Submissions</span>
            <h3 className="text-sm font-bold text-white mt-1">
              {submission ? 'Deliverables Recorded' : 'Pending Submission'}
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              {submission ? submission.projectName : 'GitHub repo & live deployment required.'}
            </p>
          </div>
          <Link
            to={`/workspace/event/${event.id}/submission`}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
          >
            <span>{submission ? 'Inspect Submission' : 'Submit Project'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Prize Pool Card */}
        <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-3 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">Prize Bounties</span>
            <h3 className="text-sm font-bold text-amber-400 mt-1 font-mono">{event.prizePool}</h3>
            <p className="text-xs text-neutral-400 mt-1">1st, 2nd, 3rd, and domain category awards.</p>
          </div>
          <Link
            to={`/workspace/event/${event.id}/leaderboard`}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
          >
            <span>View Current Rankings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Rounds quick overview */}
      <div className="p-6 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Milestone Stages</h2>
          <Link to={`/workspace/event/${event.id}/rounds`} className="text-xs text-amber-400 hover:underline">
            All Rounds Details
          </Link>
        </div>

        <div className="space-y-3">
          {event.rounds.map((round) => (
            <div
              key={round.id}
              className="p-4 rounded-lg bg-neutral-950 border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-white">Round 0{round.roundNumber}: {round.title}</span>
                <p className="text-neutral-400 text-[11px]">{round.description}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-900 text-amber-400 border border-neutral-800 font-semibold">
                  {round.status}
                </span>
                <Link
                  to={`/workspace/event/${event.id}/rounds`}
                  className="text-neutral-300 hover:text-white"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
