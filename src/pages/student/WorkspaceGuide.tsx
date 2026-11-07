import React from 'react';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WorkspaceGuide: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-10">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
          <span className="text-amber-400 font-semibold">STUDENT PLAYBOOK</span>
          <span>·</span>
          <span>REBUILD '26 SURVIVAL MANUAL</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          The Collegiate Hackathon Survival & Pitch Guide
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Distilled best practices from national hackathon winners, jury members, and distributed systems architects.
        </p>
      </div>

      {/* Chapter 1: The 3-Minute Pitch Blueprint */}
      <section className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
          <Clock className="w-4 h-4" />
          <span>01. The 3-Minute Live Jury Pitch Formula</span>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed">
          Juries evaluate up to 30 teams back-to-back. Do not spend 2 minutes explaining general market statistics. Structure your pitch with military discipline:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 block font-bold">0:00 - 0:30</span>
            <h4 className="text-xs font-bold text-white">The Sharp Hook</h4>
            <p className="text-[11px] text-neutral-400 leading-normal">
              State the exact pain point with 1 concrete user scenario. No generic market slide.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 block font-bold">0:30 - 1:45</span>
            <h4 className="text-xs font-bold text-white">Live Working Demo</h4>
            <p className="text-[11px] text-neutral-400 leading-normal">
              Show the working interface immediately. Trigger the critical user interaction live.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 block font-bold">1:45 - 2:30</span>
            <h4 className="text-xs font-bold text-white">Technical Deep-Dive</h4>
            <p className="text-[11px] text-neutral-400 leading-normal">
              Highlight the hardest architectural obstacle your squad solved.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 block font-bold">2:30 - 3:00</span>
            <h4 className="text-xs font-bold text-white">Next Milestones</h4>
            <p className="text-[11px] text-neutral-400 leading-normal">
              Deliver 2 practical deployment steps and invite jury questions.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 2: Pre-Submission Checklist */}
      <section className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>02. Round 2 Pre-Submission Audit Checklist</span>
        </div>
        <p className="text-xs text-neutral-400">
          Ensure these criteria are met before hitting submit to avoid automatic technical point deductions:
        </p>

        <div className="space-y-2.5 text-xs">
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Public Repository Access:</strong>
              <p className="text-neutral-400 text-[11px] mt-0.5">
                Verify your GitHub repository is public or has granted read permissions. A 404 repo link will disqualify Round 2 scoring.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Zero Dead Interactive Affordances:</strong>
              <p className="text-neutral-400 text-[11px] mt-0.5">
                Ensure every button, tab, and form has active click handlers and feedback states.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Robust README with Setup Instructions:</strong>
              <p className="text-neutral-400 text-[11px] mt-0.5">
                Include installation commands (`npm install`, `npm run dev`), architecture summary, and team credits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Jump to Innovation Tools */}
      <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white">Want to evaluate your project abstract now?</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Run your thesis through our weighted rubric before final submission.
          </p>
        </div>
        <Link
          to="/workspace/ideacheck"
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>Open IdeaCheck Evaluator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
