import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EventHubRounds: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { events, submissions } = useApp();

  const event = events.find((e) => e.id === eventId);
  if (!event) return null;

  const submission = submissions[event.id];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-white tracking-tight">Structured Rounds & Evaluation Milestones</h2>
        <p className="text-xs text-neutral-400">
          Review requirements, deadlines, and deliverables for each phase of {event.title}.
        </p>
      </div>

      <div className="space-y-6">
        {event.rounds.map((round) => {
          const isSubmitted = submission && submission.roundId === round.id;

          return (
            <div
              key={round.id}
              className={`p-6 rounded-xl border transition-colors space-y-4 ${
                round.status === 'active'
                  ? 'bg-neutral-900/60 border-amber-500/40 shadow-sm'
                  : 'bg-neutral-900/40 border-neutral-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-amber-400 font-bold">STAGE 0{round.roundNumber}</span>
                    <span className="text-neutral-600">·</span>
                    <span className="text-neutral-400 uppercase">{round.status}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">{round.title}</h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Deadline</span>
                  <span className="text-xs font-mono text-neutral-200 font-semibold">
                    {new Date(round.submissionDeadline).toUTCString()}
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">{round.description}</p>

              <div>
                <span className="text-[11px] font-mono text-neutral-500 uppercase block mb-1.5 font-semibold">
                  Required Deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {round.requirements.map((req) => (
                    <div
                      key={req}
                      className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800/80 flex items-center gap-2 text-xs text-neutral-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  {isSubmitted && (
                    <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Deliverables recorded for this round</span>
                    </span>
                  )}
                </div>

                {round.status === 'active' && (
                  <Link
                    to={`/workspace/event/${event.id}/submission`}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{isSubmitted ? 'Edit Deliverables' : 'Submit Deliverables'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
