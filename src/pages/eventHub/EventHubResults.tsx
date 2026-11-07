import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EventHubResults: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { submissions, certificates } = useApp();

  const submission = submissions[eventId || ''];
  const cert = certificates.find((c) => c.eventId === eventId);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-white tracking-tight">Official Jury Results & Rubric Audit</h2>
        <p className="text-xs text-neutral-400">
          Evaluation scores, jury panel feedback, and issued credentials.
        </p>
      </div>

      {submission && submission.scores ? (
        <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                Official Evaluation Finalized
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">{submission.projectName}</h3>
              <p className="text-xs text-neutral-400">{submission.track}</p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-right">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">Total Rubric Score</span>
              <span className="text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
                {submission.scores.total}
              </span>
              <span className="text-xs text-neutral-500 font-mono"> / 100</span>
            </div>
          </div>

          {/* 5-axis Rubric Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Evaluation Rubric Breakdown</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
                <span className="text-[10px] text-neutral-500 block">Clarity (20%)</span>
                <span className="text-white font-bold">{submission.scores.clarity}/20</span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
                <span className="text-[10px] text-neutral-500 block">Innovation (20%)</span>
                <span className="text-white font-bold">{submission.scores.innovation}/20</span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
                <span className="text-[10px] text-neutral-500 block">Feasibility (20%)</span>
                <span className="text-white font-bold">{submission.scores.feasibility}/20</span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
                <span className="text-[10px] text-neutral-500 block">Code Quality (20%)</span>
                <span className="text-white font-bold">{submission.scores.technicalExecution}/20</span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-neutral-500 block">Pitch (20%)</span>
                <span className="text-white font-bold">{submission.scores.presentation}/20</span>
              </div>
            </div>
          </div>

          {submission.scores.juryFeedback && (
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold block">
                Jury Evaluation Panel Comments
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed italic">
                "{submission.scores.juryFeedback}"
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800 text-center space-y-3">
          <Award className="w-8 h-8 text-neutral-500 mx-auto" />
          <h3 className="text-sm font-bold text-white">Scores Under Final Jury Deliberation</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Round 2 submissions are being assessed against official rubrics. Check the Live Leaderboard or use the Organizer Demo mode to simulate grading.
          </p>
          <div className="pt-2">
            <Link
              to="/organizer/submissions"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Test Scoring via Organizer Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Linked Certificate */}
      {cert && (
        <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/30 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-amber-400">{cert.achievement}</span>
            <p className="text-xs text-neutral-300">Your verified certificate of achievement is ready.</p>
          </div>
          <Link
            to="/workspace/certificates"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors shrink-0 shadow-sm"
          >
            Open Certificate Gallery
          </Link>
        </div>
      )}
    </div>
  );
};
