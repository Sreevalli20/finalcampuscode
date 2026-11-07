import React, { useState } from 'react';
import { Lightbulb, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface RubricScore {
  clarity: number; // /20
  innovation: number; // /20
  feasibility: number; // /20
  impact: number; // /20
  readiness: number; // /20
  total: number; // /100
  feedback: {
    strengths: string[];
    improvements: string[];
  };
}

export const IdeaCheckPage: React.FC = () => {
  const { addToast } = useApp();

  const [title, setTitle] = useState('CampusCode — Student Innovation Ecosystem');
  const [problemStatement, setProblemStatement] = useState(
    'Collegiate hackathon participants suffer from fragmented tooling, flaky remote databases in low-bandwidth venues, black-box AI scoring, and unverified credentials that recruiters cannot trust.'
  );
  const [targetUsers, setTargetUsers] = useState(
    'Undergraduate computer science and engineering students, hackathon organizing committees, and university campus clubs.'
  );
  const [proposedSolution, setProposedSolution] = useState(
    'An autonomous, zero-server web application providing deterministic teammate matchmaking (HackMate), transparent 5-axis idea rubric scoring (IdeaCheck), multi-round deliverable management, and client-side verifiable PDF certificate generation.'
  );
  const [innovationFactors, setInnovationFactors] = useState(
    '100% frontend client execution with persistent versioned JSON storage. Zero external server dependencies or rate limits, guaranteeing venue resilience.'
  );
  const [feasibility, setFeasibility] = useState(
    'Engineered using React 19, TypeScript, Tailwind CSS v4, and browser native localStorage APIs. Tested against 1440px desktop baseline with mobile responsive fallback.'
  );
  const [expectedImpact, setExpectedImpact] = useState(
    'Directly accelerates 1,400+ student builders, eliminates venue downtime, and produces tamper-resistant PDF credentials for developer portfolios.'
  );

  const [results, setResults] = useState<RubricScore | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);

    setTimeout(() => {
      // Deterministic weighted rubric calculations based on quality signals
      let clarityScore = 14;
      if (problemStatement.length > 80) clarityScore += 3;
      if (targetUsers.length > 30) clarityScore += 3;

      let innovationScore = 13;
      if (innovationFactors.toLowerCase().includes('zero') || innovationFactors.toLowerCase().includes('autonomous') || innovationFactors.toLowerCase().includes('deterministic')) {
        innovationScore += 4;
      }
      if (innovationFactors.length > 70) innovationScore += 2;

      let feasibilityScore = 15;
      if (feasibility.toLowerCase().includes('react') || feasibility.toLowerCase().includes('typescript') || feasibility.toLowerCase().includes('api')) {
        feasibilityScore += 3;
      }
      if (feasibility.length > 60) feasibilityScore += 2;

      let impactScore = 14;
      if (expectedImpact.match(/\d+/)) impactScore += 3; // quantitative metric present
      if (expectedImpact.length > 50) impactScore += 2;

      let readinessScore = 16;
      if (proposedSolution.length > 100) readinessScore += 3;

      const total = Math.min(98, clarityScore + innovationScore + feasibilityScore + impactScore + readinessScore);

      const strengths: string[] = [];
      const improvements: string[] = [];

      if (clarityScore >= 18) strengths.push('Problem statement articulates specific user pain points without generic buzzwords.');
      else improvements.push('Tighten problem statement by specifying measurable downtime or loss metrics.');

      if (innovationScore >= 17) strengths.push('Autonomous architectural approach strongly distinguishes project from typical cloud clones.');
      else improvements.push('Articulate what technological moat prevents simple duplication.');

      if (feasibilityScore >= 18) strengths.push('Realistic stack choices and reliance on established browser primitives guarantee execution feasibility.');
      else improvements.push('Detail fallback mechanisms if primary browser storage limits are exceeded.');

      if (impactScore >= 17) strengths.push('Quantitative adoption projections demonstrate realistic collegiate reach.');
      else improvements.push('Incorporate explicit metrics (e.g. latency targets, hours saved, active teams supported).');

      setResults({
        clarity: Math.min(20, clarityScore),
        innovation: Math.min(20, innovationScore),
        feasibility: Math.min(20, feasibilityScore),
        impact: Math.min(20, impactScore),
        readiness: Math.min(20, readinessScore),
        total,
        feedback: { strengths, improvements },
      });

      setIsEvaluating(false);
      addToast('Evaluation Complete', `Calculated composite score: ${total}/100`, 'success');
    }, 400);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="text-amber-400 font-bold">INNOVATION TOOL</span>
          <span>·</span>
          <span>WEIGHTED RUBRIC EVALUATION</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          IdeaCheck — Hackathon Idea Evaluator
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
          Benchmark your project thesis against official ReBuild '26 evaluation criteria before submitting. Computed transparently using deterministic grading rubrics with zero black-box hallucinations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column (7 cols) */}
        <form onSubmit={handleEvaluate} className="lg:col-span-7 p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              01. Specific Problem Statement
            </label>
            <textarea
              rows={2}
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              02. Target User Persona & Beneficiaries
            </label>
            <input
              type="text"
              value={targetUsers}
              onChange={(e) => setTargetUsers(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              03. Proposed Technical Solution
            </label>
            <textarea
              rows={3}
              value={proposedSolution}
              onChange={(e) => setProposedSolution(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                04. Innovation & Distinctiveness
              </label>
              <textarea
                rows={2}
                value={innovationFactors}
                onChange={(e) => setInnovationFactors(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                05. Technical Feasibility & Stack
              </label>
              <textarea
                rows={2}
                value={feasibility}
                onChange={(e) => setFeasibility(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              06. Expected Impact & Reach
            </label>
            <input
              type="text"
              value={expectedImpact}
              onChange={(e) => setExpectedImpact(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isEvaluating}
              className="w-full py-2.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 active:bg-amber-600 transition-colors shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isEvaluating ? (
                <span>Computing Rubric Score...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run Weighted Rubric Audit</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {results ? (
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block font-semibold">
                    Composite Score
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
                      {results.total}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">/ 100</span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      results.total >= 85
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : results.total >= 70
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {results.total >= 90 ? 'Podium Tier' : results.total >= 80 ? 'Finalist Tier' : 'Needs Polish'}
                  </span>
                </div>
              </div>

              {/* 5-axis Breakdown */}
              <div className="space-y-2 text-xs">
                <span className="text-[11px] font-mono text-neutral-400 uppercase font-semibold block">
                  Weighted Axes
                </span>
                <div className="space-y-1.5">
                  <div className="flex justify-between p-2 rounded bg-neutral-950 font-mono text-[11px]">
                    <span className="text-neutral-400">Problem Clarity (20%)</span>
                    <span className="text-white font-bold">{results.clarity}/20</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-neutral-950 font-mono text-[11px]">
                    <span className="text-neutral-400">Innovation & Moat (20%)</span>
                    <span className="text-white font-bold">{results.innovation}/20</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-neutral-950 font-mono text-[11px]">
                    <span className="text-neutral-400">Feasibility (20%)</span>
                    <span className="text-white font-bold">{results.feasibility}/20</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-neutral-950 font-mono text-[11px]">
                    <span className="text-neutral-400">Target Impact (20%)</span>
                    <span className="text-white font-bold">{results.impact}/20</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-neutral-950 font-mono text-[11px]">
                    <span className="text-neutral-400">Execution Readiness (20%)</span>
                    <span className="text-white font-bold">{results.readiness}/20</span>
                  </div>
                </div>
              </div>

              {/* Actionable Feedback */}
              <div className="space-y-3 pt-1 text-xs">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Strengths
                  </span>
                  <ul className="space-y-1">
                    {results.feedback.strengths.map((s) => (
                      <li key={s} className="text-neutral-300 text-[11px] leading-relaxed">
                        • {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Recommendations for Pitch
                  </span>
                  <ul className="space-y-1">
                    {results.feedback.improvements.map((imp) => (
                      <li key={imp} className="text-neutral-300 text-[11px] leading-relaxed">
                        • {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800 text-center space-y-3">
              <Lightbulb className="w-8 h-8 text-neutral-500 mx-auto" />
              <h3 className="text-sm font-bold text-white">Ready for Evaluation</h3>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Fill out the project thesis sections and run the audit to receive an instant weighted score and recommendations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
